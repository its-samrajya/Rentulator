import { getInvoicesByFilter } from "@/lib/queries/invoice";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { InvoiceFilterStatus } from "@/lib/types";
import InvoiceTable from "./InvoiceTable";

interface Props {
  status: InvoiceFilterStatus;
}

const InvoiceList = async ({ status }: Props) => {
  const invoices = await getInvoicesByFilter(status);

  if (invoices.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <FileText className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-slate-600">No invoices found</p>
        <p className="mt-1 text-xs text-slate-400">
          No invoices match the current filter.
        </p>
      </Card>
    );
  }

  return <InvoiceTable invoices={invoices} />;
};

export default InvoiceList;