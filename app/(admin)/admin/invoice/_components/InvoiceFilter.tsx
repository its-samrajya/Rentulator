"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NEPALI_MONTH_NAMES } from "@/utils/nepaliDate";

interface Props {
  years: number[];
  year: number;
  month: number;
}

const InvoiceFilters = ({ years, year, month }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigate = (key: "year" | "month", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <label className="text-sm font-medium text-slate-700">Year</label>
      <Select value={String(year)} onValueChange={(v) => navigate("year", v)}>
        <SelectTrigger className="w-full sm:w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label className="text-sm font-medium text-slate-700">Month</label>
      <Select
        value={String(month)}
        onValueChange={(v) => navigate("month", v)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {NEPALI_MONTH_NAMES.map((name, index) => (
            <SelectItem key={name} value={String(index + 1)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InvoiceFilters;
