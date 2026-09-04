"use client";
import { updateTenantRooms } from "@/actions/updateTenant";
import LazyNepaliDatepicker from "@/components/LazyNepaliDatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NepaliDate from "nepali-datetime";
import { useState } from "react";

interface RoomOption {
  id: string;
  roomNumber: number;
  floor: string;
}

interface Props {
  tenantId: string;
  tenantPhone?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignableRooms: RoomOption[]; // available rooms + this tenant's current rooms
  currentRoomIds: string[]; // rooms this tenant currently occupies
}

export const EditTenantForm = ({
  tenantId,
  tenantPhone,
  open,
  onOpenChange,
  assignableRooms,
  currentRoomIds,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const checkedRoomIds = Array.from(
      form.querySelectorAll<HTMLInputElement>('input[name="roomIds"]:checked'),
    ).map((el) => el.value);

    const updatedPhone = (form.elements.namedItem("phone") as HTMLInputElement)
      .value;

    const bsDate = (form.elements.namedItem("moveInDate") as HTMLInputElement)
      .value;

    let moveInDate: Date | null = null;
    if (bsDate) {
      try {
        const nepaliDate = new NepaliDate(bsDate);
        moveInDate = nepaliDate.getDateObject();
      } catch {
        alert("Invalid move-in date.");
        return;
      }
    }
    const newRoomIds = checkedRoomIds.filter(
      (id) => !currentRoomIds.includes(id),
    );
    if (newRoomIds.length > 0 && !moveInDate) {
      alert("Please select a move-in date for the newly added room(s).");
      return;
    }
    setLoading(true);

    const result = await updateTenantRooms(
      tenantId,
      updatedPhone,
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
      <DialogContent
        onPointerDownOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest(".ndp-container")) {
            e.preventDefault();
          }
        }}
      >
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
            <label className="text-sm font-medium">Phone number</label>
            <input
              name="phone"
              type="tel"
              required
              className="border rounded px-3 py-2"
              defaultValue={tenantPhone ?? ""}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Move In Date (for newly added rooms)
            </label>
            <LazyNepaliDatepicker name="moveInDate" />
          </div>

          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
