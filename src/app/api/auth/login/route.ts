import db from "@/app/lib/prisma";
import { JWTPayload, SignIn } from "@/app/types/types";
import { LoginSchema } from "@/app/validations/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/app/lib/generatejwt";


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
        // Generate Token
        const jwtPayload:JWTPayload = {
            id: user.id, 
            username: user.username,
            isAdmin: user.isAdmin
        };
        const token = generateJWT(jwtPayload)
        return NextResponse.json({ message: 'User logged in successfully', ...user, token }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}