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
    return await prisma.$transaction(async (tx) => {
      const setting = await tx.setting.findFirst();
      if (!setting) throw new Error("Settings not configured");

      const previousReading = await tx.electricReading.findFirst({
        where: { meterId, readingDate: { lt: readingDate } },
        orderBy: { readingDate: "desc" },
      });

      await tx.electricReading.create({
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

      if (currentReading < previousReading.currentReading) {
        throw new Error(
          `Current reading (${currentReading}) is less than previous reading (${previousReading.currentReading})`,
        );
      }

      const unitsConsumed = currentReading - previousReading.currentReading;
      const totalElectricAmount = unitsConsumed * setting.electricRate;

      await tx.electricBill.create({
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

      return { success: true, message: "Bill created successfully" };
    });
  } catch (error) {
    console.log(error);
    return { success: false, message: "There was a error while creating Bill" };
  }
};
