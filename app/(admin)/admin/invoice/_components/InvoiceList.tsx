import { getInvoicesByFilter } from "@/lib/queries/invoice";
import { InvoiceFilterStatus } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap } from "lucide-react";

interface Props {
  status: InvoiceFilterStatus;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  OVERDUE: "bg-rose-50 text-rose-700 border-rose-200",
};

const InvoiceList = async ({ status }: Props) => {
  const invoices = await getInvoicesByFilter(status);

  if (invoices.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <FileText className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-slate-600">No invoices found</p>
        <p className="mt-1 text-xs text-slate-400">
          No invoices match the current filter.
        </p>
      </Card>
    );
  }

  return (
    <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
      {invoices.map((invoice) => (
        <Card
          key={invoice.id}
          className="mb-4 break-inside-avoid border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:mb-5 sm:p-6 lg:mb-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
                {invoice.tenant.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-slate-900">
                  {invoice.tenant.name}
                </span>

                <span className="text-xs text-slate-400">
                  {[
                    ...new Set(
                      invoice.tenant.occupancies.map((o) => o.room.floor),
                    ),
                  ].join(",")}
                </span>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`border ${
                statusStyles[invoice.status] ??
                "border-slate-200 bg-slate-50 text-slate-600"
              }`}
            >
              {invoice.status}
            </Badge>
          </div>

          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Rent Amount</span>
              <span className="font-medium text-slate-900">
                {invoice.totalAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Due Date</span>
              <span className="font-medium text-slate-900">
                {invoice.dueDate.toLocaleDateString() || "not yet"}
              </span>
            </div>

            <div>
              {invoice.electricBill.map((bill) => (
                <div
                  key={bill.id}
                  className="mt-2 rounded-xl border border-slate-100 bg-linear-to-r from-slate-50 to-blue-50/30 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      {bill.electricMeter?.meterNumber}
                    </span>

                    <span className="text-sm font-medium text-slate-700">
                      {bill.toDate.toLocaleDateString("default", {
                        month: "long",
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">
                        Current Reading
                      </span>
                      <span className="text-xs font-medium text-slate-700">
                        {bill.currentReading}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">
                        Previous Reading
                      </span>
                      <span className="text-xs font-medium text-slate-700">
                        {bill.previousReading}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">
                        Unit Consumed
                      </span>
                      <span className="text-xs font-medium text-slate-700">
                        {bill.unitsConsumed}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">
                        Rate Per Unit
                      </span>
                      <span className="text-xs font-medium text-slate-700">
                        Rs.{bill.ratePerUnit}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center justify-between border-slate-200/70 pt-2">
                    <span className="text-xs text-slate-500">
                      Electric Amount
                    </span>

                    <span className="text-sm font-bold text-slate-800">
                      Rs.{bill.totalAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <Button variant="outline" className="w-full">
              Remind
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InvoiceList;
