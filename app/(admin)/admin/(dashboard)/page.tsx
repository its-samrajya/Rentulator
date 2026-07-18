import Stats from "./_components/Stats";
import Reminder from "./_components/Reminder";
import RecentPayments from "./_components/RecentPayments";
import { ChartPieLabel } from "./_components/PieChart";
import prisma from "@/lib/prisma";

const Dashboard = async () => {
  const totalRooms = await prisma.room.count();
  const occupiedRooms = await prisma.room.count({
    where: {
      occupancies: {
        some: { moveOutDate: null },
      },
    },
  });
  const vacantRooms = totalRooms - occupiedRooms;

  return (
    <div className="min-h-full w-full bg-slate-100/60">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex flex-col gap-1 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 sm:text-base">
            Welcome back, here&apos;s what&apos;s happening today.
          </p>
        </div>

        <Stats />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reminder />
          </div>
          <div className="lg:col-span-1">
            <RecentPayments />
          </div>
        </div>

        <div className="mt-6">
          <ChartPieLabel occupied={occupiedRooms} vacant={vacantRooms} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
