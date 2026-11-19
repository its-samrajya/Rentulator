import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ClientSidebar } from "./_components/ClientSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { formatNepaliDate } from "@/utils/nepaliDate";
import { LiveTime } from "./_components/LiveTime";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Rentulator",
		default: "Rentulator - Rental Property Management",
	},
	description:
		"Manage tenants, rooms, electric bills, and invoices for rental properties with Rentulator",
};

const fontStyles = `
  :root {
    --font-geist-sans: ${geistSans.style.fontFamily};
    --font-geist-mono: ${geistMono.style.fontFamily};
  }
  :root body {
    font-family: var(--font-geist-sans);
  }
`;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans antialiased`}
				>
					<style>{fontStyles}</style>
					<TooltipProvider>
						<SidebarProvider className="flex-row bg-muted/30 font-sans">
							<ClientSidebar />
							<main className="relative flex min-w-0 flex-1 flex-col bg-muted/30 font-sans">
								<header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border/70 bg-background/80 px-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sm:px-4 lg:h-16 lg:px-8">
									<SidebarTrigger className="size-11 shrink-0 cursor-pointer rounded-xl text-muted-foreground hover:text-foreground md:size-9" />
									<Separator orientation="vertical" className="h-5" />
									<div className="flex min-w-0 items-center gap-2">
										<span className="truncate text-sm font-semibold tracking-tight">
											{formatNepaliDate(new Date(), "DD MMMM, YYYY")}
											{" · "}
											<LiveTime />
										</span>
									</div>
								</header>
								<div className="min-w-0 flex-1">{children}</div>
							</main>
						</SidebarProvider>
					</TooltipProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
