import jwt from "jsonwebtoken";
import { JWTPayload } from "../types/types";

// Generate Token
export function generateJWT(jwtPayload:JWTPayload): string{
    const privateKey = process.env.JWT_SECRET as string;
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign(jwtPayload, privateKey,{ expiresIn: "30d" });
    return token;
}