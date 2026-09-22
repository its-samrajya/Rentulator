import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { BodyPointerEventsFix } from "./_components/BodyPointerEventsFix";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rentulator",
    default: "Rentulator",
  },
  description:
    "Manage tenants, rooms, electric bills, and invoices for rental properties with Rentulator",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={robotoMono.className}>
          <BodyPointerEventsFix />
          {children}
          <ToastContainer />
        </body>
      </html>
    </SessionProvider>
  );
}
