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
