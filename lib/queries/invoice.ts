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
