import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("Authentication")?.value;
console.log(token,'token')
  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/users", req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith("/users")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*"],
};
