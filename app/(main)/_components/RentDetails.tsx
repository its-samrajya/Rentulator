import { Button } from "@/components/ui/button";
import Link from "next/link";

const RentDetails = () => {
  return (
    <div className="flex mt-4 gap-4 justify-between">
      <div className="bg-white flex-1 rounded-md p-4">
        <div className="border-b border-black p-2 mb-3">
          <h1>Rent Details</h1>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p>Rent Amount</p>
            <p className="text-3xl font-bold">150000</p>
          </div>
          <div className="flex justify-between">
            <div>Due Date</div>
            <div>5th of every month</div>
          </div>
          <div className="bg-red-100 rounded-md p-4">
            <div>
              <p className="text-red-700 font-medium">
                You have a pending balance
              </p>
              <div className="flex justify-between">
                <p className="text-red-700 font-medium text-3xl">15000</p>
                <Button asChild variant="destructive">
                  <Link href="/">Pay now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex-1 rounded-md p-4 ">
        <div className="border-b border-black p-2 mb-3">
          <h1>Landlord Contact</h1>
        </div>
        <div className="flex gap-3 items-center">
          <div className="rounded-full p-2 size-10 flex items-center justify-center bg-gray-200 border">
            <span>SM</span>
          </div>
          <div className="flex flex-col ">
            <span className="font-bold text-xl">Samrajya Bhari</span>
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
