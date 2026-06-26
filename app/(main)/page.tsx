import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUnpaidInvoicesByTenantId } from "@/lib/queries/invoice";
import Info from "./_components/Info";
import RentDetails from "./_components/RentDetails";
import { redirect } from "next/navigation";
import UnpaidInvoices from "./_components/UnpaidInvoices";

const Home = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");
  const tenant = await prisma.tenant.findUnique({
    where: { userId },
    include: { rooms: true },
  });
  if (!tenant) return <p>You haven&apos;t been added as a tenant</p>;
  // const invoices = await getInvoicesByTenantId(tenant.id);
  const unpaidInvoices = await getUnpaidInvoicesByTenantId(tenant.id);

  // const totalPendingAmount = invoices
  //   .filter((invoice) => invoice.status === "PENDING")
  //   .reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  const totalPendingAmount = unpaidInvoices.reduce(
    (sum, invoice) => sum + invoice.totalAmount,
    0,
  );

  return (
    <div className="flex-1 pt-5 px-16 bg-admin-ui">
      <div className="max-w-7xl">
        <Info
          session={session}
          tenant={tenant}
          unpaidInvoices={unpaidInvoices}
          totalPendingAmount={totalPendingAmount}
        />
        <RentDetails unpaidInvoices={unpaidInvoices} tenant={tenant} />
      </div>
      <UnpaidInvoices tenantId={tenant.id} />
    </div>
  );
};
export default Home;
