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
		<Sidebar
			collapsible="icon"
			className="border-r border-sidebar-border/70 font-sans"
		>
			<SidebarHeader className="px-2 pt-3 pb-2">
				<div className="flex items-center gap-2.5">
					<span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-data-[state=collapsed]:size-8">
						<Calculator className="size-5" strokeWidth={2} />
					</span>
					<div className="min-w-0 group-data-[state=collapsed]:hidden">
						<p className="truncate text-sm font-semibold tracking-tight">
							Rentulator
						</p>
						<p className="truncate text-xs text-muted-foreground">
							Tenant portal
						</p>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent className="px-2">
				<SidebarMenu className="gap-1.5">
					{MENU_ITEMS.map(({ href, label, icon: Icon }) => {
						const active = isActive(href === "/" ? "" : href.split("/")[1]);
						return (
							<SidebarMenuItem key={href}>
								<SidebarMenuButton
									asChild
									isActive={active}
									tooltip={label}
									className="h-11 rounded-xl px-3 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary md:h-10"
								>
									<Link
										href={href}
										aria-current={active ? "page" : undefined}
										onClick={() => {
											setOpenMobile(false);
										}}
									>
										<Icon />
										<span>{label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="gap-3 border-t border-sidebar-border/70 px-2 py-3">
				<div className="flex items-center gap-2.5 overflow-hidden rounded-xl bg-muted/50 p-2 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:bg-transparent group-data-[state=collapsed]:p-0">
					<Image
						src={session?.user?.image || "/images/profile.webp"}
						alt="admin-image"
						width={36}
						height={36}
						className="size-9 shrink-0 rounded-full object-cover ring-1 ring-border group-data-[state=collapsed]:size-8"
					/>
					<span className="truncate text-sm font-medium group-data-[state=collapsed]:hidden">
						{session?.user?.name}
					</span>
				</div>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							onClick={() => signOut()}
							tooltip="Logout"
							className="h-11 cursor-pointer rounded-xl px-3 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive md:h-10"
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
