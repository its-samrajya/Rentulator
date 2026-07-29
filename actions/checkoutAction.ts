"use server";

import { generateEsewaSignature } from "@/lib/generateEsewaSignature";
import { PaymentRequestData } from "@/types/checkoutTypes";
import { v4 as uuidv4 } from "uuid";

function validateEnvironmentVariables() {
  const requiredEnvVars = [
    "NEXT_PUBLIC_BASE_URL",
    "ESEWA_MERCHANT_CODE",
    "ESEWA_SECRET_KEY",
  ];
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing environment variable: ${envVar}`);
    }
  }
}

export async function createEsewaCheckoutSession(
  paymentData: PaymentRequestData,
) {
  validateEnvironmentVariables();
  const { amount, productName, method, transactionId } = paymentData;
  if (!amount || !productName || !method || !transactionId) {
    throw new Error("Missing required Fields");
  }

  const transactionUuid = `${transactionId}-${Date.now()}-${uuidv4()}`;

  const esewaConfig = {
    amount: amount,
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: process.env.ESEWA_MERCHANT_CODE!,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: transactionUuid,
  };

  const signatureString = `total_amount=${esewaConfig.total_amount},transaction_uuid=${esewaConfig.transaction_uuid},product_code=${esewaConfig.product_code}`;

  const esewaSignature = generateEsewaSignature(
    process.env.ESEWA_SECRET_KEY!,
    signatureString,
  );

  return {
    amount: amount,
    esewaConfig: {
      ...esewaConfig,
      esewaSignature,
      // product_service_charge: Number(esewaConfig.product_service_charge),
      // product_delivery_charge: Number(esewaConfig.product_delivery_charge),
      // tax_amount: Number(esewaConfig.tax_amount),
      // total_amount: Number(esewaConfig.total_amount),
    },
  };
}
