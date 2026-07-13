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
    <div className="border-b pb-2 border-black flex gap-10">
      {filters.map((filter, index) => (
        <Button
          asChild
          variant="link"
          key={index}
          className={cn(
            "cursor-pointer outline-none bg-transparent",
            current === filter.value && "text-red-700 ",
          )}
        >
          <Link href={`/admin/invoice?status=${filter.value}`}>
            {filter.label}
          </Link>
        </Button>
      ))}
    </div>
  );
};
export default Filter;
