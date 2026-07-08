import { Button } from "@/components/ui/button";
import { DropdownMenuDestructive } from "../../tenants/_components/DropdownActions";
import { getInvoices } from "@/lib/queries/invoice";

const InvoiceList = async () => {
  const invoices = await getInvoices();

  return (
    <div className="grid grid-cols-3 gap-6">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="p-6 bg-white gap-6 rounded-md shadow-lg"
        >
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex gap-4 items-center ">
              <div className="rounded-full p-2 size-10 flex items-center justify-center border-2">
                {invoice.tenant.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{invoice.tenant.name}</span>
                <span className="font-light text-sm text-gray-300">
                  {invoice.tenant.occupancies.map((o) => o.room.floor)}
                </span>
              </div>
            </div>
            {/* <button className="cursor-pointer"> */}
            {/*   <Ellipsis /> */}
            {/* </button> */}
            {/* <DropdownMenuDestructive /> */}
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex justify-between">
              <span>Rent Amount</span>
              <span>{invoice.totalAmount} </span>
            </div>
            <div className="flex justify-between">
              <span>Due Date</span>
              <span>{invoice.dueDate.toLocaleDateString() || "not yet"}</span>
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <span>{invoice.status || "not yet"}</span>
            </div>
          </div>
          <div className="text-center">
            <Button>Remind</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default InvoiceList;
