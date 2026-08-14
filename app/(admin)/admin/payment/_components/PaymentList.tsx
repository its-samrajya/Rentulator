import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { getPayments } from "@/lib/queries/payments";
import { Printer, Receipt } from "lucide-react";
import Link from "next/link";

const PaymentList = async ({
  month,
  year,
}: {
  month?: string;
  year?: string;
}) => {
  const payments = await getPayments({ month, year });

  return (
    <Card className="border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Receipt className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Payments</h2>
          <p className="text-xs text-slate-400">
            {payments.length} {payments.length === 1 ? "record" : "records"}
            {month || year ? " · filtered" : ""}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                DATE
              </TableHead>
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                TENANT
              </TableHead>
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                FLOOR
              </TableHead>
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                ROOM
              </TableHead>
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                METHOD
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                AMOUNT
              </TableHead>
              <TableHead className="h-10 px-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                RECEIPT
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow className="border-transparent hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-sm text-slate-400"
                >
                  No payments recorded for this period.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-slate-100 transition-colors hover:bg-slate-50/70"
                >
                  <TableCell className="px-3 py-3 font-medium text-slate-900">
                    {new Date(payment.paidAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-slate-700">
                    {payment.invoice.tenant.name}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-slate-600">
                    {[
                      ...new Set(
                        payment.invoice.tenant.occupancies.map(
                          (occupancy) => occupancy.room.floor,
                        ),
                      ),
                    ].join(",")}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-slate-600">
                    {[
                      ...new Set(
                        payment.invoice.tenant.occupancies.map(
                          (occupancy) => occupancy.room.roomNumber,
                        ),
                      ),
                    ].join(",")}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-slate-600">
                    {payment.note}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-right font-medium text-slate-900">
                    {payment.amount}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-center">
                    <Button
                      className="h-8 w-8 cursor-pointer"
                      size="icon"
                      variant="ghost"
                      asChild
                    >
                      <Link
                        href={`/admin/payment/receipt/${payment.id}`}
                        target="_blank"
                      >
                        <Printer className="h-4 w-4 text-blue-600" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default PaymentList;
