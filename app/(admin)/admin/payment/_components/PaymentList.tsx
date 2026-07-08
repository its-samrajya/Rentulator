import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPayments } from "@/lib/queries/payments";
import { Printer } from "lucide-react";
import Link from "next/link";
const PaymentList = async () => {
  const payments = await getPayments();
  console.log("this is the payments", payments);
  return (
    <div className="bg-white mt-6 p-3  shadow-lg rounded-md">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>DATE</TableHead>
            <TableHead>TENANT</TableHead>
            <TableHead>FLOOR</TableHead>
            <TableHead>ROOM</TableHead>
            <TableHead>METHOD</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead className="text-center">RECEIPT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">
                {new Date(payment.paidAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{payment.invoice.tenant.name}</TableCell>
              <TableCell>
                {payment.invoice.tenant.occupancies
                  .map((occupancy) => occupancy.room.floor)
                  .join(",")}
              </TableCell>
              <TableCell>
                {payment.invoice.tenant.occupancies
                  .map((occupancy) => occupancy.room.roomNumber)
                  .join(",")}
              </TableCell>
              <TableCell>{payment.note}</TableCell>
              <TableCell className="">{payment.amount}</TableCell>
              <TableCell className="text-center">
                <Button className="cursor-pointer" variant="ghost" asChild>
                  <Link
                    href={`/admin/payment/receipt/${payment.id}`}
                    target="_blank"
                  >
                    <Printer color="blue" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentList;
