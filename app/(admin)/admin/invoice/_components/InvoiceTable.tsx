"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvoicesByFilterType } from "@/lib/types";
import InvoiceTableRow from "./InvoiceTableRow";

interface Props {
  invoices: getInvoicesByFilterType[];
}

const InvoiceTable = ({ invoices }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <Table className="min-w-[760px]">
        <TableHeader>
          <TableRow className="border-slate-200 hover:bg-transparent">
            <TableHead className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tenant
            </TableHead>
            <TableHead className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Month
            </TableHead>
            <TableHead className="px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Amount
            </TableHead>
            <TableHead className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </TableHead>
            <TableHead className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Due Date
            </TableHead>
            <TableHead className="px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <InvoiceTableRow key={invoice.id} invoice={invoice} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;