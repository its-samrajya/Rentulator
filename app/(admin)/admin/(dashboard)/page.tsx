import { Button } from "@/components/ui/button";
import Stats from "./_components/Stats";
import Reminder from "./_components/Reminder";
import RecentPayments from "./_components/RecentPayments";

const Dashboard = () => {
  return (
    <div className="flex-1 p-2 bg-primary">
      <div className="bg-admin-ui rounded-md h-full w-full px-16 pt-5">
        <div className="text-black max-w-7xl  p-4 flex items-center  justify-between ">
          <div className=" w-fit">
            <h1 className="text-4xl font-bold w-fit text-primary">Dashboard</h1>
            <p>Welcome back, here&apos;s what&apos;s happening today.</p>
          </div>
          <div>
            <Button className="bg-primary text-base" size="lg">
              + Record Payment
            </Button>
          </div>
        </div>
        <Stats />
        <div className="flex mt-4 px-4 justify-between ">
          <Reminder />
          <RecentPayments />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
