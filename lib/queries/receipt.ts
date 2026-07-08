"use server";
import prisma from "../prisma";

interface Props {
  paymentId: string;
}
export const getReceipt = async ({ paymentId }: Props) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
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
  return payment;
};
