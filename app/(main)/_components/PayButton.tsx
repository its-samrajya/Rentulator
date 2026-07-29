"use client";

import { createEsewaCheckoutSession } from "@/actions/checkoutAction";
import { Button } from "@/components/ui/button";
import { submitToEsewa } from "@/lib/submitToEsewa";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  invoiceId: string;
  amount: number;
}

export const PayButton = ({ invoiceId, amount }: Props) => {
  const [isPaying, setIsPaying] = useState(false);
  const handlePay = async () => {
    setIsPaying(true);
    try {
      const PaymentData = await createEsewaCheckoutSession({
        method: "esewa",
        amount: amount.toString(),
        productName: `Invoice payment - ${invoiceId}`,
        transactionId: invoiceId,
      });
      toast.success("Redirecting to esewa....");
      submitToEsewa(PaymentData.amount, PaymentData.esewaConfig);
    } catch (error) {
      console.log("Payment error", error);
      toast.error("Payment failed");
    } finally {
      setIsPaying(false);
    }
  };
  return (
    <Button
      onClick={handlePay}
      disabled={isPaying}
      variant="destructive"
      size="sm"
    >
      {isPaying ? "Processing..." : "Pay now"}
    </Button>
  );
};
