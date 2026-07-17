"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Funnel } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const FilterForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", date.getMonth().toString());
    params.set("year", date.getFullYear().toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="text-base cursor-pointer"
          size="lg"
        >
          <Funnel />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar mode="single" onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  );
};
export default FilterForm;
