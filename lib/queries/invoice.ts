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

export const getInvoicesByTenantId = async (tenantId: string) => {
  const invoices = await prisma.invoice.findMany({
    where: { tenantId },
    include: {
      tenant: {
        include: {
          rooms: true,
          user: true,
        },
      },
      payments: {
        orderBy: { paidAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return invoices;
};
