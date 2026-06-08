"use client";

import { Button } from "@/components/ui/button";
import Stats from "./_components/Stats";

const Dashboard = () => {
  return (
    <div className="flex-1 px-16 bg-yellow-100 ">
      <div className="text-black max-w-7xl border-4 p-4 flex items-center justify-between border-green-600 ">
        <div className="border-red-600 border-2 w-fit">
          <h1 className="text-4xl font-bold w-fit">Dashboard</h1>
          <p>Welcome back, here&apos;s what&apos;s happening today.</p>
        </div>
        <div>
          <Button className="bg-blue-500 text-base" size="lg">
            + Record Payment
          </Button>
        </div>
      </div>
      <Stats />
    </div>
  );
};
export default Dashboard;
