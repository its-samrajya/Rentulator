import { Prisma } from "@/app/generated/prisma/client";
import { getInvoicesByTenantId } from "@/lib/queries/invoice";
import { Clock } from "lucide-react";
import { Session } from "next-auth";

type TenantWithRooms = Prisma.TenantGetPayload<{ include: { rooms: true } }>;

type Props = {
  session: Session | null;
  tenant: TenantWithRooms;
  invoices: Awaited<ReturnType<typeof getInvoicesByTenantId>>;
  totalPendingAmount: number;
};

const Info = ({ session, tenant, invoices, totalPendingAmount }: Props) => {
  return (
    <div className="text-black  bg-white  shadow-lg rounded-md  p-6 flex items-center justify-between ">
      <div className=" w-fit">
        <h1 className="text-4xl font-bold w-fit">
          {`
            Welcome ${session?.user?.name?.split(" ")[0]}!
             `}
        </h1>
        <p className="textbase text-gray-500">
          {tenant.rooms
            .map((room) => `${room.floor}-${room.roomNumber}`)
            .join(", ")}
        </p>
      </div>
      <div className="bg-red-100 rounded-2xl p-2 text-sm text-red-800">
        <p>Remaining Amount to be paid {totalPendingAmount}</p>
      </div>
      <div>
        <div className="bg-red-100 flex gap-2 items-center rounded-2xl p-2 text-sm text-red-800">
          <Clock size={20} /> Status :{" "}
          {invoices?.[0]?.status ? invoices[0].status : "None"}
        </div>
      </div>
    </div>
  );
};

export default Info;
