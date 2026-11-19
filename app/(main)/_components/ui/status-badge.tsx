import { cn } from "@/lib/utils";

export type StatusTone = "pending" | "paid" | "overdue" | "neutral";

const toneStyles: Record<StatusTone, string> = {
  pending:
    "border-amber-200/80 bg-amber-50 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300",
  paid: "border-emerald-200/80 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300",
  overdue:
    "border-rose-200/80 bg-rose-50 text-rose-800 dark:border-rose-500/25 dark:bg-rose-500/10 dark:text-rose-300",
  neutral:
    "border-border bg-muted text-muted-foreground dark:bg-muted/60",
};

const dotStyles: Record<StatusTone, string> = {
  pending: "bg-amber-500",
  paid: "bg-emerald-500",
  overdue: "bg-rose-500",
  neutral: "bg-muted-foreground",
};

export function StatusBadge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: StatusTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize",
        toneStyles[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 shrink-0 rounded-full", dotStyles[tone])}
      />
      {children}
    </span>
  );
}
