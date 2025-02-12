import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/validations/validationSchema";
import { JWTPayload, SignIn } from "@/types/types";
import { setTokenInCookies } from "@/hooks/generatejwt";
  

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as SignIn;
        const validation = LoginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
        }
        const user = await db.user.findUnique({ where: { email: body.email } });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        // Generate Token and set in cookies
        const jwtPayload:JWTPayload = {
            id: user.id, 
            username: user.username,
            isAdmin: user.isAdmin
        };
        const cookie = setTokenInCookies(jwtPayload);
        return NextResponse.json({ message: 'User logged in successfully', ...user },
             { 
                status: 200, 
                headers:{"Set-Cookie": cookie}
            });
    }
    catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}