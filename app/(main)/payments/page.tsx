import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getCurrentTenant from "@/lib/currentTenant";
import { getPaymentsByTenant } from "@/lib/queries/payments";

export default async function HistoryPage() {
  const tenantId = await getCurrentTenant();
  if (!tenantId)
    return (
      <p className="mt-6 text-center text-base sm:text-lg text-gray-500">
        You are not authorized
      </p>
    );

  const payments = await getPaymentsByTenant(tenantId.id);
  if (!payments) {
    return (
      <div className="mx-4 sm:mx-6 lg:mx-auto max-w-7xl mt-6 border-t border-gray-100 py-6 text-center text-base sm:text-lg text-gray-400">
        No History
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="border border-gray-200 rounded-xl">
        <Table className="w-full table-fixed text-xs sm:text-sm">
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50">
              <TableHead className="w-[34%] py-3 text-center text-[11px] sm:text-sm tracking-wide">
                DATE
              </TableHead>
              <TableHead className="w-[26%] py-3 text-center text-[11px] sm:text-sm tracking-wide">
                AMOUNT
              </TableHead>
              <TableHead className="w-[40%] py-3 text-center text-[11px] sm:text-sm tracking-wide">
                METHOD
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow
                className="border-b border-gray-100 last:border-b-0"
                key={payment.id}
              >
                <TableCell className="font-medium text-center py-3 whitespace-nowrap">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center py-3 whitespace-nowrap">
                  {payment.amount}
                </TableCell>
                <TableCell className="text-center py-3 whitespace-normal wrap-break-word">
                  {payment.note}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
