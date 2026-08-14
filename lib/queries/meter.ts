"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export const getAllMeters = async () => {
  const meters = await prisma.electricMeter.findMany({
    include: {
      rooms: {
        include: {
          occupancies: {
            where: { moveOutDate: null },
            include: { tenant: true },
          },
        },
      },
    },
  });
  return meters;
};

export const onlyGetAllMeters = async () => {
  return await prisma.electricMeter.findMany({
    select: {
      id: true,
      meterNumber: true,
      createdAt: true,
    },
    orderBy: {
      meterNumber: "asc",
    },
  });
};

export const createMeter = async (meterNumber: string) => {
  const meter = await prisma.electricMeter.create({
    data: {
      meterNumber,
    },
  });
  revalidatePath("/admin/meters");
  return meter;
};
