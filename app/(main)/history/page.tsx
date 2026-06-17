import { auth } from "@/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { getPaymentsByTenant } from "@/lib/queries/payments";

export default async function HistoryPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const tenantId = await prisma.tenant.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!tenantId) return <p>You are not authorized</p>;
  const payments = await getPaymentsByTenant(tenantId.id);
  if (!payments) {
    return <div>No History</div>;
  }
  return (
    <div className="flex-1 p-5">
      <div className="flex justify-center border-black rounded-md border-2 ">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">DATE</TableHead>
              <TableHead className="text-center">AMOUNT</TableHead>
              <TableHead className="text-center">METHOD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow className="border-none" key={payment.id}>
                <TableCell className="font-medium text-center">
                  {new Date(payment.paidAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">{payment.amount}</TableCell>
                <TableCell className="text-center">{payment.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
