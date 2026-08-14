"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createMeter } from "@/lib/queries/meter";
import { useState } from "react";
import { toast } from "react-toastify";

export const AddMeterForm = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const meterNumber = (
        form.elements.namedItem("meterNumber") as HTMLInputElement
      ).value;
      await createMeter(meterNumber);
      toast.success("Meter created successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create meter");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary cursor-pointer text-base" size="lg">
          + Add Meter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Meter</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex  flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Meter Number</label>
            <input
              name="meterNumber"
              type="text"
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? "Creating...." : "Create Meter"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
