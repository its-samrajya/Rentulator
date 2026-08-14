"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getAllRoomsType, onlyGetAllMetersType } from "@/lib/types";
import { DropDownForMeter } from "./DropDownForMeter";
import { DeleteMeterDialog } from "./DeleteMeterDialog";

interface Props {
  meter: {
    id: string;
    meterNumber: string;
    createdAt: Date;
  };
}

export function MeterTableRow({ meter }: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <TableRow>
      <TableCell>{meter.meterNumber}</TableCell>
      <TableCell className="text-right">
        {meter.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell className="text-right">
        <DropDownForMeter onDeleteClick={() => setDeleteOpen(true)} />
      </TableCell>

      <DeleteMeterDialog
        meterId={meter.id}
        meterNumber={meter.meterNumber}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </TableRow>
  );
}
