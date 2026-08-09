"use client";

import { claimTenantAccount } from "@/actions/claim";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

interface Props {
  token: string;
  session: boolean;
}
export const ClaimButton = ({ token, session }: Props) => {
  const [state, formAction, isPending] = useActionState(
    claimTenantAccount.bind(null, token),
    null,
  );
  return (
    <form className="flex flex-col" action={formAction}>
      <Button type="submit" disabled={isPending}>
        {isPending
          ? "Please wait..."
          : session
            ? "Continue"
            : "Sign in with Google"}
      </Button>
      {state && !state.success && (
        <p className="text-red-500 text-sm mt-2">{state.message}</p>
      )}
    </form>
  );
};
