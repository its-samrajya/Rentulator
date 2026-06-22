import { Prisma } from "@/app/generated/prisma/client";

export type meterWithTenant = Prisma.ElectricMeterGetPayload<{
  include: { tenant: true };
}>;
