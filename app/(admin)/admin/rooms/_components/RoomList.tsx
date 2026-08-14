import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { BedSingle } from "lucide-react";
import { getAllRooms, getAllRoomsCount } from "@/lib/queries/rooms";
import { RoomTableRow } from "./RoomTableRow";
import { onlyGetAllMeters } from "@/lib/queries/meter";

const RoomList = async () => {
  const allRooms = await getAllRooms();
  const getRoomsCount = await getAllRoomsCount();
  const meters = await onlyGetAllMeters();
  return (
    <Card className="border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <BedSingle className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">Rooms</h2>
          <p className="text-xs text-slate-400">{getRoomsCount} rooms total</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 hover:bg-transparent">
              <TableHead className="h-10 w-25 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Room
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Floor
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Rent
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Meter
              </TableHead>
              <TableHead className="h-10 px-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                <div>Action</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allRooms.length === 0 ? (
              <TableRow className="border-transparent hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-sm text-slate-400"
                >
                  No Rooms yet. Add rooms to get started.
                </TableCell>
              </TableRow>
            ) : (
              allRooms.map((room) => (
                <RoomTableRow key={room.id} room={room} meters={meters} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default RoomList;
