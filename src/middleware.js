import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const authPath=path==='/auth'||''
  const protectPath=path==='/';
  const token = request.cookies.get("token")?.value || "";
  if (authPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (protectPath && !token) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
}

export const config = {
    matcher: [
      "/",
      "/auth"
    ],
  };