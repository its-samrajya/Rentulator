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
