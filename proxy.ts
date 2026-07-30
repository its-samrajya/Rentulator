import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
} from "./routes";

export async function proxy(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (session)
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    return NextResponse.next();
  }

  if (isAdminRoute) {
    if (!session) return NextResponse.redirect(new URL("/login", req.url));
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    return NextResponse.next();
  }

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
