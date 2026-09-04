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
import { formatNepaliDate } from "@/utils/nepaliDate";
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
      <div className="px-4 sm:px-6 lg:px-0 max-w-7xl lg:mx-auto flex text-lg sm:text-2xl justify-center border-t border-gray-100 items-center gap-4 mt-6 py-6 text-gray-400">
        <LayoutList className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0" />
        <p>There is no any unpaid invoices</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl lg:mx-auto mt-6">
      <h2 className="font-semibold text-primary text-2xl sm:text-3xl mb-4 sm:mb-8 mt-2">
        Paid Invoices
      </h2>

      <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0">
        <div className="px-4 sm:px-6 lg:px-0">
          <Table className="w-full border-collapse text-xs sm:text-sm min-w-full">
            <TableCaption className="text-gray-500">
              A list of your paid invoices.
            </TableCaption>

            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="py-3 px-2 sm:px-4 text-left min-w-24">
                  Month
                </TableHead>
                <TableHead
                  colSpan={2}
                  className="py-3 px-2 sm:px-4 text-right min-w-28"
                >
                  Total
                </TableHead>
                <TableHead
                  colSpan={2}
                  className="py-3 px-2 sm:px-4 text-right min-w-32"
                >
                  PaidAt
                </TableHead>
                <TableHead
                  colSpan={2}
                  className="py-3 px-2 sm:px-4 text-right min-w-24"
                >
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paidInvoices.map((invoice) => (
                <Fragment key={invoice.id}>
                  <TableRow className="border-b border-gray-100 align-top">
                    <TableCell className="font-medium py-4 px-2 sm:px-4 text-left">
                      {formatNepaliDate(invoice.electricBill[0].toDate, "MMMM")}
                    </TableCell>

                    <TableCell
                      colSpan={2}
                      className="text-right py-4 px-2 sm:px-4 font-semibold"
                    >
                      Rs. {invoice.totalAmount}
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      className="text-right py-4 px-2 sm:px-4 font-semibold"
                    >
                      {formatNepaliDate(invoice.payments[0]?.paidAt)}
                    </TableCell>

                    <TableCell
                      colSpan={2}
                      className="text-right py-4 px-2 sm:px-4"
                    >
                      <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 sm:px-3 py-1 text-[10px] sm:text-sm font-medium text-green-700 whitespace-nowrap">
                        {invoice.status}
                      </span>
                    </TableCell>
                  </TableRow>

                  {invoice.electricBill.map((bill) => (
                    <TableRow
                      key={bill.id}
                      className="border-b border-gray-100 text-xs sm:text-sm text-gray-500"
                    >
                      <TableCell className="px-2 sm:px-4 py-2 leading-tight">
                        <div className="break-words">
                          Meter:{" "}
                          <span className="font-medium text-gray-700 inline break-words">
                            {bill.electricMeter?.meterNumber}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-2 sm:px-4 py-2 text-right leading-tight">
                        <div className="whitespace-nowrap">
                          Prev: {bill.previousReading}
                        </div>
                      </TableCell>
                      <TableCell className="px-2 sm:px-4 py-2 text-right leading-tight">
                        <div className="whitespace-nowrap">
                          Curr: {bill.currentReading}
                        </div>
                      </TableCell>
                      <TableCell className="px-2 sm:px-4 py-2 text-right leading-tight">
                        <div className="whitespace-nowrap">
                          Units: {bill.unitsConsumed}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
