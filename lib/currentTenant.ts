"use server";

import { auth } from "@/auth";
import prisma from "./prisma";

const getCurrentTenant = async () => {
  const session = await auth();
  if (!session?.user.id) return null;
  const userId = session?.user?.id;
  const tenantId = await prisma.tenant.findUnique({
    where: { userId },
    select: { id: true },
  });
  return tenantId;
};
export default getCurrentTenant;
