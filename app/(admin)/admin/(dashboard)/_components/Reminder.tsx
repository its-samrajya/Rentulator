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
import { Bell } from "lucide-react";
import { getAttentionInvoices } from "@/lib/queries/invoice";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { getInvoiceMeta } from "@/utils/getInvoiceUtils";
import Link from "next/link";

const statusStyles: Record<string, string> = {
	PENDING: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
	PAID: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
	PARTIAL: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
};

const Reminder = async () => {
	const invoices = await getAttentionInvoices();

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
				<Link
					href="/admin/invoice"
					className="ml-auto text-xs font-medium text-slate-400 transition-colors hover:text-slate-900"
				>
					View all →
				</Link>
			</div>

			<div className="max-h-100 overflow-auto">
				<Table>
					<TableHeader>
						<TableRow className="border-slate-200 hover:bg-transparent">
							<TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
								Tenant
							</TableHead>
							{/* <TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500"> */}
							{/*   Property */}
							{/* </TableHead> */}
							<TableHead className="h-10 px-3 text-xs font-semibold tracking-wide text-slate-500">
								DUE(Rs.)
							</TableHead>
							<TableHead className="h-10 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
								Due Date
							</TableHead>
							<TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
								Status
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.length === 0 ? (
							<TableRow className="border-transparent hover:bg-transparent">
								<TableCell
									colSpan={4}
									className="py-10 text-center text-sm text-slate-400"
								>
									No invoices need attention right now.
								</TableCell>
							</TableRow>
						) : (
							invoices.map((info) => {
								const { due, daysLate, isOverdue } = getInvoiceMeta(info);
								return (
									<TableRow
										key={info.id}
										className="border-slate-100 transition-colors hover:bg-slate-50/70"
									>
										<TableCell className="px-3 py-3 font-medium text-slate-900">
											{info.tenant.name}
										</TableCell>
										{/* <TableCell className="px-3 py-3 text-slate-600"> */}
										{/*   {info.tenant.occupancies */}
										{/*     .map((room) => room.room.roomNumber) */}
										{/*     .join(", ")} */}
										{/* </TableCell> */}
										<TableCell className="px-3 py-3 font-medium text-slate-700">
											{info.totalAmount.toLocaleString()}
										</TableCell>
										<TableCell className="px-3 py-3 text-slate-500">
											<div>{formatNepaliDate(info.dueDate)}</div>
											{isOverdue && (
												<div className="text-xs font-medium text-rose-600">
													{daysLate} {daysLate === 1 ? "day" : "days"} late
												</div>
											)}
										</TableCell>
										<TableCell className="px-3 py-3 text-right">
											<Badge
												variant="outline"
												className={`border ${statusStyles[info.status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}
											>
												{info.status}
											</Badge>
										</TableCell>
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>
		</Card>
	);
};

export default Reminder;
