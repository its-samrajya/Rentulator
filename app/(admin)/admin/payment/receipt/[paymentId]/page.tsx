import { getReceipt } from "@/lib/queries/receipt";
import PrintButton from "../../_components/PrintButton";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    paymentId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Receipt",
};

const ReceiptPage = async ({ params }: Props) => {
  const { paymentId } = await params;
  const payment = await getReceipt({ paymentId });
  if (!payment) return <div>Receipt not found</div>;
  const tenant = payment.invoice.tenant;
  const rooms = tenant.occupancies.map((o) => o.room);
  return (
    <div className="max-w-md mx-auto mt-10 h-fit p-8 border rounded shadow print:shadow-none print:border-none">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Payment Receipt</h1>
        <p className="text-gray-500 text-sm">
          Id: {payment.id.slice(0, 8).toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Tenant</span>
          <span className="font-medium">{tenant.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Property</span>
          <span className="font-medium">
            {rooms
              .map((room) => `Room ${room.roomNumber} — ${room.floor}`)
              .join(", ") || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Date</span>
          <span className="font-medium">
            {formatNepaliDate(payment.paidAt)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Method</span>
          <span className="font-medium">{payment.note ?? "—"}</span>
        </div>
        <div className="flex justify-between border-t pt-3 mt-2">
          <span className="font-bold">Amount Paid</span>
          <span className="font-bold text-green-600">Rs. {payment.amount}</span>
        </div>
      </div>

      <PrintButton />
    </div>
  );
};
export default ReceiptPage;
