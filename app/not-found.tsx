"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="underline">
        Go back home
      </Link>
    </div>
  );
}
