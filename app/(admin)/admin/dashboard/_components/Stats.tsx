import { CircleAlert, CircleCheck, TrendingUp, Users } from "lucide-react";

interface dataType {
  topLable: string;
  amount: string;
  endLable: string;
  icon: React.ReactNode;
  color: string;
}

const Stats = () => {
  const data: dataType[] = [
    {
      topLable: "Total Expected",
      amount: "Rs. 45000",
      endLable: "For October 2026",
      icon: <TrendingUp />,
      color: "bg-blue-100",
    },
    {
      topLable: "Collected",
      amount: "Rs. 0",
      endLable: "0% of expected",
      icon: <CircleCheck />,
      color: "bg-green-100",
    },
    {
      topLable: "Pending/Overdue",
      amount: "2",
      endLable: "Tenants need attention",
      icon: <CircleAlert />,
      color: "bg-red-100",
    },
    {
      topLable: "Total Properties",
      amount: "3",
      endLable: "100% of Occupancy",
      icon: <Users />,
      color: "bg-yellow-100",
    },
  ];

  return (
    <div className="mt-4 flex justify-between px-4">
      {data.map((items, index) => (
        <div
          key={index}
          className="flex w-fit p-6 bg-white gap-6 rounded-md shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <p className="font-light text-sm text-gray-300">{items.topLable}</p>
            <p className="font-bold text-2xl">{items.amount}</p>
            <p className="font-light text-sm text-gray-300">{items.endLable}</p>
          </div>
          <div className={`h-fit p-2 rounded-sm ${items.color}`}>
            {items.icon}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Stats;
