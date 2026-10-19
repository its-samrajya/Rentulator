import type { Metadata } from "next";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUnpaidInvoicesByTenantId } from "@/lib/queries/invoice";
import Info from "./_components/Info";
import RentDetails from "./_components/RentDetails";
import { redirect } from "next/navigation";
import UnpaidInvoices from "./_components/UnpaidInvoices";
import { getRecentPaymentByTenant } from "@/lib/queries/payments";

export const metadata: Metadata = {
	title: "Dashboard",
};

const Home = async () => {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) redirect("/login");
	const tenant = await prisma.tenant.findUnique({
		where: { userId },
		include: {
			occupancies: {
				where: { moveOutDate: null },
				include: { room: true },
			},
		},
	});
	if (!tenant)
		return (
			<p className="mt-6 text-center text-base sm:text-lg text-gray-500">
				You are not authorized
			</p>
		);

	const unpaidInvoices = await getUnpaidInvoicesByTenantId(tenant.id);
	const totalPendingAmount = unpaidInvoices.reduce(
		(sum, invoice) => sum + invoice.totalAmount,
		0,
	);

	const getRecentPayments = await getRecentPaymentByTenant(tenant.id);

	return (
		<div className="min-h-full w-full bg-slate-100/60">
			<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
				<Info
					session={session}
					tenant={tenant}
					unpaidInvoices={unpaidInvoices}
					totalPendingAmount={totalPendingAmount}
				/>
				<RentDetails
					unpaidInvoices={unpaidInvoices}
					tenant={tenant}
					payments={getRecentPayments}
				/>
				<UnpaidInvoices tenantId={tenant.id} />
			</div>
		</div>
	);
};

export default Home;
