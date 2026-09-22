"use client";
import LazyNepaliDatepicker from "@/components/LazyNepaliDatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createTenant } from "@/lib/queries/tenants";
import NepaliDate from "nepali-datetime";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  rooms: { id: string; roomNumber: number; floor: string }[];
}

export const TenantForm = ({ rooms }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const bsDate = (form.elements.namedItem("moveInDate") as HTMLInputElement)
        .value;
      const nepaliDate = new NepaliDate(bsDate);
      const moveInDate = nepaliDate.getDateObject();
      const data = {
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
        email:
          (form.elements.namedItem("email") as HTMLInputElement).value ||
          undefined,
        moveInDate,
        roomId:
          (form.elements.namedItem("roomId") as HTMLSelectElement).value ||
          undefined,
      };
      await createTenant(data);
      toast.success("Tenant created successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary cursor-pointer text-base" size="lg">
          + Add Tenant
        </Button>
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest(".ndp-container")) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Add New Tenant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex  flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              type="text"
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Phone</label>
            <input
              name="phone"
              type="tel"
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email (optional)</label>
            <input
              name="email"
              type="email"
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Move In Date</label>
            <LazyNepaliDatepicker name="moveInDate" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Assign room (optional)
            </label>
            <select name="roomId" className="border rounded px-3 py-2">
              <option value="">Select room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  Room {room.roomNumber} - {room.floor}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Creating...." : "Create Tenant"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
