import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSkippedUnpaidInvoicesByTenantId } from "@/lib/queries/invoice";
import Link from "next/link";

interface Props {
  tenantId: string;
}

const UnpaidInvoices = async ({ tenantId }: Props) => {
  const unpaidInvoices = await getSkippedUnpaidInvoicesByTenantId(tenantId);
  if (unpaidInvoices.length === 0) {
    return <div>There is no any unpaid invoices</div>;
  }
  return (
    <div className="bg-white mt-6 p-3  shadow-lg rounded-md">
      <h2 className="text-base font-semibold text-gray-900 mb-4 mt-2 px-2">
        Unpaid Invoices
      </h2>
      <Table>
        <TableCaption>A list of your unpaid invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Month</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unpaidInvoices.map((invoice) => (
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
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
                <TableCell className="text-right">{invoice.status}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="destructive">
                    <Link href="/">Pay now</Link>
                  </Button>
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

export default UnpaidInvoices;
