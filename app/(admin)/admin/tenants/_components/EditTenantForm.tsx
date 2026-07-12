"use client";
import { updateTenantRooms } from "@/actions/updateTenant";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface RoomOption {
  id: string;
  roomNumber: number;
  floor: string;
}

interface Props {
  tenantId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignableRooms: RoomOption[]; // available rooms + this tenant's current rooms
  currentRoomIds: string[]; // rooms this tenant currently occupies
}

export const EditTenantForm = ({
  tenantId,
  open,
  onOpenChange,
  assignableRooms,
  currentRoomIds,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const checkedRoomIds = Array.from(
      form.querySelectorAll<HTMLInputElement>('input[name="roomIds"]:checked'),
    ).map((el) => el.value);

    const moveInDate = (
      form.elements.namedItem("moveInDate") as HTMLInputElement
    ).value;

    const result = await updateTenantRooms(
      tenantId,
      checkedRoomIds,
      moveInDate,
    );

    setLoading(false);
    if (result.success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tenant Rooms</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Rooms</label>
            <div className="flex flex-col gap-2 border rounded p-3 max-h-48 overflow-y-auto">
              {assignableRooms.length === 0 ? (
                <p className="text-gray-500 text-xs">No rooms available</p>
              ) : (
                assignableRooms.map((room) => (
                  <label
                    key={room.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      name="roomIds"
                      value={room.id}
                      defaultChecked={currentRoomIds.includes(room.id)}
                    />
                    Room {room.roomNumber} — {room.floor}
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Move In Date (for newly added rooms)
            </label>
            <input
              name="moveInDate"
              type="date"
              required
              className="border rounded px-3 py-2"
            />
          </div>

          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
