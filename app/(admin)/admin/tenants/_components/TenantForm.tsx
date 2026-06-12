"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createTenant } from "@/lib/queries/tenants";
import { useState } from "react";

interface Props {
  users: { id: string; name: string | null; email: string | null }[];
  rooms: { id: string; roomNumber: number; floor: string }[];
}

export const TenantForm = ({ users, rooms }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      moveInDate: (form.elements.namedItem("moveInDate") as HTMLInputElement)
        .value,
      userId: (form.elements.namedItem("userId") as HTMLSelectElement).value,
      roomId:
        (form.elements.namedItem("roomId") as HTMLSelectElement).value ||
        undefined,
    };
    await createTenant(data);
    setLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500  cursor-pointer text-base" size="lg">
          + Add Tenant
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Tenant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex  flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Select User(Gmail)</label>
            {users.length === 0 ? (
              <p className="text-red-500 text-xs">
                No users available - they need to sign in with Google first
              </p>
            ) : (
              <select
                name="userId"
                required
                className="border rounded px-3 py-2"
              >
                <option value="">Choose a user....</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.email}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Move In Date</label>
            <input
              name="moveInDate"
              type="date"
              required
              className="border rounded px-3 py-2"
            />
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
