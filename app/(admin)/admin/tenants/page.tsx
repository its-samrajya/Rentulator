import TenantList from "./_components/TenantList";
import { TenantForm } from "./_components/TenantForm";
import prisma from "@/lib/prisma";

const AdminTenants = async () => {
  const users = await prisma.user.findMany({
    where: { tenant: null, email: { not: null } },
    select: { id: true, name: true, email: true },
  });
  const rooms = await prisma.room.findMany({
    where: {
      occupancies: {
        none: { moveOutDate: null },
      },
    },
    select: { id: true, roomNumber: true, floor: true },
  });

  return (
    <div className="min-h-full w-full bg-slate-100/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Tenants
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your tenants and their room assignments
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <TenantForm users={users} rooms={rooms} />
          </div>
        </div>
        <div className="mt-4">
          <TenantList />
        </div>
      </div>
    </div>
  );
};

export default AdminTenants;
