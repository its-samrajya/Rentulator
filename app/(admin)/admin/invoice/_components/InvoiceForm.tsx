"use client";
import { createElectricBill } from "@/actions/electricBillAction";
import { Button } from "@/components/ui/button";
import NepaliDate from "nepali-datetime";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { meterWithTenant } from "@/lib/types";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import LazyNepaliDatepicker from "@/components/LazyNepaliDatePicker";

interface Prop {
  meters: meterWithTenant[];
}

const AddInvoiceButton = ({ meters }: Prop) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const meterId = formData.get("meterId") as string;
    const bsDate = formData.get("readingDate") as string;
    const nepaliDate = new NepaliDate(bsDate);
    const readingDate = nepaliDate.getDateObject();
    const currentReading = parseInt(
      formData.get("currentReading") as string,
      10,
    );
    startTransition(async () => {
      const result = await createElectricBill({
        meterId,
        readingDate,
        currentReading,
      });
      setOpen(false);
      if (result.success) {
        toast.success(result.message, {
          position: "top-center",
        });
      } else {
        toast.error(result.message, {
          position: "top-center",
        });
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary cursor-pointer text-base" size="lg">
          + Add Bills
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
          <DialogTitle>Add new bills</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex  flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Select Meter</label>
            {meters.length === 0 ? (
              <p className="text-red-500 text-xs">No meters available</p>
            ) : (
              <select
                name="meterId"
                required
                className="border rounded px-3 py-2"
              >
                <option value="">Choose a meter....</option>
                {meters.map((meter) => (
                  <option key={meter.id} value={meter.id}>
                    {meter.meterNumber} -{" "}
                    {[
                      ...new Set(
                        meter.rooms
                          .flatMap((room) => room.occupancies)
                          .map((occupancy) => occupancy.tenant.name),
                      ),
                    ].join(", ") || "Vacant"}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Reading Date</label>
            <LazyNepaliDatepicker name="readingDate" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Current Reading</label>
            <input
              name="currentReading"
              type="number"
              required
              className="border rounded px-3 py-2"
              min={0}
              placeholder="1520"
            />
          </div>
          <Button type="submit" disabled={isPending} className="mt-2">
            {isPending ? "Creating...." : "Create bill"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddInvoiceButton;
