import type { Metadata } from "next";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { ClaimButton } from "./ClaimButton";

interface Props {
  params: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: "Claim Your Room",
};

const ClaimPage = async ({ params }: Props) => {
  const { token } = await params;
  const session = await auth();

  const tenant = await prisma.tenant.findUnique({
    where: { inviteToken: token },
  });

  if (!tenant) {
    return <p className="p-6 text-center">This invite link is invalid.</p>;
  }

  if (!tenant.inviteTokenExpiry || tenant.inviteTokenExpiry < new Date()) {
    return <p className="p-6 text-center">This invite link has expired.</p>;
  }

  if (tenant.userId) {
    return (
      <p className="p-6 text-center">This account has already been claimed</p>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-xl font-semibold">
        Claiming account for {tenant.name}
      </h1>
      <p className="text-muted-foreground text-sm">
        Sign in with Google to link this account.
      </p>
      <ClaimButton token={token} session={!!session} />
    </div>
  );
};
export default ClaimPage;
