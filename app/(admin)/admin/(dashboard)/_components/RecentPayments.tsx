import { Card } from "@/components/ui/card";
import { getPayments } from "@/lib/queries/invoice";

export default async function RecentPayments() {
  const payment = await getPayments();

  return (
    <Card className="h-full border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Recent Payments
        </h2>
        <span className="text-xs font-medium text-slate-400">
          {payment.length} total
        </span>
      </div>
      <p className="mb-4 text-xs text-slate-400">
        Latest transactions from your tenants
      </p>

      {payment.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-400">
          No recent payments to show.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {payment.map((payment) => (
            <div
              key={payment.invoice.tenant.name}
              className="flex items-start justify-between gap-3 py-3.5 transition-colors hover:bg-slate-50/50 -mx-2 px-2 rounded-md"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {payment.invoice.tenant.name}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-emerald-600">
                  +{payment.amount}
                </p>
                <p className="mt-1 truncate text-xs tracking-wide text-slate-400">
                  {payment.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
