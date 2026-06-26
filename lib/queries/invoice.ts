import prisma from "../prisma";

export const getInvoices = async () => {
  const invoices = await prisma.invoice.findMany({
    include: {
      tenant: {
        include: {
          rooms: true,
        },
      },
      payments: true,
    },
  });
  return invoices;
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
    },
    orderBy: { createdAt: "desc" },
  });
  return paidInvoices;
};

// to calculate total amount (expected) that will be receiving in the month for admin dashboard
export const getTotalExpectedCurrentMonth = async () => {
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const invoices = await prisma.invoice.findMany({
    where: {
      dueDate: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      },
    },
    select: { totalAmount: true, status: true },
  });
  return invoices;
};
// to calulate total collected amount for admin dashboard
export const getAllPaidInvoices = async () => {
  const now = new Date();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const paidInvoices = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      dueDate: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      },
    },
    select: { totalAmount: true },
  });
  return paidInvoices;
};
