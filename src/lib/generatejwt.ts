import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { JWTPayload } from "@/types/types";

// Generate Token
export function generateJWT(jwtPayload:JWTPayload): string{
    const privateKey = process.env.JWT_SECRET as string;
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(jwtPayload, privateKey,{ expiresIn: "30d" });
    return token;
}


// Set Token in Cookies

export function setTokenInCookies(jwtPayload:JWTPayload): string{
    const token = generateJWT(jwtPayload)
        const cookie = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        })
        return cookie;
}