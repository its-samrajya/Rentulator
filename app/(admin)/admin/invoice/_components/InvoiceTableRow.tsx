"use client";
import { Fragment, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { getInvoicesByFilterType } from "@/lib/types";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { toast } from "react-toastify";

interface Props {
  invoice: getInvoicesByFilterType;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PARTIAL: "bg-rose-50 text-rose-700 border-rose-200",
};

const InvoiceTableRow = ({ invoice }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const formatAmount = (amount: number) => `Rs. ${amount.toLocaleString()}`;

  const months = useMemo(
    () =>
      invoice.electricBill.length > 0
        ? [
            ...new Set(
              invoice.electricBill.map((bill) =>
                formatNepaliDate(bill.toDate, "MMMM"),
              ),
            ),
          ].join(", ")
        : "—",
    [invoice],
  );

  const rentAmount = invoice.tenant.occupancies.reduce(
    (sum, occupancy) => sum + occupancy.room.price,
    0,
  );
  const electricityAmount = invoice.electricBill.reduce(
    (sum, bill) => sum + bill.totalAmount,
    0,
  );
  const remainingAmount =
    invoice.totalAmount -
    invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);

  const handleRemind = (invoice: getInvoicesByFilterType) => {
    const phone = invoice.tenant.phone;
    if (!phone) {
      toast.error("This tenant does not have a phone number");
      return;
    }

    const electricityDetails = invoice.electricBill
      .map(
        (bill) => `Your rent invoice for month ${formatNepaliDate(bill.toDate, "MMMM")}is ready.

Electricity Details: 
Meter: ${bill.electricMeter?.meterNumber ?? "N\A"}
previousReading: ${bill.previousReading},
currentReading: ${bill.currentReading},
unitsConsumed: ${bill.unitsConsumed},
Rate Per Unit: ${bill.ratePerUnit},
Electric Amount Payable: ${bill.totalAmount}
`,
      )
      .join("\n");

    const message = `Hi ${invoice.tenant.name},
${electricityDetails}
Total Payable Amount: Rs. ${invoice.totalAmount}
Due Date: ${formatNepaliDate(invoice.dueDate)}

Please make the payment by the due date. Thank you.`;

    const whatsappUrl = `https://wa.me/977${invoice.tenant.phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Fragment>
      <TableRow
        aria-expanded={expanded}
        className="cursor-pointer border-slate-100 transition-colors hover:bg-slate-50"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <TableCell className="px-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
              {invoice.tenant.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-slate-900">
              {invoice.tenant.name}
            </span>
          </div>
        </TableCell>

        <TableCell className="px-3 text-slate-600">{months}</TableCell>

        <TableCell className="px-3 text-right font-medium text-slate-900">
          {formatAmount(invoice.totalAmount)}
        </TableCell>

        <TableCell className="px-3">
          <Badge
            variant="outline"
            className={`border ${
              statusStyles[invoice.status] ??
              "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {invoice.status}
          </Badge>
        </TableCell>

        <TableCell className="px-3 text-slate-600">
          {formatNepaliDate(invoice.dueDate) || "not yet"}
        </TableCell>

        <TableCell className="px-3">
          <div className="flex items-center justify-end gap-1">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon-sm"
              aria-label={`Remind ${invoice.tenant.name}`}
              title="Remind"
              onClick={(event) => {
                event.stopPropagation();
                handleRemind(invoice);
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>

            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon-sm"
              aria-label={expanded ? "Collapse details" : "Expand details"}
              title={expanded ? "Collapse" : "Expand"}
              onClick={(event) => {
                event.stopPropagation();
                setExpanded((prev) => !prev);
              }}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {expanded && (
        <TableRow className="border-slate-100 bg-slate-50/60 hover:bg-slate-50/60">
          <TableCell
            colSpan={7}
            className="px-4 py-5 whitespace-normal align-top sm:px-6"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Invoice Details
                  </h4>
                  <dl className="mt-3 overflow-hidden rounded-lg border border-slate-200/70 bg-white">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 last:border-b-0">
                      <dt className="text-sm text-slate-500">Rent</dt>
                      <dd className="text-sm font-medium text-slate-900">
                        {formatAmount(rentAmount)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 last:border-b-0">
                      <dt className="text-sm text-slate-500">Electricity</dt>
                      <dd className="text-sm font-medium text-slate-900">
                        {formatAmount(electricityAmount)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 last:border-b-0">
                      <dt className="text-sm font-medium text-slate-600">
                        Total
                      </dt>
                      <dd className="text-sm font-semibold text-slate-900">
                        {formatAmount(invoice.totalAmount)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2.5">
                      <dt className="text-sm text-slate-500">Due Date</dt>
                      <dd className="text-sm font-medium text-slate-900">
                        {formatNepaliDate(invoice.dueDate) || "not yet"}
                      </dd>
                    </div>
                  </dl>
                </div>

                {invoice.status === "PARTIAL" && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Payment
                    </h4>
                    <div className="mt-3 flex items-center justify-between rounded-lg border border-rose-200/70 bg-rose-50/50 px-4 py-2.5">
                      <span className="text-sm text-rose-600">
                        Remaining Amount
                      </span>
                      <span className="text-sm font-semibold text-rose-700">
                        {formatAmount(remainingAmount)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Electricity
                </h4>
                <div className="mt-3 space-y-3">
                  {invoice.electricBill.map((bill) => (
                    <div
                      key={bill.id}
                      className="rounded-lg border border-slate-200/70 bg-white p-4"
                    >
                      <div className="mb-3">
                        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                          {bill.electricMeter?.meterNumber ?? "N/A"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
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
                            Units Consumed
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

                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="text-xs text-slate-500">
                          Electric Amount
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          {formatAmount(bill.totalAmount)}
                        </span>
                      </div>
                    </div>
                  ))}

                  {invoice.electricBill.length === 0 && (
                    <p className="text-sm text-slate-400">
                      No electricity bills attached to this invoice.
                    </p>
                  )}
                </div>
              </div>
            </div>

           
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
};

export default InvoiceTableRow;