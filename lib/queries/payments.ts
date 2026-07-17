"use server";
import prisma from "../prisma";

export const getPayments = async ({
  month,
  year,
}: {
  month?: string;
  year?: string;
}) => {
  const where =
    month && year
      ? {
          paidAt: {
            gte: new Date(Number(year), Number(month), 1),
            lte: new Date(Number(year), Number(month) + 1, 1),
          },
        }
      : {};
  const payments = await prisma.payment.findMany({
    where,
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
