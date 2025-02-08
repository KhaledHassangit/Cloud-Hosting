import {NextResponse , NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value as string;

    if (!token) {
        if (request.nextUrl.pathname.startsWith("/api/auth/profile/")) {
            return NextResponse.json(
                { message: 'Unauthorized Access Denied' },
                { status: 401 } 
            );
        }
    } else {
        if (
            request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/register"
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

}




export const config = {
    matcher: ["/api/auth/profile/:path*", "/login", "/register"]
}