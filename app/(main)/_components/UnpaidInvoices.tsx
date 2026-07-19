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
import { LayoutList } from "lucide-react";
import Link from "next/link";

interface Props {
  tenantId: string;
}

const UnpaidInvoices = async ({ tenantId }: Props) => {
  const unpaidInvoices = await getSkippedUnpaidInvoicesByTenantId(tenantId);
  if (unpaidInvoices.length === 0) {
    return (
      <div className="flex justify-center border-t border-slate-100 items-center gap-4 w-full mt-6 p-5 text-slate-400 bg-white rounded-lg shadow-sm">
        <LayoutList className="h-5 w-5" />
        <p className="text-sm">There are no unpaid invoices</p>
      </div>
    );
  }
  return (
    <div className="bg-white mt-6 p-4 sm:p-5 shadow-sm rounded-lg">
      <h2 className="text-base font-semibold text-slate-900 mb-4 px-1">
        Unpaid Invoices
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>A list of your unpaid invoices.</TableCaption>
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="w-25 h-10 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Month
              </TableHead>
              <TableHead className="h-10 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Total
              </TableHead>
              <TableHead className="h-10 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </TableHead>
              <TableHead className="h-10 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due Date
              </TableHead>
              <TableHead className="h-10 text-right pr-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unpaidInvoices.map((invoice) => (
              <>
                <TableRow key={invoice.id} className="border-slate-100">
                  <TableCell className="font-medium text-slate-900">
                    {invoice.electricBill[0].toDate.toLocaleDateString(
                      "default",
                      {
                        month: "long",
                      },
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    Rs. {invoice.totalAmount}
                  </TableCell>
                  <TableCell className="text-right">{invoice.status}</TableCell>
                  <TableCell className="text-right">
                    {new Date(invoice.dueDate).toLocaleDateString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="destructive" size="sm">
                      <Link href="/">Pay now</Link>
                    </Button>
                  </TableCell>
                </TableRow>
                {invoice.electricBill.map((bill) => (
                  <TableRow
                    key={bill.id}
                    className="bg-slate-50 text-sm text-slate-500"
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
    </div>
  );
};

export default UnpaidInvoices;
