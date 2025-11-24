import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/(auth)/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let isAuthenticated = false;
  try {
    const session = await auth();
    isAuthenticated = !!session?.user;
  } catch (error) {
    console.log(error);
  }

  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", pathname);
  
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

