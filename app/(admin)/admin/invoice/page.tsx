"use server";
import Filter from "./_components/InvoiceFilter";
import AddInvoiceButton from "./_components/InvoiceForm";
import { getAllMeters } from "@/lib/queries/meter";
import GenerateButton from "./_components/GenerateAllInvoiceButton";
import InvoiceList from "./_components/InvoiceList";
import { InvoiceFilterStatus } from "@/lib/types";

interface Props {
  searchParams: Promise<{ status?: string }>;
}

const AdminInvoice = async ({ searchParams }: Props) => {
  const meters = await getAllMeters();
  const { status: rawStatus } = await searchParams;
  const status: InvoiceFilterStatus =
    rawStatus === "paid" || rawStatus === "pending" || rawStatus === "overdue"
      ? rawStatus
      : "all";

  return (
    <div className="flex-1 p-2 bg-primary h-full">
      <div className="bg-admin-ui rounded-md h-full w-full px-16 pt-5">
        <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
          <div className=" w-fit">
            <h1 className="text-4xl font-bold w-fit text-primary">Invoice</h1>
          </div>
          <div className="flex gap-4">
            <GenerateButton />
            <AddInvoiceButton meters={meters} />
          </div>
        </div>
        <div className="mt-4 px-4 ">
          <Filter />
        </div>
        <div className="mt-4">{<InvoiceList status={status} />}</div>
      </div>
    </div>
  );
};
export default AdminInvoice;
