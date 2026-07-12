import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvoices } from "@/lib/queries/invoice";
const Reminder = async () => {
  const invoices = await getInvoices();

  return (
    <div className="bg-linear-to-r from-pink-100 to-teal-100 mt-6 p-3  min-w-3xl max-w-3xl shadow-lg rounded-md">
      <h2 className="text-base font-semibold text-gray-900 mb-4 mt-2 px-2">
        Needs Attention
      </h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Tenant</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((info) => (
            <TableRow key={info.id}>
              <TableCell className="font-medium">{info.tenant.name}</TableCell>
              <TableCell className="text-center">{info.tenantId}</TableCell>
              <TableCell>{info.totalAmount}</TableCell>
              <TableCell>
                {new Date(info.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">{info.status}</TableCell>
              <TableCell className="text-right">Remind</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Reminder;
