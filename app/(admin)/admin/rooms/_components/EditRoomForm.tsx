"use client";
import { updateRoomDetails } from "@/actions/updateRoom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { onlyGetAllMetersType } from "@/lib/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  roomId: string;
  currentPrice: number;
  currentMeterId: string;
  meters: onlyGetAllMetersType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditRoomForm = ({
  roomId,
  currentPrice,
  currentMeterId,
  meters,
  open,
  onOpenChange,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const price = Number(
      (form.elements.namedItem("price") as HTMLInputElement).value,
    );

    const meterId = (form.elements.namedItem("meterId") as HTMLSelectElement)
      .value;
    const result = await updateRoomDetails(roomId, price, meterId);

    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Room</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Price</label>
            <input
              name="price"
              type="number"
              min={0}
              required
              defaultValue={currentPrice}
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Meter</label>
            <select
              name="meterId"
              required
              defaultValue={currentMeterId}
              className="border rounded px-3 py-2"
            >
              {meters.map((meter) => (
                <option key={meter.id} value={meter.id}>
                  {meter.meterNumber}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
