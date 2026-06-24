import { Prisma } from "@/app/generated/prisma/client";
import { getInvoicesByTenantId } from "./queries/invoice";

export type meterWithTenant = Prisma.ElectricMeterGetPayload<{
  include: { tenant: true };
}>;

export type invoicesType = Awaited<ReturnType<typeof getInvoicesByTenantId>>;
