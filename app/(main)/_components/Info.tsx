import { TenantWithRooms, unpaidInvoicesType } from "@/lib/types";
import { Clock } from "lucide-react";
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
    <div className="bg-white shadow-sm rounded-lg p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:w-fit">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          Welcome{" "}
          <span className="text-primary">
            {session?.user?.name?.split(" ")[0]}
          </span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Floor:{" "}
          {Array.from(
            new Set(
              tenant.occupancies.map((occupancy) => occupancy.room.floor),
            ),
          ).join(", ")}
          , Room:{" "}
          {tenant.occupancies
            .map((occupancy) => occupancy.room.roomNumber)
            .join(", ")}
        </p>
      </div>
      <div className="flex w-full flex-row gap-3 sm:w-auto sm:flex-col">
        <div className="flex-1 bg-rose-50 rounded-2xl px-4 py-2 text-sm text-rose-700 sm:flex-none">
          <p>Pending : Rs.{totalPendingAmount}</p>
        </div>
        <div className="flex-1 bg-rose-50 flex gap-2 items-center rounded-2xl px-4 py-2 text-sm text-rose-700 sm:flex-none">
          <Clock size={18} /> Status : {hasPending ? "Unpaid" : "Paid"}
        </div>
      </div>
    </div>
  );
};

export default Info;
