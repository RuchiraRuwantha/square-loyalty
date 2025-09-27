import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const accountId = req.cookies.get("account_id");

    // Paths that require login
    const protectedRoutes = ["/dashboard", "/earn", "/redeem"];

    if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
        if (!accountId) {
            const loginUrl = new URL("/", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}
