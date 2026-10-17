import prisma from "../prisma";
import NepaliDate from "nepali-datetime";
import {
	getCurrentNepaliYearMonth,
	getNepaliMonthDateRange,
} from "@/utils/nepaliDate";

export const getInvoices = async () => {
	const invoices = await prisma.invoice.findMany({
		include: {
			tenant: {
				include: {
					occupancies: {
						where: { moveOutDate: null },
						include: {
							room: true,
						},
					},
				},
			},
			payments: true,
		},
	});
	return invoices;
};

export const getAttentionInvoices = async () => {
	return await prisma.invoice.findMany({
		where: { status: { in: ["PENDING", "PARTIAL"] } },
		orderBy: { dueDate: "asc" },
		include: {
			tenant: { select: { name: true } },
			payments: { select: { amount: true } },
		},
	});
};

export const getInvoicesByFilter = async (
	nepaliYear: number,
	nepaliMonth: number,
) => {
	const { start, end } = getNepaliMonthDateRange(nepaliYear, nepaliMonth);
	const invoices = await prisma.invoice.findMany({
		where: {
			electricBill: {
				some: {
					toDate: {
						gte: start,
						lt: end,
					},
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			tenant: {
				include: {
					occupancies: {
						where: { moveOutDate: null },
						include: {
							room: true,
						},
					},
				},
			},
			payments: true,
			electricBill: {
				include: {
					electricMeter: true,
				},
			},
		},
	});
	return invoices;
};

export const getInvoiceFilterYears = async (): Promise<number[]> => {
	const currentYear = getCurrentNepaliYearMonth().year;
	const minBill = await prisma.electricBill.aggregate({
		_min: { toDate: true },
	});
	if (!minBill._min.toDate) {
		return [currentYear];
	}
	const minYear = new NepaliDate(minBill._min.toDate).getYear();
	const years: number[] = [];
	for (let year = currentYear; year >= Math.min(minYear, currentYear); year--) {
		years.push(year);
	}
	return years;
};

export const getPayments = async () => {
	const payment = await prisma.payment.findMany({
		include: {
			invoice: {
				include: {
					tenant: true,
				},
			},
		},
	});
	return payment;
};

export const getRecentPayments = async (limit = 8) => {
	return prisma.payment.findMany({
		orderBy: { paidAt: "desc" },
		take: limit,
		select: {
			id: true,
			amount: true,
			paidAt: true,
			note: true,
			invoice: {
				select: { tenant: { select: { name: true } } },
			},
		},
	});
};

export const getUnpaidInvoicesByTenantId = async (tenantId: string) => {
	const unpaidInvoices = await prisma.invoice.findMany({
		where: {
			tenantId,
			status: "PENDING",
		},
		include: {
			electricBill: {
				include: {
					electricMeter: true,
				},
			},
		},
		orderBy: { createdAt: "desc" },
	});
	return unpaidInvoices;
};
export const getSkippedUnpaidInvoicesByTenantId = async (tenantId: string) => {
	const unpaidInvoices = await prisma.invoice.findMany({
		where: {
			tenantId,
			status: "PENDING",
		},
		include: {
			electricBill: {
				include: {
					electricMeter: true,
				},
			},
		},
		orderBy: { createdAt: "desc" },
		skip: 1,
	});
	return unpaidInvoices;
};

export const getPaidInvoicesByTenantId = async (tenantId: string) => {
	const paidInvoices = await prisma.invoice.findMany({
		where: { tenantId, status: "PAID" },
		include: {
			electricBill: {
				include: {
					electricMeter: true,
				},
			},
			payments: true,
		},
		orderBy: { createdAt: "desc" },
	});
	return paidInvoices;
};

// to calculate total amount (expected) that will be receiving in the month for admin dashboard
export const getTotalExpectedCurrentMonth = async () => {
	const today = new NepaliDate(new Date());
	const year = today.getYear();
	const month = today.getMonth();

	const startDate = new NepaliDate(year, month, 1).getDateObject();

	let nextMonth = month + 1;
	let nextYear = year;

	if (nextMonth > 12) {
		nextMonth = 1;
		nextYear++;
	}

	const endDate = new NepaliDate(nextYear, nextMonth, 1).getDateObject();

	const invoices = await prisma.invoice.findMany({
		where: {
			dueDate: {
				gte: startDate,
				lte: endDate,
			},
		},
		select: { totalAmount: true, status: true },
	});
	return invoices;
};
// to calulate total collected amount for admin dashboard
export const getAllPaidInvoices = async () => {
	const today = new NepaliDate(new Date());
	const year = today.getYear();
	const month = today.getMonth();

	const startDate = new NepaliDate(year, month, 1).getDateObject();

	let nextMonth = month + 1;
	let nextYear = year;

	if (nextMonth > 12) {
		nextMonth = 1;
		nextYear++;
	}

	const endDate = new NepaliDate(nextYear, nextMonth, 1).getDateObject();

	// const paidInvoices = await prisma.invoice.findMany({
	//   where: {
	//     status: "PAID",
	//     dueDate: {
	//       gte: startDate,
	//       lte: endDate,
	//     },
	//   },
	//   select: { totalAmount: true },
	// });
	const result = await prisma.payment.aggregate({
		_sum: { amount: true },
		where: {
			paidAt: {
				gte: startDate,
				lt: endDate,
			},
		},
	});
	return result._sum.amount ?? 0;
};

export const getPendingInvoicesForPayment = async () => {
	const invoice = await prisma.invoice.findMany({
		where: { status: { in: ["PENDING", "PARTIAL"] } },
		include: { tenant: true, payments: true },
		orderBy: { dueDate: "asc" },
	});

	return invoice.map((invoice) => {
		const paid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
		return {
			id: invoice.id,
			tenantName: invoice.tenant.name,
			remaining: invoice.totalAmount - paid,
		};
	});
};

//totalpendinginvoicesCount for stats.tsx
export const getTotalPendingInvoicesForStats = async () => {
	const invoices = await prisma.invoice.findMany({
		where: { status: { in: ["PENDING", "PARTIAL"] } },
		include: { payments: true },
	});
	return invoices.reduce((total, invoice) => {
		const paid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
		return total + (invoice.totalAmount - paid);
	}, 0);
};
