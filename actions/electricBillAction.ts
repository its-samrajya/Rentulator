"use server";

import prisma from "@/lib/prisma";

interface Props {
  meterId: string;
  readingDate: Date;
  currentReading: number;
}

export const createElectricBill = async ({
  meterId,
  readingDate,
  currentReading,
}: Props) => {
  try {
    const setting = await prisma.setting.findFirst();
    if (!setting) throw new Error("Settings not configured");

    const previousReading = await prisma.electricReading.findFirst({
      where: { meterId },
      orderBy: { readingDate: "desc" },
    });

    await prisma.electricReading.create({
      data: {
        meterId,
        readingDate,
        currentReading,
      },
    });

    if (!previousReading)
      return {
        message: "First reading saved bill will be generated next month",
      };

    const unitsConsumed = currentReading - previousReading.currentReading;
    const totalElectricAmount = unitsConsumed * setting.electricRate;

    await prisma.electricBill.create({
      data: {
        meterId,
        unitsConsumed,
        totalAmount: totalElectricAmount,
        previousReading: previousReading.currentReading,
        currentReading,
        ratePerUnit: setting.electricRate,
        fromDate: previousReading.readingDate,
        toDate: readingDate,
      },
    });

    // const dueDate = new Date(readingDate);
    // dueDate.setMonth(readingDate.getMonth() + 1);
    // dueDate.setDate(setting.dueDate);
    //
    // const meter = await prisma.electricMeter.findUnique({
    //   where: { id: meterId },
    //   include: {
    //     rooms: true,
    //   },
    // });
    //
    // if (!meter) throw new Error("Meter not found");
    //
    // const rent =
    //   meter?.rooms.reduce((total, room) => total + room.price, 0) ?? 0;
    //
    // await prisma.invoice.create({
    //   data: {
    //     tenantId: meter?.tenantId,
    //     totalAmount: rent + totalElectricAmount,
    //     dueDate,
    //     electricBill: {
    //       connect: { id: electricBill.id },
    //     },
    //   },
    // });
    return { success: true, message: "Bill created successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "There was a error while creating Bill" };
  }
};
