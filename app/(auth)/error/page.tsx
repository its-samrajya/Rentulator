import ErrorCard from "@/components/auth/ErrorCard";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Authentication Error" };

export default function AuthErrorPage() {
  return <ErrorCard />;
}
