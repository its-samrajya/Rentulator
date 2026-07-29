export type PaymentMethod = "cash" | "esewa";

export interface PaymentRequestData {
  amount: string;
  productName: string;
  transactionId: string;
  method: PaymentMethod;
}
