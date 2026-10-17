"use server";
import prisma from "../prisma";

export const getPayments = async ({
	month,
	year,
}: {
	month?: string;
	year?: string;
}) => {
	const now = new Date();

	const m = month !== undefined ? Number(month) : now.getMonth();
	const y = year !== undefined ? Number(year) : now.getFullYear();

	const payments = await prisma.payment.findMany({
		where: {
			paidAt: {
				gte: new Date(y, m, 1),
				lt: new Date(y, m + 1, 1),
			},
		},
		orderBy: { paidAt: "desc" },
		include: {
			invoice: {
				include: {
					tenant: {
						include: {
							occupancies: {
								where: { moveOutDate: null },
								include: { room: true },
							},
						},
					},
				},
			},
		},
	});
	return payments;
};

export const getPaymentsByTenant = async (tenantId: string) => {
	const payments = await prisma.payment.findMany({
		where: {
			invoice: {
				tenantId: tenantId,
			},
		},
	});
	return payments;
};
