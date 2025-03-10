import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try {
        const totalArticles = await db.article.count()
        return NextResponse.json({totalArticles}, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}
