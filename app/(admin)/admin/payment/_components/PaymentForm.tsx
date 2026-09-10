"use client";
import { createPayment } from "@/actions/addPayment";
import LazyNepaliDatepicker from "@/components/LazyNepaliDatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NepaliDate from "nepali-datetime";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  invoices: {
    id: string;
    tenantName: string;
    remaining: number;
  }[];
}

const PaymentForm = ({ invoices }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const selectedInvoice = invoices.find((i) => i.id === invoiceId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;

      const bsDate = (form.elements.namedItem("paidAt") as HTMLInputElement)
        .value;
      if (!bsDate) {
        toast.error("Select a date");
        return;
      }
      const paidAt = new NepaliDate(bsDate).getDateObject();

      const amountValue = (
        form.elements.namedItem("amount") as HTMLInputElement
      ).value;
      const amount = Number(amountValue);
      if (!amount || amount <= 0) {
        toast.error("Amount must be greater than zero");
        return;
      }

      const note = (form.elements.namedItem("note") as HTMLSelectElement).value;
      if (!note) {
        toast.error("Select a method");
        return;
      }

      if (!invoiceId) {
        toast.error("Select an invoice");
        return;
      }

      const result = await createPayment({ invoiceId, amount, note, paidAt });

      if (result.success) {
        toast.success(result.message);
        form.reset();
        setInvoiceId("");
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to record payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary cursor-pointer text-base" size="lg">
          + Record Payment
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
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Invoice</label>
            <select
              name="invoiceId"
              required
              className="border rounded px-3 py-2"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
            >
              <option value="">Select an invoice</option>
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.tenantName} -due {inv.remaining}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Amount</label>
            <input
              name="amount"
              type="number"
              required
              key={invoiceId}
              defaultValue={selectedInvoice?.remaining ?? ""}
              max={selectedInvoice?.remaining}
              className="border rounded px-3 py-2"
            />
            {selectedInvoice && (
              <p className="text-xs text-muted-foreground">
                Remaining balance: {selectedInvoice.remaining}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Method</label>
            <select name="note" required className="border rounded px-3 py-2">
              <option value="">Select method</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Payment Date</label>
            <LazyNepaliDatepicker name="paidAt" required />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Recording..." : "Record Payment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm;
