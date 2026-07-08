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
      occupancies: {
        where: { moveOutDate: null },
        include: {
          room: true,
        },
      },
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
      userId: data.userId,
      occupancies: data.roomId
        ? {
            create: {
              roomId: data.roomId,
              moveInDate: new Date(data.moveInDate),
            },
          }
        : undefined,
    },
  });
  revalidatePath("/admin/tenants");
  return tenant;
};

export const getAllTenantForAdmin = async () => {
  return await prisma.tenant.findMany({
    include: {
      occupancies: {
        where: { moveOutDate: null },
        include: {
          room: {
            include: {
              electricMeter: true,
            },
          },
        },
      },
    },
  });
};
