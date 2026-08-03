"use server";

import { auth, signIn } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const claimTenantAccount = async (token: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return signIn("google", {
      redirectTo: `/claim/${token}`,
    });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { inviteToken: token },
  });

  if (!tenant) {
    return { success: false, message: "This invite link is invalid." };
  }

  if (!tenant.inviteTokenExpiry || tenant.inviteTokenExpiry < new Date()) {
    return { success: false, message: "This invite link has expired." };
  }

  if (tenant.userId) {
    return { success: false, message: "The tenant has already been claimed." };
  }

  const existingLink = await prisma.tenant.findUnique({
    where: { userId: session.user.id },
  });

  if (existingLink) {
    return {
      success: false,
      message: "This google account is already linked to another tenant",
    };
  }

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: {
      userId: session.user.id,
      inviteToken: null,
      inviteTokenExpiry: null,
    },
  });
  redirect("/");
};
