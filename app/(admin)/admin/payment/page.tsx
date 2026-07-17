import { getPendingInvoicesForPayment } from "@/lib/queries/invoice";
import FilterForm from "./_components/FilterForm";
import PaymentForm from "./_components/PaymentForm";
import PaymentList from "./_components/PaymentList";

interface Props {
  searchParams: Promise<{ month?: string; year?: string }>;
}

const AdminPayment = async ({ searchParams }: Props) => {
  const { month, year } = await searchParams;
  const invoices = await getPendingInvoicesForPayment();
  return (
    <div className="flex-1 p-2 bg-primary h-full">
      <div className="bg-admin-ui rounded-md h-full w-full px-16 pt-5">
        <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
          <div className=" w-fit">
            <h1 className="text-4xl font-bold w-fit text-primary">
              Payment History
            </h1>
          </div>
          <div className="flex gap-4 ">
            <FilterForm />
            <PaymentForm invoices={invoices} />
          </div>
        </div>
        <div className="mt-4">{<PaymentList month={month} year={year} />}</div>
      </div>
    </div>
  );
};
export default AdminPayment;
