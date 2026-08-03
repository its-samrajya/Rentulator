"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { DropdownMenuDestructive } from "./DropdownActions";
import { EditTenantForm } from "./EditTenantForm";
import { getAllRoomsWithOccupancyType, TenantForAdminType } from "@/lib/types";
import { InviteLinkButton } from "./InviteLinkButton";
import { DeleteTenantDialog } from "./DeleteDialog";

interface Props {
  tenant: TenantForAdminType;
  allRooms: getAllRoomsWithOccupancyType;
}

export function TenantTableRow({ tenant, allRooms }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
        {tenant.userId ? "Claimed" : "Unclaimed"}
      </TableCell>
      <TableCell className="text-right">
        {tenant.phone ? tenant.phone : "-"}
      </TableCell>
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
        {!tenant.userId && <InviteLinkButton tenantId={tenant.id} />}
        <DropdownMenuDestructive
          onEditClick={() => setEditOpen(true)}
          onDeleteClick={() => setDeleteOpen(true)}
        />
      </TableCell>

      <EditTenantForm
        tenantId={tenant.id}
        open={editOpen}
        onOpenChange={setEditOpen}
        assignableRooms={assignableRooms}
        currentRoomIds={currentRoomsIds}
      />
      <DeleteTenantDialog
        tenantId={tenant.id}
        tenantName={tenant.name}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </TableRow>
  );
}
