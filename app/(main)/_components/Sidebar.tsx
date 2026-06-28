"use client";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { LogOut, PanelLeftClose, PanelRightClose } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const MainSidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const pathname = usePathname();
  const reducedPath = pathname.split("/").pop();
  const isActive = (path: string) => reducedPath === path;
  const { data: session } = useSession();
  return (
    <aside
      className={cn(
        isSideBarOpen
          ? "w-fit h-full p-5 bg-white border-r text-black grid grid-rows-[1fr_auto]"
          : "w-12",
      )}
    >
      {isSideBarOpen ? (
        <>
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-between gap-6">
              <p className="text-sm">Rentulator</p>
              <PanelLeftClose
                className="cursor-pointer"
                onClick={() => setIsSideBarOpen(false)}
              />{" "}
            </div>
            <Link href="/" className={cn(isActive("") && "border")}>
              Home
            </Link>
            <Link
              href="/payments"
              className={cn(isActive("payments") && "border")}
            >
              Payments
            </Link>
            <Link
              href="/invoices"
              className={cn(isActive("invoices") && "border")}
            >
              Invoices
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
        </>
      ) : (
        <PanelRightClose
          onClick={() => setIsSideBarOpen(true)}
          className="cursor-pointer"
        />
      )}
    </aside>
  );
};
