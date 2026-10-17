export const getInvoiceMeta = (invoice: {
	totalAmount: number;
	dueDate: Date;
	payments: { amount: number }[];
}) => {
	const paid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
	const due = invoice.totalAmount - paid;

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const daysLate = Math.floor(
		(today.getTime() - new Date(invoice.dueDate).getTime()) / 86400000,
	);
	return { due, daysLate, isOverdue: daysLate > 0 };
};
