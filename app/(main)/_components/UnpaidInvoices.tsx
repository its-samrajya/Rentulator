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
import { Fragment } from "react";
import { PayButton } from "./PayButton";
import { EmptyState } from "./ui/empty-state";
import { SectionCard, SectionHeader } from "./ui/section-card";
import { StatusBadge } from "./ui/status-badge";
import { formatNepaliDate } from "@/utils/nepaliDate";

interface Props {
  tenantId: string;
}

const UnpaidInvoices = async ({ tenantId }: Props) => {
  const unpaidInvoices = await getSkippedUnpaidInvoicesByTenantId(tenantId);
  if (unpaidInvoices.length === 0) {
    return (
      <EmptyState
        icon={LayoutList}
        title="There are no unpaid invoices"
        className="mt-4"
      />
    );
  }
  return (
    <SectionCard className="mt-4">
      <div className="p-4 sm:p-5">
        <SectionHeader icon={LayoutList} title="Unpaid Invoices" />
      </div>

      <div className="hidden lg:block">
        <Table>
          <TableCaption className="pb-4 text-xs text-muted-foreground">
            A list of your unpaid invoices.
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
                Status
              </TableHead>
              <TableHead className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">
                Due Date
              </TableHead>
              <TableHead className="h-10 pr-5 pl-4 text-right text-xs font-medium text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unpaidInvoices.map((invoice) => (
              <Fragment key={invoice.id}>
                <TableRow className="border-border/60 hover:bg-muted/30">
                  <TableCell className="px-4 py-4 font-medium text-foreground">
                    {formatNepaliDate(invoice.electricBill[0].toDate, "MMMM")}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right font-mono text-sm font-medium tabular-nums">
                    Rs. {invoice.totalAmount}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    <StatusBadge tone="pending">{invoice.status}</StatusBadge>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right text-sm text-muted-foreground">
                    {formatNepaliDate(invoice.dueDate, "MMMM YYYY")}
                  </TableCell>
                  <TableCell className="py-4 pr-5 pl-4 text-right">
                    <PayButton
                      invoiceId={invoice.id}
                      amount={invoice.totalAmount}
                    />
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
                    <TableCell className="py-2.5 pr-5 pl-4 text-right whitespace-nowrap">
                      Electric:{" "}
                      <span className="font-mono font-medium text-foreground">
                        {bill.totalAmount}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 p-4 pt-0 sm:grid-cols-2 sm:p-5 sm:pt-0 lg:hidden">
        {unpaidInvoices.map((invoice) => (
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
                  Due Date: {formatNepaliDate(invoice.dueDate, "MMMM YYYY")}
                </p>
              </div>
              <StatusBadge tone="pending">{invoice.status}</StatusBadge>
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
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-muted-foreground">Electric:</span>
                      <span className="font-mono text-foreground">
                        {bill.totalAmount}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-mono text-lg font-semibold tabular-nums">
                  Rs. {invoice.totalAmount}
                </p>
              </div>
              <PayButton invoiceId={invoice.id} amount={invoice.totalAmount} />
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
};

export default UnpaidInvoices;
