"use client";
import Image from "next/image";
import Link from "next/link";
import { Home, FileText, LogOut, Calculator, IndianRupee } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const MENU_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/payments", label: "Payments", icon: IndianRupee },
  { href: "/invoices", label: "Invoices", icon: FileText },
] as const;

export function ClientSidebar() {
  const pathname = usePathname();
  const reducedPath = pathname.split("/")[1];
  const { data: session } = useSession();
  const isActive = (path: string) => reducedPath === path;
  const { setOpenMobile } = useSidebar();

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
                isActive={isActive(href === "/" ? "" : href.split("/")[1])}
                tooltip={label}
              >
                <Link
                  href={href}
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                >
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
            <SidebarMenuButton
              onClick={() => signOut()}
              tooltip="Logout"
              className="cursor-pointer"
            >
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
