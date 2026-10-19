"use client";
import { Card } from "@/components/ui/card";
import { formatNepaliDate } from "@/utils/nepaliDate";
import Link from "next/link";

interface Props {
	payments: {
		id: string;
		amount: number;
		paidAt: Date;
		note: string | null;
	}[];
}

export default function RecentPayments({ payments }: Props) {
	return (
		<Card className="h-full border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
			<div>
				<div className="mb-1 flex items-center justify-between">
					<h2 className="text-base font-semibold text-slate-900">
						Recent Payments
					</h2>
					<Link
						href="/payments"
						className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-900"
					>
						View all →
					</Link>
				</div>
				<p className="mb-1 text-xs text-slate-400">
					Latest transactions from tenants
				</p>
			</div>

			{payments.length === 0 ? (
				<div className="py-10 text-center text-sm text-slate-400">
					No recent payments to show.
				</div>
			) : (
				<div className="max-h-100 overflow-x-hidden overflow-y-auto divide-y divide-slate-100">
					{payments.map((payment) => (
						<div
							key={payment.id}
							className="flex items-start justify-between gap-3 py-1 transition-colors hover:bg-slate-50/50 px-3 rounded-md"
						>
							<div className="min-w-0">
								<p className="mt-1 text-xs text-slate-400">
									{formatNepaliDate(payment.paidAt)}
								</p>
							</div>
							<div className="text-right">
								<p className="text-sm font-semibold text-emerald-600">
									+ {payment.amount.toLocaleString()}
								</p>
								<p className="mt-1 truncate text-xs tracking-wide text-slate-400">
									{payment.note || "online"}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</Card>
	);
}
