import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Unauthorized",
};

export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold">403 — Unauthorized</h1>
      <p className="text-muted-foreground">
        You don&apos;t have permission to view this page.
      </p>
    </div>
  );
}
