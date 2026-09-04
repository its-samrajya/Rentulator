"use client";
import { createEsewaCheckoutSession } from "@/actions/checkoutAction";
import { Button } from "@/components/ui/button";
import { submitToEsewa } from "@/lib/submitToEsewa";
import { TenantWithRooms, unpaidInvoicesType } from "@/lib/types";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  unpaidInvoices: unpaidInvoicesType;
  tenant: TenantWithRooms;
}

const RentDetails = ({ unpaidInvoices, tenant }: Props) => {
  const [isPaying, setIsPaying] = useState(false);
  const latestInvoice = unpaidInvoices[0];
  const totalRent = tenant.occupancies.reduce(
    (sum, occupancy) => sum + occupancy.room.price,
    0,
  );

  const handlePay = async () => {
    if (!latestInvoice) return;
    setIsPaying(true);

    try {
      const PaymentData = await createEsewaCheckoutSession({
        method: "esewa",
        amount: latestInvoice.totalAmount.toString(),
        productName: `Invoice payment - ${latestInvoice.id}`,
        transactionId: latestInvoice.id,
      });
      toast.success(
        "Payment Initiated. Redirecting to eSewa payment gateway...",
      );
      submitToEsewa(PaymentData.amount, PaymentData.esewaConfig);
    } catch (error) {
      console.log("Payment error", error);
      toast.error("Payment Error");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="bg-white flex-1 rounded-lg p-4 shadow-sm sm:p-5">
        <div className="border-b border-slate-200 pb-3 mb-4">
          <h1 className="text-blue-900 font-medium">
            Current Month Rent Details
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-pink-700 font-medium">Month</p>
            <p className="text-xl font-bold">
              {formatNepaliDate(latestInvoice?.electricBill[0].toDate, "MMMM")}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Room Amount</p>
            <p className="">Rs.{totalRent}</p>
          </div>

          {latestInvoice?.electricBill.map((bill) => (
            <div
              key={bill.id}
              className="mt-2 bg-linear-to-r from-slate-50 to-blue-50/30 rounded-xl p-4 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-yellow-100 flex items-center justify-center">
                  <Zap size={12} className="text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Meter_No: {bill.electricMeter?.meterNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500 truncate">
                    Current Reading
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    {bill.currentReading}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500 truncate">
                    Previous Reading
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    {bill.previousReading}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500 truncate">
                    Unit Consumed
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    {bill.unitsConsumed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500 truncate">
                    Rate Per Unit
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    Rs.{bill.ratePerUnit}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/70 flex justify-between items-center">
                <span className="text-xs text-slate-500">Electric Amount</span>
                <span className="text-sm font-bold text-slate-800">
                  Rs.{bill.totalAmount}
                </span>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-3">
            <p className="text-primary font-medium">Total Amount</p>
            <p className="text-xl font-bold">
              Rs.{latestInvoice?.totalAmount || 0}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-primary font-medium">Due Date</div>
            <div className="text-purple-700 bg-purple-50 rounded-full px-3 py-1 font-medium text-sm">
              {formatNepaliDate(latestInvoice?.dueDate)}
            </div>
          </div>

          <div className="bg-rose-50 rounded-lg p-4 border border-rose-100">
            <p className="text-rose-700 font-medium">
              Recent balance to be paid
            </p>
            <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-rose-700 font-bold text-2xl sm:text-3xl">
                Rs.{latestInvoice?.totalAmount || 0}
              </p>
              <Button
                onClick={handlePay}
                variant="destructive"
                className="w-full sm:w-auto"
                disabled={isPaying}
              >
                {isPaying ? "Redirecting..." : "Pay now"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 rounded-lg p-4 shadow-sm sm:p-5">
        <div className="border-b border-slate-200 pb-3 mb-4">
          <h1 className="text-blue-900 font-medium">Landlord Contact</h1>
        </div>
        <div className="flex gap-3 items-center">
          <div className="rounded-full p-2 size-10 flex items-center justify-center bg-slate-100 border">
            <span>SM</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-primary">
              Samrajya Bhari
            </span>
            <span className="text-slate-400 text-sm">+977 989389283928</span>
          </div>
        </div>
        <Button
          variant="ghost"
          asChild
          className="border mt-4 w-full cursor-pointer border-blue-500 rounded-md p-2 text-blue-500 hover:text-blue-600"
        >
          <Link target="_blank" href="https://wa.me/9817511743">
            Message on Whatsapp
          </Link>
        </Button>
        <div className="mt-4 flex justify-center">
          <Image
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW1pc2o4aTVyNDFwNWpxb2ZydG9peGZzdXp5d29vcGh3bnBqMmV0aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9urAfGd3grKV6E/giphy.gif"
            alt="Giphy illustration"
            width={480}
            height={320}
            unoptimized
            className="w-60 object-contain opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default RentDetails;
