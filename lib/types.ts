import { Prisma } from "@/app/generated/prisma/client";
import { getUnpaidInvoicesByTenantId } from "./queries/invoice";
import { getAllTenantForAdmin } from "./queries/tenants";

export type meterWithTenant = Prisma.ElectricMeterGetPayload<{
  include: {
    rooms: {
      include: {
        occupancies: {
          include: { tenant: true };
        };
      };
    };
  };
}>;

export type unpaidInvoicesType = Awaited<
  ReturnType<typeof getUnpaidInvoicesByTenantId>
>;

export type TenantWithRooms = Prisma.TenantGetPayload<{
  include: {
    occupancies: {
      include: { room: true };
    };
  };
}>;

export type TenantForAdminType = Awaited<
  ReturnType<typeof getAllTenantForAdmin>
>[number];
