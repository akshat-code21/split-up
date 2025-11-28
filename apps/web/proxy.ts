import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/(auth)/auth";
import { Session } from "next-auth";

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	let isAuthenticated = false;
	let session: Session | null = null;
	try {
		session = await auth();
		isAuthenticated = !!session?.user;
	} catch (error) {
		console.log(error);
	}

	if ((pathname.startsWith("/dashboard") || pathname.startsWith("/invite")) && !isAuthenticated) {
		const loginUrl = new URL("/login", request.url);
		const fullPath = pathname + request.nextUrl.search;
		loginUrl.searchParams.set("callbackUrl", fullPath);
		return NextResponse.redirect(loginUrl);
	}

	if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
		const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
		const redirectUrl = callbackUrl || "/dashboard";
		return NextResponse.redirect(new URL(redirectUrl, request.url));
	}

	const headers = new Headers(request.headers);
	headers.set("x-current-path", pathname);

	if (isAuthenticated && session?.user && (pathname.startsWith("/dashboard") || pathname.startsWith("/invite"))) {
		headers.set("x-user-id", session.user.id || "");
		headers.set("x-user-name", session.user.name || "");
		headers.set("x-user-email", session.user.email || "");
		headers.set("x-user-image", session.user.image || "");
	}

	return NextResponse.next({ headers });
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
