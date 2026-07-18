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
    <div className="min-h-full w-full bg-slate-100/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Invoice
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Generate and manage tenant invoices
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <GenerateButton />
            <AddInvoiceButton meters={meters} />
          </div>
        </div>
        <div className="mt-4">
          <Filter />
        </div>
        <div className="mt-6">
          <InvoiceList status={status} />
        </div>
      </div>
    </div>
  );
};

export default AdminInvoice;
