"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createPayment = async (data: {
  invoiceId: string;
  amount: number;
  note?: string;
  paidAt?: Date;
}) => {
  const invoice = await prisma.invoice.findUnique({
    where: { id: data.invoiceId },
    include: { payments: true },
  });

  if (!invoice) {
    return { success: false, message: "Invoice not found" };
  }

  const alreadyPaid = invoice.payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );

  const remainingPayment = invoice.totalAmount - alreadyPaid;

  if (data.amount <= 0) {
    return {
      success: false,
      message: "Amount must be greater than zero",
    };
  }

  if (data.amount > remainingPayment) {
    return {
      success: false,
      message: `Amount exceeds remaining balance of ${remainingPayment}`,
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        note: data.note,
        paidAt: data.paidAt ?? new Date(),
      },
    });

    if (alreadyPaid + data.amount >= invoice.totalAmount) {
      await tx.invoice.update({
        where: { id: data.invoiceId },
        data: { status: "PAID" },
      });
    } else {
      await tx.invoice.update({
        where: { id: data.invoiceId },
        data: { status: "PARTIAL" },
      });
    }
  });

  revalidatePath("/admin/payment");
  return { success: true, message: "Payment recorded successfully" };
};
