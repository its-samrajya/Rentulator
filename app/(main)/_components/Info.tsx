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
    <div className="text-black  bg-white  shadow-sm rounded-md  p-6 flex items-center justify-between ">
      <div className=" w-fit">
        <h1 className="text-4xl font-bold w-fit">
          Welcome{" "}
          <span className="text-primary">
            {session?.user?.name?.split(" ")[0]}
          </span>
        </h1>
        <p className="text-base text-gray-500">
          Floor:{" "}
          {[...new Set(tenant.rooms.map((room) => room.floor))].join(", ")},{" "}
          Room: {tenant.rooms.map((room) => room.roomNumber).join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-red-100 rounded-2xl p-2 text-sm text-red-800">
          <p>Pending : Rs.{totalPendingAmount}</p>
        </div>
        <div className="bg-red-100 flex gap-2 items-center rounded-2xl p-2 text-sm text-red-800">
          <Clock size={20} /> Status : {hasPending ? "Unpaid" : "Paid"}
        </div>
      </div>
    </div>
  );
};

export default Info;
