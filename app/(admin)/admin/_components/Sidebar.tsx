"use client";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const AdminSidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const pathname = usePathname();
  const reducedPath = pathname.split("/").pop();
  const isActive = (path: string) => reducedPath === path;
  const { data: session } = useSession();
  return (
    <aside
      className={cn(
        isSideBarOpen
          ? "w-fit h-screen p-5 bg-teal-100 text-black grid grid-rows-[1fr_auto]"
          : "hidden",
      )}
    >
      <div className="flex flex-col gap-2 ">
        {" "}
        <Link href="/admin" className={cn(isActive("admin") && "border")}>
          Dashboard
        </Link>
        <Link
          href="/admin/tenants"
          className={cn(isActive("tenants") && "border")}
        >
          Tenants
        </Link>
        <Link
          href="/admin/payment"
          className={cn(isActive("payment") && "border")}
        >
          Payments
        </Link>
        <Link
          href="/admin/reports"
          className={cn(isActive("reports") && "border")}
        >
          Reports
        </Link>
      </div>

      <div className="flex gap-2 justify-center items-center mb-2">
        <div>
          <Image
            src={session?.user.image || "/images/profile.webp"}
            width={30}
            height={30}
            alt="admin-image"
            className="rounded-full"
          />
        </div>
        <div>
          <span>{session?.user.name}</span>
        </div>
      </div>

      <div className="flex justify-end">
        <LogOut
          className="scale-x-[-1] cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </aside>
  );
};
