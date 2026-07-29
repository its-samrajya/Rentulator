import { PaymentStatus } from "@/app/generated/prisma/enums";
import prisma from "./prisma";

export async function verifyEsewaPayment(data: string): Promise<boolean> {
  let decoded;
  try {
    decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
  } catch (err) {
    console.log("[verifyEsewaPayment] FAILED at decode:", err);
    return false;
  }

  console.log("[verifyEsewaPayment] decoded payload:", decoded);

  if (decoded.status !== "COMPLETE") {
    console.log(
      "[verifyEsewaPayment] FAILED: status not COMPLETE:",
      decoded.status,
    );
    return false;
  }

  const invoiceId = decoded.transaction_uuid.split("-")[0];
  console.log("[verifyEsewaPayment] recovered invoiceId:", invoiceId);

  // 1. to confirm invoice exists and isn't already paid
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });
  console.log("[verifyEsewaPayment] invoice lookup result:", invoice);

  if (!invoice || invoice.status === PaymentStatus.PAID) {
    console.log(
      "[verifyEsewaPayment] FAILED: invoice missing or already paid. invoice:",
      invoice,
    );
    return false;
  }

  // 2. to prevent replay — this transaction_uuid must not already be recorded
  const existing = await prisma.payment.findUnique({
    where: { esewaTransactionUuid: decoded.transaction_uuid },
  });
  if (existing) {
    console.log(
      "[verifyEsewaPayment] FAILED: transaction_uuid already used:",
      decoded.transaction_uuid,
      existing,
    );
    return false;
  }

  // 3. to call eSewa's status-check API to confirm authenticity
  const verifyUrl = `${process.env.ESEWA_VERIFY_URL}?product_code=${process.env.ESEWA_MERCHANT_CODE}&total_amount=${decoded.total_amount}&transaction_uuid=${decoded.transaction_uuid}`;
  console.log("[verifyEsewaPayment] calling verifyUrl:", verifyUrl);

  const verifyResponse = await fetch(verifyUrl);
  console.log(
    "[verifyEsewaPayment] verifyResponse.status:",
    verifyResponse.status,
  );

  if (!verifyResponse.ok) {
    const text = await verifyResponse.text();
    console.log(
      "[verifyEsewaPayment] FAILED: verifyResponse not ok. body:",
      text,
    );
    return false;
  }

  const verifyResult = await verifyResponse.json();
  console.log("[verifyEsewaPayment] verifyResult:", verifyResult);

  if (
    verifyResult.status !== "COMPLETE" ||
    verifyResult.transaction_uuid !== decoded.transaction_uuid
  ) {
    console.log(
      "[verifyEsewaPayment] FAILED: verifyResult mismatch:",
      verifyResult,
    );
    return false;
  }

  // 4. to confirm amount matches the invoice, not just what eSewa echoes back
  if (Number(verifyResult.total_amount) !== invoice.totalAmount) {
    console.log(
      "[verifyEsewaPayment] FAILED: amount mismatch. expected:",
      invoice.totalAmount,
      "received:",
      verifyResult.total_amount,
    );
    return false;
  }

  // 5. to record the payment and mark invoice paid
  await prisma.$transaction([
    prisma.payment.create({
      data: {
        invoiceId: invoice.id,
        amount: invoice.totalAmount,
        esewaTransactionUuid: decoded.transaction_uuid,
        esewaRefId: decoded.ref_id ?? null,
      },
    }),
    prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: PaymentStatus.PAID },
    }),
  ]);

  console.log(
    "[verifyEsewaPayment] SUCCESS: payment recorded for invoice:",
    invoice.id,
  );
  return true;
}
