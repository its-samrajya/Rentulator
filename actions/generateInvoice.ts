"use server";

import prisma from "@/lib/prisma";
import NepaliDate from "nepali-datetime";

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
          rooms: {
            some: {
              occupancies: {
                some: {
                  tenantId,
                  moveOutDate: null,
                },
              },
            },
          },
        },
      },
    });

    if (pendingInvoice.length === 0) {
      return { success: false, message: "No pending bills to invoice" };
    }

    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        occupancies: {
          where: { moveOutDate: null },
          include: { room: true },
        },
      },
    });

    if (!tenant) throw new Error("Tenant not found");

    const totalRent = tenant.occupancies.reduce(
      (sum, occupancy) => sum + occupancy.room.price,
      0,
    );
    const totalElectric = pendingInvoice.reduce(
      (sum, bill) => sum + bill.totalAmount,
      0,
    );
    const totalAmount = totalRent + totalElectric;

    // for english date:
    // const dueDate = new Date(pendingInvoice[0].toDate);
    // dueDate.setMonth(dueDate.getMonth() + 1);
    // dueDate.setDate(setting.dueDate);

    // for nepali date:
    const nepaliDate = new NepaliDate(pendingInvoice[0].toDate);

    let year = nepaliDate.getYear();
    let month = nepaliDate.getMonth() + 2;

    if (month > 12) {
      month = 1;
      year++;
    }

    const nepaliDueDate = new NepaliDate(`${year}/${month}/${setting.dueDate}`);
    const dueDate = nepaliDueDate.getDateObject();

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
