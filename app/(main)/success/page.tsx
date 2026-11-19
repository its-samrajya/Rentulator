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
import { cn } from "@/lib/utils";

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
    <div className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center px-4 py-10 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:py-16">
      <Card className="w-full max-w-md gap-0 rounded-2xl border-border/70 bg-card p-6 text-center shadow-sm sm:p-8">
        <CardHeader className="p-0">
          <div
            className={cn(
              "mx-auto flex size-16 items-center justify-center rounded-full",
              verified
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300",
            )}
          >
            {verified ? (
              <CheckCircle className="size-8" aria-hidden="true" />
            ) : (
              <XCircle className="size-8" aria-hidden="true" />
            )}
          </div>
          <CardTitle
            className={cn(
              "mt-5 text-balance text-2xl font-semibold tracking-tight",
              verified
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-rose-700 dark:text-rose-300",
            )}
          >
            {verified ? "Payment Successful!" : "Payment Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-3 p-0">
          <p className="text-pretty text-sm leading-6 text-muted-foreground">
            {verified
              ? "Thank you for your payment. Your transaction has been completed successfully."
              : "We couldn't verify this payment. Please contact support if you believe this is an error."}
          </p>
        </CardContent>
        <CardFooter className="mt-8 flex flex-col gap-4 p-0">
          <Button variant="outline" asChild className="h-11 w-full rounded-xl">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
