import type { Metadata } from "next";
import Dashboard from "./(dashboard)/page";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function AdminPage() {
  return <Dashboard />;
}
