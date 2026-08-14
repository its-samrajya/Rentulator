"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  FileText,
  LogOut,
  Calculator,
  IndianRupee,
  PersonStanding,
  BedSingle,
  Gauge,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

// Menu configuration - easy to extend
const MENU_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/tenants", label: "Tenants", icon: PersonStanding },
  { href: "/admin/invoice", label: "Invoice", icon: FileText },
  { href: "/admin/payment", label: "Payment", icon: IndianRupee },
  { href: "/admin/rooms", label: "Rooms", icon: BedSingle },
  { href: "/admin/meters", label: "Meters", icon: Gauge },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const reducedPath = pathname.split("/")[2] ?? "";
  const { data: session } = useSession();
  const isActive = (path: string) => reducedPath === path;

  return (
    <Sidebar collapsible="icon" className="pl-1">
      <SidebarHeader className="mb-3">
        <div className="flex items-center ">
          <Calculator size={17} color="red" />
          <span className="group-data-[state=collapsed]:hidden w-full text-center">
            Rentulator
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="w-full">
        <SidebarMenu>
          {MENU_ITEMS.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(href === "/admin" ? "" : href.split("/")[2])}
                tooltip={label}
              >
                <Link href={href}>
                  <Icon />
                  <span className="text-md">{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 overflow-hidden">
          <Image
            src={session?.user?.image || "/images/profile.webp"}
            alt="admin-image"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="truncate">{session?.user?.name}</span>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut()} tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
