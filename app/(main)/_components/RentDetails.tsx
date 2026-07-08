import { Button } from "@/components/ui/button";
import { TenantWithRooms, unpaidInvoicesType } from "@/lib/types";
import { Zap } from "lucide-react";
import Link from "next/link";

interface Props {
  unpaidInvoices: unpaidInvoicesType;
  tenant: TenantWithRooms;
}

const RentDetails = ({ unpaidInvoices, tenant }: Props) => {
  const latestInvoice = unpaidInvoices[0];
  const totalRent = tenant.occupancies.reduce(
    (sum, occupancy) => sum + occupancy.room.price,
    0,
  );
  return (
    <div className="flex mt-4 gap-4 justify-between">
      <div className="bg-white flex-1 rounded-md p-4 shadow-sm">
        <div className="border-b border-black p-2 mb-3">
          <h1 className="text-blue-900 font-medium">
            Current Month Rent Details
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <p className="text-pink-700 font-medium">Month</p>
            <p className="text-xl font-bold">
              {latestInvoice?.electricBill[0].toDate.toLocaleDateString(
                "default",
                {
                  month: "long",
                },
              )}
            </p>
          </div>

          <div className="flex justify-between">
            <p>Room Amount</p>
            <p className="">Rs.{totalRent}</p>
          </div>

          {latestInvoice?.electricBill.map((bill) => (
            <div
              key={bill.id}
              className="mt-4 bg-linear-to-r from-slate-50 to-blue-50/30 rounded-xl p-4 border border-slate-100"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-yellow-100 flex items-center justify-center">
                  <Zap size={12} className="text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-slate-700">
                  Meter_No: {bill.electricMeter?.id}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">
                    Current Reading
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    {bill.currentReading}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">
                    Previous Reading
                  </span>
                  <span className="text-xs font-medium text-slate-700">
                    {bill.previousReading}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Unit Consumed</span>
                  <span className="text-xs font-medium text-slate-700">
                    {bill.unitsConsumed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Rate Per Unit</span>
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

          <div className="flex justify-between mt-3  ">
            <p className="text-primary font-medium">Total Amount</p>
            <p className="text-xl font-bold ">
              Rs.{latestInvoice?.totalAmount || 0}
            </p>
          </div>

          <div className="flex justify-between">
            <div className="text-primary font-medium">Due Date</div>
            <div className="text-purple-700 bg-purple-50 rounded-full px-2 font-medium">
              {latestInvoice?.dueDate.toLocaleDateString()}
            </div>
          </div>

          <div className="bg-red-100 rounded-md p-4">
            <div>
              <p className="text-red-700 font-medium">
                Recent balance to be paid
              </p>
              <div className="flex justify-between">
                <p className="text-red-700 font-medium text-3xl">
                  Rs.{latestInvoice?.totalAmount || 0}
                </p>
                <Button asChild variant="destructive">
                  <Link href="/">Pay now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 rounded-md p-4 shadow-sm">
        <div className="border-b border-black p-2 mb-3">
          <h1 className="text-blue-900 font-medium">Landlord Contact</h1>
        </div>
        <div className="flex gap-3 items-center">
          <div className="rounded-full p-2 size-10 flex items-center justify-center bg-gray-200 border">
            <span>SM</span>
          </div>
          <div className="flex flex-col ">
            <span className="font-bold text-xl text-primary">
              Samrajya Bhari
            </span>
            <span className="text-gray-400 text-sm">+977 989389283928</span>
          </div>
        </div>
        <button className="border mt-4 w-full cursor-pointer border-blue-500 rounded-md p-2 text-blue-500">
          Message on Whatsapp
        </button>
      </div>
    </div>
  );
};

export default RentDetails;
