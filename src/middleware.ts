import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (url.pathname === "/sign-in" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (url.pathname === "/dashboard" || url.pathname.startsWith("/dashboard/")) {
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/sign-in',
  ],
}