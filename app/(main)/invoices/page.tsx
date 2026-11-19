import type { Metadata } from "next";
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
import { EmptyState } from "../_components/ui/empty-state";
import { PageHeader } from "../_components/ui/page-header";
import { SectionCard } from "../_components/ui/section-card";
import { StatusBadge } from "../_components/ui/status-badge";

export const metadata: Metadata = {
  title: "Invoices",
};

const InvoicesPage = async () => {
  const tenantId = await getCurrentTenant();
  if (!tenantId)
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-base text-muted-foreground sm:text-lg">
          You are not authorized
        </p>
      </div>
    );

  const paidInvoices = await getPaidInvoicesByTenantId(tenantId.id);

  if (paidInvoices.length === 0) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <EmptyState
          icon={LayoutList}
          title="There is no any unpaid invoices"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <PageHeader title="Paid Invoices" />

      <SectionCard>
        <div className="hidden lg:block">
          <Table>
            <TableCaption className="pb-4 text-xs text-muted-foreground">
              A list of your paid invoices.
            </TableCaption>
            <TableHeader className="bg-muted/40">
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
                  Month
                </TableHead>
                <TableHead className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">
                  Total
                </TableHead>
                <TableHead className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">
                  PaidAt
                </TableHead>
                <TableHead className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paidInvoices.map((invoice) => (
                <Fragment key={invoice.id}>
                  <TableRow className="border-border/60 hover:bg-muted/30">
                    <TableCell className="px-4 py-4 font-medium text-foreground">
                      {formatNepaliDate(invoice.electricBill[0].toDate, "MMMM")}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-right font-mono text-sm font-semibold tabular-nums">
                      Rs. {invoice.totalAmount}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-right text-sm text-muted-foreground">
                      {formatNepaliDate(invoice.payments[0]?.paidAt)}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-right">
                      <StatusBadge tone="paid">{invoice.status}</StatusBadge>
                    </TableCell>
                  </TableRow>

                  {invoice.electricBill.map((bill) => (
                    <TableRow
                      key={bill.id}
                      className="border-border/40 bg-muted/30 text-xs text-muted-foreground hover:bg-muted/30"
                    >
                      <TableCell className="py-2.5 pr-4 pl-8">
                        Meter:{" "}
                        <span className="font-mono text-foreground">
                          {bill.electricMeter?.meterNumber}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right whitespace-nowrap">
                        Prev:{" "}
                        <span className="font-mono text-foreground">
                          {bill.previousReading}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right whitespace-nowrap">
                        Curr:{" "}
                        <span className="font-mono text-foreground">
                          {bill.currentReading}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-2.5 text-right whitespace-nowrap">
                        Units:{" "}
                        <span className="font-mono text-foreground">
                          {bill.unitsConsumed}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 sm:[&>article:last-child:nth-child(odd)]:col-span-2 sm:p-5 lg:hidden">
          {paidInvoices.map((invoice) => (
            <article
              key={invoice.id}
              className="flex flex-col rounded-xl border border-border/70 bg-background p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {formatNepaliDate(invoice.electricBill[0].toDate, "MMMM")}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    PaidAt: {formatNepaliDate(invoice.payments[0]?.paidAt)}
                  </p>
                </div>
                <StatusBadge tone="paid">{invoice.status}</StatusBadge>
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="font-mono text-lg font-semibold tabular-nums">
                  Rs. {invoice.totalAmount}
                </span>
              </div>

              <div className="mt-3 divide-y divide-border/50 rounded-lg bg-muted/40 p-3">
                {invoice.electricBill.map((bill) => (
                  <div key={bill.id} className="py-2 first:pt-0 last:pb-0">
                    <p className="text-xs font-medium text-foreground">
                      Meter:{" "}
                      <span className="font-mono text-muted-foreground">
                        {bill.electricMeter?.meterNumber}
                      </span>
                    </p>
                    <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-muted-foreground">Prev:</span>
                        <span className="font-mono text-foreground">
                          {bill.previousReading}
                        </span>
                      </span>
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-muted-foreground">Curr:</span>
                        <span className="font-mono text-foreground">
                          {bill.currentReading}
                        </span>
                      </span>
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-muted-foreground">Units:</span>
                        <span className="font-mono text-foreground">
                          {bill.unitsConsumed}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default InvoicesPage;
