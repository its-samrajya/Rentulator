import { PaymentStatus, Prisma } from "@/app/generated/prisma/client";
import {
  getInvoicesByFilter,
  getUnpaidInvoicesByTenantId,
} from "./queries/invoice";
import { getAllTenantForAdmin } from "./queries/tenants";
import { getAllRoomsWithOccupancy } from "./queries/occupancy";
import { getAllRooms } from "./queries/rooms";
import { onlyGetAllMeters } from "./queries/meter";

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

export type getAllRoomsWithOccupancyType = Awaited<
  ReturnType<typeof getAllRoomsWithOccupancy>
>;

export type InvoiceFilterStatus = "all" | Lowercase<keyof typeof PaymentStatus>;

export type getAllRoomsType = Awaited<ReturnType<typeof getAllRooms>>[number];

export type onlyGetAllMetersType = Awaited<ReturnType<typeof onlyGetAllMeters>>;

export type getInvoicesByFilterType = Awaited<
  ReturnType<typeof getInvoicesByFilter>
>[number];
