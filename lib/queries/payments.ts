"use server";
import prisma from "../prisma";

export const getPayments = async () => {
  const payments = await prisma.payment.findMany({
    orderBy: { paidAt: "desc" },
    include: {
      invoice: {
        include: {
          tenant: {
            include: {
              rooms: true,
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
