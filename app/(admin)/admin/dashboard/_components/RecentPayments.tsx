import { getPayments } from "@/lib/queries/invoice";

const payments = [
  { name: "Priya Desai", date: "10/1/2023", amount: "₹12,000", method: "UPI" },
  {
    name: "Amit Verma",
    date: "10/11/2023",
    amount: "₹20,000",
    method: "BANK TRANSFER",
  },
  { name: "Rahul Sharma", date: "9/6/2023", amount: "₹15,000", method: "CASH" },
];

export default async function RecentPayments() {
  const payment = await getPayments();
  console.log("the payment is", payment);
  return (
    <div className="bg-white rounded-md mt-6 shadow-lg p-5 w-full max-w-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Recent Payments
      </h2>

      <div className="divide-y divide-gray-100">
        {payment.map((payment) => (
          <div
            key={payment.invoice.tenant.name}
            className="flex justify-between items-start py-3.5"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {payment.invoice.tenant.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(payment.paidAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-500">
                +{payment.amount}
              </p>
              <p className="text-xs text-gray-400 mt-1 tracking-wide">
                {payment.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
