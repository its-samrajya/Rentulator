import { Button } from "@/components/ui/button";
import { TenantWithRooms, unpaidInvoicesType } from "@/lib/types";
import Link from "next/link";

interface Props {
  unpaidInvoices: unpaidInvoicesType;
  tenant: TenantWithRooms;
}

const RentDetails = ({ unpaidInvoices, tenant }: Props) => {
  const latestInvoice = unpaidInvoices[0];
  const totalRent = tenant.rooms.reduce((sum, room) => sum + room.price, 0);
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
              {latestInvoice.electricBill[0].toDate.toLocaleDateString(
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

          {latestInvoice.electricBill.map((bill) => (
            <div
              key={bill.id}
              className="flex justify-between border-b border-black"
            >
              <div className="flex flex-col gap-1">
                <p>Current Reading</p>
                <p>Previous Reading</p>
                <p>Unit Consumed</p>
                <p>Rate Per Unit</p>
                <p>Electric Amount</p>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <p>{bill.currentReading}</p>
                <p>{bill.previousReading}</p>
                <p>{bill.unitsConsumed}</p>
                <p>Rs.{bill.ratePerUnit}</p>
                <p>Rs.{bill.totalAmount}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-3  ">
            <p className="text-primary font-medium">Total Amount</p>
            <p className="text-xl font-bold">Rs.{latestInvoice.totalAmount}</p>
          </div>

          <div className="flex justify-between">
            <div className="text-primary font-medium">Due Date</div>
            <div className="text-purple-800 font-medium">
              {latestInvoice.dueDate.toLocaleDateString()}
            </div>
          </div>

          <div className="bg-red-100 rounded-md p-4">
            <div>
              <p className="text-red-700 font-medium">
                Recent balance to be paid
              </p>
              <div className="flex justify-between">
                <p className="text-red-700 font-medium text-3xl">
                  Rs.{latestInvoice.totalAmount}
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
