"use server";
import TenantList from "./_components/TenantList";
import { TenantForm } from "./_components/TenantForm";
import prisma from "@/lib/prisma";

const AdminTenants = async () => {
  const users = await prisma.user.findMany({
    where: { tenant: null, email: { not: null } },
    select: { id: true, name: true, email: true },
  });
  const rooms = await prisma.room.findMany({
    where: { tenantId: null },
    select: { id: true, roomNumber: true, floor: true },
  });
  return (
    <div className="flex-1 bg-primary p-2">
      <div className="bg-admin-ui rounded-md h-full w-full px-16 pt-5">
        <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
          <div className=" w-fit">
            <h1 className="text-4xl font-bold w-fit text-primary">Tenants</h1>
          </div>
          <div>
            <TenantForm users={users} rooms={rooms} />
          </div>
        </div>
        <div className="mt-4">{<TenantList />}</div>
      </div>
    </div>
  );
};
export default AdminTenants;
