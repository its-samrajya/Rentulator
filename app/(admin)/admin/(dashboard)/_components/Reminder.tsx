import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInvoices } from "@/lib/queries/invoice";
const Reminder = async () => {
  const invoices = await getInvoices();
  console.log(invoices);
  const info = [
    {
      name: "Rahul Sharma",
      property: "Flat 302, Green Park",
      due: "Rs. 250.00",
      status: "Overdue",
      action: "Remind",
    },
  ];

  return (
    <div className="bg-white mt-6 p-3  min-w-3xl max-w-3xl shadow-lg rounded-md">
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
            <TableRow key={info.tenant.name}>
              <TableCell className="font-medium">{info.tenant.name}</TableCell>
              <TableCell>{info.tenantId}</TableCell>
              <TableCell>{info.totalAmount}</TableCell>
              <TableCell>
                {new Date(info.dueDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">{info.status}</TableCell>
              <TableCell className="text-right">Remind</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
export default Reminder;
