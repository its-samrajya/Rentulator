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
  name: string;
  phone: string;
  email?: string;
  moveInDate: string;
  roomId?: string;
}) => {
  const tenant = await prisma.tenant.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
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
