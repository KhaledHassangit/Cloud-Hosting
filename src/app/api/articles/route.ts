import { pageSize } from "@/app/constants/enums";
import db  from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/verifyToken";
import { CreatedArticleDto } from "@/app/types/types";
import { articleSchema } from "@/app/validations/validationSchema";
import {Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



export async function GET(request: NextRequest) {
    try {
      const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        const article = await db.article.findMany({
          skip:pageNumber ? (parseInt(pageNumber) - 1) * pageSize : 0,
          take:pageSize,
        });  
        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request)
    if(user === null || user.isAdmin === false){
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    const description = (await request.json()) as CreatedArticleDto;
    const parsedBody = articleSchema.parse(description);
    const newArticle: Article = await db.article.create({
      data: {
        title: parsedBody.title,
        description: parsedBody.description,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
