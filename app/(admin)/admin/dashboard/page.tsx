import { Button } from "@/components/ui/button";
import Stats from "./_components/Stats";
import Reminder from "./_components/Reminder";
import RecentPayments from "./_components/RecentPayments";

const Dashboard = () => {
  return (
    <div className="flex-1 pt-5 px-16 bg-yellow-100 ">
      <div className="text-black max-w-7xl  p-4 flex items-center justify-between ">
        <div className=" w-fit">
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
      <div className="flex mt-4 px-4 justify-between">
        <Reminder />
        <RecentPayments />
      </div>
    </div>
  );
};
export default Dashboard;
