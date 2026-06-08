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

export default function RecentPayments() {
  return (
    <div className="bg-white rounded-md mt-6 shadow-lg p-5 w-full max-w-sm">
      <h2 className="text-base font-semibold text-gray-900 mb-4">
        Recent Payments
      </h2>

      <div className="divide-y divide-gray-100">
        {payments.map((payment) => (
          <div
            key={payment.name}
            className="flex justify-between items-start py-3.5"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {payment.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">{payment.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-500">
                +{payment.amount}
              </p>
              <p className="text-xs text-gray-400 mt-1 tracking-wide">
                {payment.method}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
