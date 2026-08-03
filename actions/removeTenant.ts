"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const removeTenant = async (tenantId: string) => {
  try {
    await prisma.occupancy.deleteMany({ where: { tenantId: tenantId } });
    revalidatePath("/admin/tenants");
    return { success: true, message: "Tenant removed from all rooms" };
  } catch (error) {
    console.log("Remove tenant occupancy error: ", error);
    return { success: false, message: "Failed to remove Tenant" };
  }
};
