import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import { authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/signup",
    "/error",
    "/reset",
    "/new-password",
    "/unauthorized",
  ],
};
