import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText");
        let articles;
        if (searchText) {
            articles = await db.article.findMany({
                where: {
                    title: {
                        contains:searchText,
                        mode: "insensitive",
                    }
                }
            })
        } else {
            articles = await db.article.findMany({ take: 6 });
        }
        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}
