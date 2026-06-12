"use server";
import Filter from "./_components/Filter";
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
    <div className="flex-1 pt-5 px-16 bg-yellow-100 ">
      <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
        <div className=" w-fit">
          <h1 className="text-4xl font-bold w-fit">Tenants</h1>
        </div>
        <div>
          <TenantForm users={users} rooms={rooms} />
        </div>
      </div>
      <div className="mt-4 px-4 ">
        <Filter />
      </div>
      <div className="mt-4">{<TenantList />}</div>
    </div>
  );
};
export default AdminTenants;
