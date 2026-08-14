"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getAllRoomsType, onlyGetAllMetersType } from "@/lib/types";
import { DropDownForRooms } from "./DropDownForRooms";
import { EditRoomForm } from "./EditRoomForm";

interface Props {
  room: getAllRoomsType;
  meters: onlyGetAllMetersType;
}

export function RoomTableRow({ room, meters }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{room.roomNumber}</TableCell>
      <TableCell className="text-right">{room.floor}</TableCell>
      <TableCell className="text-right">{room.price}</TableCell>
      <TableCell className="text-right">
        {room.occupancies.some((occupancy) => occupancy.moveOutDate === null)
          ? "Occupied"
          : "Vacant"}
      </TableCell>
      <TableCell className="text-right">
        {room.electricMeter.meterNumber}
      </TableCell>
      <TableCell className="text-right">
        <DropDownForRooms onEditClick={() => setEditOpen(true)} />
      </TableCell>

      <EditRoomForm
        meters={meters}
        roomId={room.id}
        currentPrice={room.price}
        currentMeterId={room.meterId}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </TableRow>
  );
}
