import {
  getAllPaidInvoices,
  getTotalExpectedCurrentMonth,
  getTotalPendingInvoicesForStats,
} from "@/lib/queries/invoice";
import {
  CircleAlert,
  CircleCheck,
  Receipt,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatNepaliDate } from "@/utils/nepaliDate";

interface DataType {
  topLabel: string;
  amount: string;
  endLabel: string;
  icon: LucideIcon;
  iconWrap: string;
  iconColor: string;
  accent: string;
}

const Stats = async () => {
  const invoices = await getTotalExpectedCurrentMonth();
  const total =
    invoices.length === 0
      ? 0
      : invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  const paidInvoices = await getAllPaidInvoices();
  const totalPaidInvoicesAmount =
    paidInvoices.length === 0
      ? 0
      : paidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  const numberOfUnpaidInvoices = invoices.filter(
    (invoice) => invoice.status === "PENDING",
  ).length;

  const totalPending = await getTotalPendingInvoicesForStats();

  const monthLabel = formatNepaliDate(new Date(), "MMMM YYYY");

  const data: DataType[] = [
    {
      topLabel: "Total Expected",
      amount: `Rs. ${total.toLocaleString()}`,
      endLabel: `For ${monthLabel}`,
      icon: TrendingUp,
      iconWrap: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "from-blue-500/10",
    },
    {
      topLabel: "Collected",
      amount: `Rs. ${totalPaidInvoicesAmount.toLocaleString()}`,
      endLabel: `For ${monthLabel}`,
      icon: CircleCheck,
      iconWrap: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "from-emerald-500/10",
    },
    {
      topLabel: "Pending / Overdue",
      amount: numberOfUnpaidInvoices.toString(),
      endLabel: `For ${monthLabel}`,
      icon: CircleAlert,
      iconWrap: "bg-rose-50",
      iconColor: "text-rose-600",
      accent: "from-rose-500/10",
    },
    {
      topLabel: "Total Outstanding",
      amount: `Rs. ${totalPending.toLocaleString()}`,
      endLabel: "Pending Invoice Amount",
      icon: Receipt,
      iconWrap: "bg-amber-50",
      iconColor: "text-amber-600",
      accent: "from-amber-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card
            key={index}
            className="group relative overflow-hidden border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {item.topLabel}
                </p>
                <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {item.amount}
                </p>
                <p className="text-xs text-slate-400">{item.endLabel}</p>
              </div>
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconWrap} ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Stats;
