"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Filter = () => {
  const filters = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Overdue",
      value: "overdue",
    },
    {
      label: "Paid",
      value: "paid",
    },
  ];
  const searchParams = useSearchParams();
  const current = searchParams.get("status") || "all";

  return (
    <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2 sm:gap-4">
      {filters.map((filter, index) => (
        <Button
          asChild
          variant="link"
          key={index}
          className={cn(
            "h-auto shrink-0 cursor-pointer px-2 py-1 text-sm font-medium outline-none ring-offset-background transition-colors hover:no-underline",
            current === filter.value
              ? "text-rose-700 underline-offset-4 hover:text-rose-700"
              : "text-slate-500 hover:text-slate-900",
          )}
        >
          <Link href={`/invoice?status=${filter.value}`}>{filter.label}</Link>
        </Button>
      ))}
    </div>
  );
};

export default Filter;
