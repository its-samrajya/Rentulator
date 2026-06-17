import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getInvoicesByTenantId } from "@/lib/queries/invoice";
import Info from "./_components/Info";
import RentDetails from "./_components/RentDetails";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login");
  const tenant = await prisma.tenant.findUnique({
    where: { userId },
    include: { rooms: true },
  });
  if (!tenant) return <p>You haven&apos;t been added as a tenant</p>;
  const invoices = await getInvoicesByTenantId(tenant.id);
  return (
    <div className="flex-1 pt-5 px-16 bg-yellow-100 ">
      <div className="max-w-7xl">
        <Info session={session} tenant={tenant} invoices={invoices} />
        <RentDetails />
      </div>
    </div>
  );
};
export default Home;
