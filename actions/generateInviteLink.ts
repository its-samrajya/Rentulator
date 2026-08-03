"use server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
export const generateInviteLink = async (tenantId: string) => {
  const token = crypto.randomBytes(24).toString("hex");
  const expirty = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);

  await prisma.tenant.update({
    where: {
      id: tenantId,
    },
    data: {
      inviteToken: token,
      inviteTokenExpiry: expirty,
    },
  });
  revalidatePath("/admin/tenants");
  return `${process.env.NEXT_PUBLIC_BASE_URL}/claim/${token}`;
};
