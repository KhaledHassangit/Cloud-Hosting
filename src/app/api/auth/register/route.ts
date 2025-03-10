import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/validations/validationSchema";
import { JWTPayload, SignUp } from "@/types/types";
import { setTokenInCookies } from "@/hooks/generatejwt";




export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as SignUp
        const validation = SignUpSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
        }
        const user = await db.user.findUnique({ where: { email: body.email } });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const newUser = await db.user.create({
            data:
            {
                username: body.username,
                email: body.email,
                password: hashedPassword
            },
            select: {
                username: true,
                id: true,
                isAdmin: true,
            }
        });
        // Generate Token and set in cookies
        const jwtPayload:JWTPayload = {
            id: newUser.id, 
            username: newUser.username,
            isAdmin: newUser.isAdmin
        };
        const cookie = setTokenInCookies(jwtPayload);
        return NextResponse.json({ ...newUser }, 
            { 
            status: 201, 
            headers:{"Set-Cookie": cookie}
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
}
