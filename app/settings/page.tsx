"use client";
import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export default function settings() {
  // const session = await auth();
  const session = useSession();
  return <div>{JSON.stringify(session)}</div>;
}
