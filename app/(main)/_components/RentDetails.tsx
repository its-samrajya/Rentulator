"use client";
import { createEsewaCheckoutSession } from "@/actions/checkoutAction";
import { Button } from "@/components/ui/button";
import { submitToEsewa } from "@/lib/submitToEsewa";
import { TenantWithRooms, unpaidInvoicesType } from "@/lib/types";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { CalendarDays, MessageCircle, ReceiptText, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import RecentPayments from "./RecentPayments";
import { SectionCard, SectionHeader } from "./ui/section-card";

const LANDLORD_NAME = "Samrajya Bhari";
const LANDLORD_PHONE_DISPLAY = "+977 9817511743";
const LANDLORD_WHATSAPP_URL = "https://wa.me/9779817511743";

interface Props {
	unpaidInvoices: unpaidInvoicesType;
	tenant: TenantWithRooms;
	payments: {
		id: string;
		amount: number;
		paidAt: Date;
		note: string | null;
	}[];
}

const RentDetails = ({ unpaidInvoices, tenant, payments }: Props) => {
	const [isPaying, setIsPaying] = useState(false);

	const latestInvoice = unpaidInvoices.at(0);

	const billDate = latestInvoice?.electricBill.at(0)?.toDate;

	const totalRent = tenant.occupancies.reduce(
		(sum, occupancy) => sum + occupancy.room.price,
		0,
	);

	const handlePay = async () => {
		if (!latestInvoice) return;
		setIsPaying(true);

		try {
			const PaymentData = await createEsewaCheckoutSession({
				method: "esewa",
				amount: latestInvoice.totalAmount.toString(),
				productName: `Invoice payment - ${latestInvoice.id}`,
				transactionId: latestInvoice.id,
			});
			toast.success(
				"Payment Initiated. Redirecting to eSewa payment gateway...",
			);
			submitToEsewa(PaymentData.amount, PaymentData.esewaConfig);
		} catch (error) {
			console.log("Payment error", error);
			toast.error("Payment Error");
		} finally {
			setIsPaying(false);
		}
	};

	return (
		<div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:items-start xl:gap-6">
			<SectionCard className="p-5 sm:p-6">
				<SectionHeader icon={ReceiptText} title="Current Month Rent Details" />
				<div className="mt-5 flex items-baseline justify-between gap-4 pb-3">
					<p className="text-sm text-muted-foreground">Room Amount</p>
					<p className="font-mono text-sm font-semibold tabular-nums">
						Rs.{totalRent}
					</p>
				</div>

				{latestInvoice ? (
					<>
						<div className="flex items-center justify-between gap-4 border-t border-border/60 py-3">
							<p className="text-sm text-muted-foreground">Month</p>
							<p className="text-lg font-semibold tracking-tight">
								{billDate ? formatNepaliDate(billDate, "MMMM") : "—"}
							</p>
						</div>

						{latestInvoice.electricBill.map((bill) => (
							<div
								key={bill.id}
								className="my-3 rounded-xl border border-border/70 bg-muted/40 p-4"
							>
								<div className="flex items-center gap-2.5">
									<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
										<Zap className="size-4" aria-hidden="true" />
									</span>
									<span className="min-w-0 text-sm font-medium text-foreground">
										Meter_No:{" "}
										<span className="font-mono text-muted-foreground">
											{bill.electricMeter?.meterNumber}
										</span>
									</span>
								</div>

								<dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
									<div>
										<dt className="text-xs text-muted-foreground">
											Current Reading
										</dt>
										<dd className="mt-0.5 font-mono text-sm font-medium tabular-nums">
											{bill.currentReading}
										</dd>
									</div>
									<div>
										<dt className="text-xs text-muted-foreground">
											Previous Reading
										</dt>
										<dd className="mt-0.5 font-mono text-sm font-medium tabular-nums">
											{bill.previousReading}
										</dd>
									</div>
									<div>
										<dt className="text-xs text-muted-foreground">
											Unit Consumed
										</dt>
										<dd className="mt-0.5 font-mono text-sm font-medium tabular-nums">
											{bill.unitsConsumed}
										</dd>
									</div>
									<div>
										<dt className="text-xs text-muted-foreground">
											Rate Per Unit
										</dt>
										<dd className="mt-0.5 font-mono text-sm font-medium tabular-nums">
											Rs.{bill.ratePerUnit}
										</dd>
									</div>
								</dl>

								<div className="mt-4 flex items-center justify-between gap-4 border-t border-border/60 pt-3">
									<span className="text-xs text-muted-foreground">
										Electric Amount
									</span>
									<span className="font-mono text-sm font-semibold tabular-nums">
										Rs.{bill.totalAmount}
									</span>
								</div>
							</div>
						))}

						<div className="flex items-baseline justify-between gap-4 border-t border-border/60 py-3">
							<p className="text-sm font-medium">Total Amount</p>
							<p className="font-mono text-xl font-semibold tabular-nums">
								Rs.{latestInvoice.totalAmount}
							</p>
						</div>

						<div className="flex items-center justify-between gap-4 border-t border-border/60 py-3">
							<p className="text-sm font-medium">Due Date</p>
							<span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
								<CalendarDays className="size-3.5" aria-hidden="true" />
								{latestInvoice.dueDate
									? formatNepaliDate(latestInvoice.dueDate)
									: "—"}
							</span>
						</div>

						<div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div className="min-w-0">
									<p className="text-sm font-medium text-foreground">
										Recent balance to be paid
									</p>
									<p className="mt-1 font-mono text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
										<span className="text-base font-medium">Rs.</span>
										{latestInvoice.totalAmount}
									</p>
								</div>
								<Button
									onClick={handlePay}
									size="lg"
									className="h-11 w-full rounded-xl px-6 sm:w-auto"
									disabled={isPaying}
								>
									{isPaying ? "Redirecting..." : "Pay now"}
								</Button>
							</div>
						</div>
					</>
				) : (
					<div className="mt-2 rounded-xl border border-dashed border-border p-6 text-center">
						<p className="font-medium text-foreground">
							No unpaid invoice right now
						</p>
						<p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
							Your electricity bill and total will appear here once your
							landlord generates this month&apos;s invoice.
						</p>
					</div>
				)}
			</SectionCard>

			{/* Right column: Landlord Contact + Recent Payments stacked */}
			<div className="grid gap-4">
				<SectionCard className="p-5 sm:p-6">
					<SectionHeader icon={MessageCircle} title="Landlord Contact" />
					<div className="mt-5 flex items-center gap-3">
						<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground ring-1 ring-border">
							SM
						</div>
						<div className="min-w-0">
							<p className="truncate text-base font-semibold text-primary">
								{LANDLORD_NAME}
							</p>
							<p className="truncate font-mono text-sm text-muted-foreground">
								{LANDLORD_PHONE_DISPLAY}
							</p>
						</div>
					</div>
					<Button
						variant="outline"
						asChild
						className="mt-4 h-11 w-full cursor-pointer rounded-xl border-primary/30 text-primary hover:bg-primary/5 hover:text-primary"
					>
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href={LANDLORD_WHATSAPP_URL}
						>
							Message on Whatsapp
						</Link>
					</Button>
				</SectionCard>

				<RecentPayments payments={payments} />
			</div>
		</div>
	);
};

export default RentDetails;
