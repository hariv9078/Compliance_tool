import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;

  // If no token and trying to access a protected page, redirect to sign-in
  if (!authToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If logged in and trying to access sign-in, redirect to dashboard
  if (authToken && req.nextUrl.pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to relevant pages
export const config = {
  matcher: ["/dashboard/:path*", "/sign-in"],
};
