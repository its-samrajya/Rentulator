import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { verifyEsewaPayment } from "@/lib/verifyEsewaPayment";

interface SuccessPageProps {
  searchParams: Promise<{ method?: string; data?: string }>;
}

export const metadata: Metadata = {
  title: "Payment Successful",
};

export default async function PaymentSuccess({
  searchParams,
}: SuccessPageProps) {
  const { data } = await searchParams;

  let verified = false;

  if (data) {
    verified = await verifyEsewaPayment(data);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            {verified ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <CardTitle
            className={`text-center text-2xl font-bold ${
              verified ? "text-green-700" : "text-red-700"
            }`}
          >
            {verified ? "Payment Successful!" : "Payment Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-600">
            <p className="mb-2">
              {verified
                ? "Thank you for your payment. Your transaction has been completed successfully."
                : "We couldn't verify this payment. Please contact support if you believe this is an error."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
