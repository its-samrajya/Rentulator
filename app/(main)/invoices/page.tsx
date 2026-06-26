import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getCurrentTenant from "@/lib/currentTenant";
import { getPaidInvoicesByTenantId } from "@/lib/queries/invoice";
import { LayoutList } from "lucide-react";

const InvoicesPage = async () => {
  const tenantId = await getCurrentTenant();
  if (!tenantId) return <p>You are not authorized</p>;
  const paidInvoices = await getPaidInvoicesByTenantId(tenantId.id);
  if (paidInvoices.length === 0) {
    return (
      <div className="flex text-2xl justify-center border-t border-gray-100 items-center gap-4 w-full mt-6 p-3 text-gray-400  bg-white rounded-md shadow-sm">
        <LayoutList />
        <p>There is no any unpaid invoices</p>
      </div>
    );
  }
  return (
    <div className="bg-white w-full mt-6 px-8  shadow-lg rounded-md">
      <h2 className="font-semibold text-primary text-3xl mb-8 mt-2 px-2">
        Paid Invoices
      </h2>
      <Table>
        <TableCaption>A list of your paid invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Month</TableHead>
            <TableHead colSpan={2} className="text-right">
              Total
            </TableHead>
            <TableHead colSpan={2} className="text-center">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paidInvoices.map((invoice) => (
            <>
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.electricBill[0].toDate.toLocaleDateString(
                    "default",
                    {
                      month: "long",
                    },
                  )}
                </TableCell>
                <TableCell colSpan={2} className="text-right">
                  Rs. {invoice.totalAmount}
                </TableCell>
                <TableCell colSpan={2} className="text-center">
                  <span className="p-2 rounded-md bg-green-500 text-white text-sm">
                    {invoice.status}
                  </span>
                </TableCell>
              </TableRow>
              {invoice.electricBill.map((bill) => (
                <TableRow
                  key={bill.id}
                  className="bg-gray-50 text-sm text-gray-500"
                >
                  <TableCell colSpan={1} className="pl-8">
                    Meter: {bill.electricMeter?.meterNumber}
                  </TableCell>
                  <TableCell>Prev: {bill.previousReading}</TableCell>
                  <TableCell>Curr: {bill.currentReading}</TableCell>
                  <TableCell>Units: {bill.unitsConsumed}</TableCell>
                  <TableCell>Electric: {bill.totalAmount}</TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default InvoicesPage;
