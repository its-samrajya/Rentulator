"use client";
import { Card } from "@/components/ui/card";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { ArrowDownLeft, ChevronRight } from "lucide-react";
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
		<Card className="h-full gap-0 rounded-2xl border-border/70 bg-card p-5 shadow-xs sm:p-6">
			<div className="flex items-start justify-between gap-3">
				<div>
					<h2 className="text-base font-semibold tracking-tight">
						Recent Payments
					</h2>
					<p className="mt-1 text-xs text-muted-foreground">
						Latest transactions from tenants
					</p>
				</div>
				<Link
					href="/payments"
					aria-label="View all payments"
					className="inline-flex h-11 shrink-0 items-center gap-0.5 rounded-lg px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:h-9"
				>
					View all
					<ChevronRight className="size-3.5" aria-hidden="true" />
				</Link>
			</div>

			{payments.length === 0 ? (
				<div className="py-10 text-center text-sm text-muted-foreground">
					No recent payments to show.
				</div>
			) : (
				<div className="mt-4 max-h-80 divide-y divide-border/60 overflow-y-auto">
					{payments.map((payment) => (
						<div
							key={payment.id}
							className="flex items-center justify-between gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-muted/40"
						>
							<div className="flex min-w-0 items-center gap-2.5">
								<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
									<ArrowDownLeft className="size-4" aria-hidden="true" />
								</span>
								<div className="min-w-0">
									<p className="truncate text-sm font-medium text-foreground">
										{payment.note || "online"}
									</p>
									<p className="mt-0.5 truncate text-xs text-muted-foreground">
										{formatNepaliDate(payment.paidAt)}
									</p>
								</div>
							</div>
							<p className="shrink-0 font-mono text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
								+ {payment.amount.toLocaleString()}
							</p>
						</div>
					))}
				</div>
			)}
		</Card>
	);
}
