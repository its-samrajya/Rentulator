import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { getInvoices } from "@/lib/queries/invoice";

const statusStyles: Record<string, string> = {
  PENDING: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  OVERDUE: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
};

const Reminder = async () => {
  const invoices = await getInvoices();

  return (
    <Card className="h-full border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
          <Bell className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Needs Attention
          </h2>
          <p className="text-xs text-slate-400">
            Invoices awaiting payment or action
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tenant
              </TableHead>
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Property
              </TableHead>
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due
              </TableHead>
              <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due Date
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow className="border-transparent hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-slate-400"
                >
                  No invoices need attention right now.
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((info) => (
                <TableRow
                  key={info.id}
                  className="border-slate-100 transition-colors hover:bg-slate-50/70"
                >
                  <TableCell className="px-3 py-3 font-medium text-slate-900">
                    {info.tenant.name}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-slate-600">
                    {info.tenantId}
                  </TableCell>
                  <TableCell className="px-3 py-3 font-medium text-slate-700">
                    {info.totalAmount}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-slate-500">
                    {new Date(info.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-3 py-3 text-right">
                    <Badge
                      variant="outline"
                      className={`border ${statusStyles[info.status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
                    >
                      {info.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    >
                      Remind
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

export default Reminder;
