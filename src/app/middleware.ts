import {NextResponse , NextRequest } from "next/server";


export function middleware(request: NextRequest) {
    const token = request.headers.get("Authorization") as string; 
    if(!token){
        return NextResponse.redirect("/login");
    }
}




export const config = {
    matcher: ["/api/auth/profile/:path*", "/login", "/register"]
}