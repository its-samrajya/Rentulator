import { getPendingInvoicesForPayment } from "@/lib/queries/invoice";
import FilterForm from "./_components/FilterForm";
import PaymentForm from "./_components/PaymentForm";
import PaymentList from "./_components/PaymentList";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{ month?: string; year?: string }>;
}

export const metadata: Metadata = {
  title: "Payments",
};

const AdminPayment = async ({ searchParams }: Props) => {
  const { month, year } = await searchParams;
  const invoices = await getPendingInvoicesForPayment();

  return (
    <div className="min-h-full w-full bg-slate-100/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Payment History
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track and record tenant payments
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <FilterForm />
            <PaymentForm invoices={invoices} />
          </div>
        </div>
        <div className="mt-4">
          <PaymentList month={month} year={year} />
        </div>
      </div>
    </div>
  );
};

export default AdminPayment;
