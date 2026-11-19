import { TenantWithRooms, unpaidInvoicesType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Building2, Clock, DoorOpen, Wallet } from "lucide-react";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
  tenant: TenantWithRooms;
  unpaidInvoices: unpaidInvoicesType;
  totalPendingAmount: number;
};

const Info = ({
  session,
  tenant,
  unpaidInvoices,
  totalPendingAmount,
}: Props) => {
  const hasPending = unpaidInvoices.some(
    (invoice) => invoice.status === "PENDING",
  );
  return (
    <section className="animate-in overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xs fade-in-0 slide-in-from-bottom-2 duration-500 motion-reduce:animate-none">
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-center lg:gap-10 lg:p-8">
        <div className="min-w-0">
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Welcome{" "}
            <span className="text-primary">
              {session?.user?.name?.split(" ")[0]}
            </span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Building2
                className="size-4 shrink-0 text-muted-foreground/70"
                aria-hidden="true"
              />
              Floor:{" "}
              <span className="font-medium text-foreground">
                {Array.from(
                  new Set(
                    tenant.occupancies.map(
                      (occupancy) => occupancy.room.floor,
                    ),
                  ),
                ).join(", ")}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-border sm:block"
            />
            <span className="inline-flex items-center gap-2">
              <DoorOpen
                className="size-4 shrink-0 text-muted-foreground/70"
                aria-hidden="true"
              />
              Room:{" "}
              <span className="font-medium text-foreground">
                {tenant.occupancies
                  .map((occupancy) => occupancy.room.roomNumber)
                  .join(", ")}
              </span>
            </span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div
            className={cn(
              "rounded-xl border p-4",
              hasPending
                ? "border-amber-200/80 bg-amber-50/70 text-amber-900 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200"
                : "border-emerald-200/80 bg-emerald-50/70 text-emerald-900 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200",
            )}
          >
            <div className="flex items-center gap-2">
              <Wallet className="size-4" aria-hidden="true" />
              <p className="text-xs font-medium">Pending</p>
            </div>
            <p className="mt-2 font-mono text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
              <span className="text-base font-medium">Rs.</span>
              {totalPendingAmount}
            </p>
          </div>
          <div
            className={cn(
              "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium",
              hasPending
                ? "border-amber-200/80 bg-amber-50/70 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300"
                : "border-emerald-200/80 bg-emerald-50/70 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300",
            )}
          >
            <Clock className="size-4 shrink-0" aria-hidden="true" />
            <span>Status : {hasPending ? "Unpaid" : "Paid"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
