"use server";
import Filter from "./_components/InvoiceFilter";
import AddInvoiceButton from "./_components/InvoiceForm";
import TenantList from "./_components/InvoiceList";
import { getAllMeters } from "@/lib/queries/meter";

const AdminInvoice = async () => {
  const meters = await getAllMeters();
  return (
    <div className="flex-1 pt-5 px-16 bg-yellow-100 ">
      <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
        <div className=" w-fit">
          <h1 className="text-4xl font-bold w-fit">Invoice</h1>
        </div>
        <div>
          <AddInvoiceButton meters={meters} />
        </div>
      </div>
      <div className="mt-4 px-4 ">
        <Filter />
      </div>
      <div className="mt-4">{<TenantList />}</div>
    </div>
  );
};
export default AdminInvoice;
