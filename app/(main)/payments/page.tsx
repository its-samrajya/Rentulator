import type { Metadata } from "next";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import getCurrentTenant from "@/lib/currentTenant";
import { getPaymentsByTenant } from "@/lib/queries/payments";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { ArrowDownLeft, Receipt } from "lucide-react";
import { PageHeader } from "../_components/ui/page-header";
import { SectionCard } from "../_components/ui/section-card";
import { EmptyState } from "../_components/ui/empty-state";

export const metadata: Metadata = {
	title: "Payments",
};

export default async function HistoryPage() {
	const tenantId = await getCurrentTenant();
	if (!tenantId)
		return (
			<div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
				<p className="text-center text-base text-muted-foreground sm:text-lg">
					You are not authorized
				</p>
			</div>
		);

	const payments = await getPaymentsByTenant(tenantId.id);
	if (!payments) {
		return (
			<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
				<EmptyState icon={Receipt} title="No History" />
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
			<PageHeader title="Payments" />

			<SectionCard>
				<div className="hidden lg:block">
					<Table>
						<TableHeader className="bg-muted/40">
							<TableRow className="border-border/60 hover:bg-transparent">
								<TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
									Date
								</TableHead>
								<TableHead className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">
									Amount
								</TableHead>
								<TableHead className="h-10 px-4 text-right text-xs font-medium text-muted-foreground">
									Method
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{payments.map((payment) => (
								<TableRow
									key={payment.id}
									className="border-border/60 hover:bg-muted/30"
								>
									<TableCell className="px-4 py-4 font-medium whitespace-nowrap">
										{formatNepaliDate(payment.paidAt)}
									</TableCell>
									<TableCell className="px-4 py-4 text-right font-mono tabular-nums">
										{payment.amount}
									</TableCell>
									<TableCell className="px-4 py-4 text-right whitespace-normal text-muted-foreground">
										{payment.note || "online"}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>

				<div className="grid gap-3 p-4 sm:grid-cols-2 sm:[&>article:last-child:nth-child(odd)]:col-span-2 sm:p-5 lg:hidden">
					{payments.map((payment) => (
						<article
							key={payment.id}
							className="flex flex-col rounded-xl border border-border/70 bg-background p-4"
						>
							<div className="flex items-center gap-2.5">
								<span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
									<ArrowDownLeft className="size-4" aria-hidden="true" />
								</span>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-foreground">
										{formatNepaliDate(payment.paidAt)}
									</p>
									<p className="mt-0.5 truncate text-xs text-muted-foreground">
										Method: {payment.note || "online"}
									</p>
								</div>
								<p className="shrink-0 font-mono text-sm font-semibold tabular-nums text-foreground">
									{payment.amount}
								</p>
							</div>
						</article>
					))}
				</div>
			</SectionCard>
		</div>
	);
}
