"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export const getTenants = async () => {
  const tenant = await prisma.tenant.findMany({
    include: {
      invoices: {
        orderBy: {
          createdAt: "desc",
        },
      },
      rooms: true,
    },
  });
  return tenant;
};

export const createTenant = async (data: {
  moveInDate: string;
  userId: string;
  roomId?: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { id: data.userId },
    select: { name: true },
  });
  const tenant = await prisma.tenant.create({
    data: {
      name: user?.name ?? "unknown",
      moveInDate: new Date(data.moveInDate),
      userId: data.userId,
      rooms: data.roomId ? { connect: { id: data.roomId } } : undefined,
    },
  });
  revalidatePath("/admin/tenants");
  return tenant;
};
