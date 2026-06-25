import { Prisma } from "@/app/generated/prisma/client";
import { getUnpaidInvoicesByTenantId } from "./queries/invoice";

export type meterWithTenant = Prisma.ElectricMeterGetPayload<{
  include: { tenant: true };
}>;

export type unpaidInvoicesType = Awaited<
  ReturnType<typeof getUnpaidInvoicesByTenantId>
>;

export type TenantWithRooms = Prisma.TenantGetPayload<{
  include: { rooms: true };
}>;
