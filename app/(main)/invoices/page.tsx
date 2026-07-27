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
import { Fragment } from "react";

const InvoicesPage = async () => {
  const tenantId = await getCurrentTenant();
  if (!tenantId)
    return (
      <p className="mt-6 text-center text-base sm:text-lg text-gray-500">
        You are not authorized
      </p>
    );

  const paidInvoices = await getPaidInvoicesByTenantId(tenantId.id);

  if (paidInvoices.length === 0) {
    return (
      <div className="mx-4 sm:mx-6 lg:mx-auto max-w-7xl flex text-lg sm:text-2xl justify-center border-t border-gray-100 items-center gap-4 w-auto mt-6 py-6 text-gray-400">
        <LayoutList className="h-6 w-6 sm:h-7 sm:w-7" />
        <p>There is no any unpaid invoices</p>
      </div>
    );
  }

  return (
    <div className="w-auto max-w-7xl mx-4 sm:mx-6 lg:mx-auto mt-6">
      <h2 className="font-semibold text-primary text-2xl sm:text-3xl mb-4 sm:mb-8 mt-2 px-1">
        Paid Invoices
      </h2>

      <Table className="w-full table-fixed border-collapse text-[10px] sm:text-sm">
        <colgroup>
          <col className="w-[26%]" />
          <col className="w-[16%]" />
          <col className="w-[16%]" />
          <col className="w-[16%]" />
          <col className="w-[16%]" />
          <col className="w-[26%]" />
        </colgroup>

        <TableCaption className="text-gray-500">
          A list of your paid invoices.
        </TableCaption>

        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="py-3">Month</TableHead>
            <TableHead colSpan={2} className="py-3 text-right">
              Total
            </TableHead>
            <TableHead colSpan={2} className="py-3 text-right">
              PaidAt
            </TableHead>
            <TableHead colSpan={2} className="py-3 text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paidInvoices.map((invoice) => (
            <Fragment key={invoice.id}>
              <TableRow className="border-b border-gray-100 align-top">
                <TableCell className="font-medium py-4 whitespace-normal break-words">
                  {invoice.electricBill[0].toDate.toLocaleDateString(
                    "default",
                    {
                      month: "long",
                    },
                  )}
                </TableCell>

                <TableCell
                  colSpan={2}
                  className="text-right py-4 font-semibold whitespace-normal break-words"
                >
                  Rs. {invoice.totalAmount}
                </TableCell>
                <TableCell
                  colSpan={2}
                  className="text-right py-4 font-semibold whitespace-normal break-words"
                >
                  {invoice.payments[0]?.paidAt.toLocaleDateString()}
                </TableCell>

                <TableCell colSpan={2} className="text-right py-4">
                  <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] sm:text-sm font-medium text-green-700">
                    {invoice.status}
                  </span>
                </TableCell>
              </TableRow>

              {invoice.electricBill.map((bill) => (
                <TableRow
                  key={bill.id}
                  className="border-b border-gray-100 text-[10px] sm:text-sm text-gray-500"
                >
                  <TableCell className="pl-2 sm:pl-6 py-2 whitespace-normal break-all leading-snug">
                    Meter:{" "}
                    <span className="break-all">
                      {bill.electricMeter?.meterNumber}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 whitespace-nowrap leading-snug">
                    Prev: {bill.previousReading}
                  </TableCell>
                  <TableCell className="py-2 whitespace-nowrap leading-snug">
                    Curr: {bill.currentReading}
                  </TableCell>
                  <TableCell className="py-2 whitespace-nowrap leading-snug">
                    Units: {bill.unitsConsumed}
                  </TableCell>
                  <TableCell className="py-2 whitespace-nowrap leading-snug">
                    Electric: {bill.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoicesPage;
