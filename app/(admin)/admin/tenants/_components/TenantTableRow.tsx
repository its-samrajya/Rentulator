"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DropdownMenuDestructive } from "./DropdownActions";
import { EditTenantForm } from "./EditTenantForm";
import { getAllRoomsWithOccupancyType, TenantForAdminType } from "@/lib/types";

interface Props {
  tenant: TenantForAdminType;
  allRooms: getAllRoomsWithOccupancyType;
}

export function TenantTableRow({ tenant, allRooms }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const assignableRooms = allRooms.filter(
    (room) =>
      room.occupancies.length === 0 ||
      room.occupancies.some((o) => o.tenantId === tenant.id),
  );

  const currentRoomsIds = allRooms
    .filter((room) => room.occupancies.some((o) => o.tenantId === tenant.id))
    .map((room) => room.id);

  return (
    <TableRow>
      <TableCell>{tenant.name}</TableCell>
      <TableCell className="text-right">
        {tenant.occupancies.map((occupancy) => occupancy.room.floor).join(", ")}
      </TableCell>
      <TableCell className="text-right">
        {tenant.occupancies
          .map((occupancy) => occupancy.room.roomNumber)
          .join(", ")}
      </TableCell>
      <TableCell className="text-right">
        {tenant.occupancies
          .map((occupancy) => occupancy.room.electricMeter.meterNumber)
          .join(", ")}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenuDestructive onEditClick={() => setEditOpen(true)} />
      </TableCell>

      <EditTenantForm
        tenantId={tenant.id}
        open={editOpen}
        onOpenChange={setEditOpen}
        assignableRooms={assignableRooms}
        currentRoomIds={currentRoomsIds}
      />
    </TableRow>
  );
}
