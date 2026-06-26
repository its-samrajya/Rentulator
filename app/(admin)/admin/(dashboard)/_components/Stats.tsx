import {
  getAllPaidInvoices,
  getTotalExpectedCurrentMonth,
} from "@/lib/queries/invoice";
import { getAllRooms } from "@/lib/queries/rooms";
import { CircleAlert, CircleCheck, TrendingUp, Users } from "lucide-react";

interface dataType {
  topLable: string;
  amount: string;
  endLable: string;
  icon: React.ReactNode;
  color: string;
}

const Stats = async () => {
  const invoices = await getTotalExpectedCurrentMonth();
  const total =
    invoices.length === 0
      ? 0
      : invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
  const paidInvoices = await getAllPaidInvoices();
  const totalPaidInvoicesAmount =
    paidInvoices.length === 0
      ? 0
      : paidInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  const numberOfUnpaidInvoices = invoices.filter(
    (invoice) => invoice.status === "PENDING",
  ).length;

  const totalRooms = await getAllRooms();

  const data: dataType[] = [
    {
      topLable: "Total Expected",
      amount: total.toString(),
      endLable: `For ${new Date().toLocaleDateString("default", { month: "long", year: "numeric" })}`,
      icon: <TrendingUp />,
      color: "bg-blue-100",
    },
    {
      topLable: "Collected",
      amount: totalPaidInvoicesAmount.toString(),
      endLable: `For ${new Date().toLocaleDateString("default", { month: "long", year: "numeric" })}`,
      icon: <CircleCheck />,
      color: "bg-green-100",
    },
    {
      topLable: "Pending/Overdue",
      amount: numberOfUnpaidInvoices.toString(),
      endLable: `For ${new Date().toLocaleDateString("default", { month: "long", year: "numeric" })}`,
      icon: <CircleAlert />,
      color: "bg-red-100",
    },
    {
      topLable: "Total Properties",
      amount: totalRooms.toString(),
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
            <p className="font-light text-sm text-purple-800">
              {items.topLable}
            </p>
            <p className="font-bold text-2xl">{items.amount}</p>
            <p className="font-light text-sm text-blue-900">{items.endLable}</p>
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
