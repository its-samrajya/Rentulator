import { getInvoicesByFilter } from "@/lib/queries/invoice";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import InvoiceTable from "./InvoiceTable";
import { NEPALI_MONTH_NAMES } from "@/utils/nepaliDate";

interface Props {
  year: number;
  month: number;
}

const InvoiceList = async ({ year, month }: Props) => {
  const invoices = await getInvoicesByFilter(year, month);

  if (invoices.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center border-slate-200/80 bg-white p-12 text-center shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <FileText className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-slate-600">
          No invoices found for the selected{" "}
         <span className="underline underline-offset-2">{NEPALI_MONTH_NAMES[month - 1]}</span>{" "}
         month.
        </p>
      </Card>
    );
  }

  return <InvoiceTable invoices={invoices} />;
};

export default InvoiceList;