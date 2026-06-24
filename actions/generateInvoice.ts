"use server";

import prisma from "@/lib/prisma";

interface Props {
  tenantId: string;
}

export const generateInvoice = async ({ tenantId }: Props) => {
  try {
    const setting = await prisma.setting.findFirst();
    if (!setting) throw new Error("Settings not configured");

    const pendingInvoice = await prisma.electricBill.findMany({
      where: {
        invoiceId: null,
        electricMeter: {
          tenantId,
        },
      },
    });

    if (pendingInvoice.length === 0) {
      return { success: false, message: "No pending bills to invoice" };
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        rooms: true,
      },
    });

    if (!tenant) throw new Error("Tenant not found");

    const totalRent = tenant.rooms.reduce((sum, room) => sum + room.price, 0);
    const totalElectric = pendingInvoice.reduce(
      (sum, bill) => sum + bill.totalAmount,
      0,
    );
    const totalAmount = totalRent + totalElectric;

    const dueDate = new Date(pendingInvoice[0].toDate);
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(setting.dueDate);

    await prisma.invoice.create({
      data: {
        tenantId,
        totalAmount,
        dueDate,
        electricBill: {
          connect: pendingInvoice.map((bill) => ({ id: bill.id })),
        },
      },
    });
    return { success: true, message: "Invoice generated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
};
