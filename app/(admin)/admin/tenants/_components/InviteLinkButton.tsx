"use client";

import { generateInviteLink } from "@/actions/generateInviteLink";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "react-toastify";

interface Props {
  tenantId: string;
}

export const InviteLinkButton = ({ tenantId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      const link = await generateInviteLink(tenantId);
      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied");
    });
  };
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="cursor-pointer"
    >
      {isPending ? "Generating..." : "Invite"}
    </Button>
  );
};
