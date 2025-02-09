import db from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UpdatedArticleDto } from "@/app/types/types";
import { Article } from "@prisma/client";
import { verifyToken } from "@/app/lib/verifyToken";

interface Props {
    params : {id : string}
}

export async function GET(request: NextRequest , { params }: Props) {
    try {
        const article = await db.article.findUnique({
                where:{id: parseInt(params.id)},
                include: {
                    comments: {
                        include: {
                            user: {
                                select: {
                                    username: true,
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                }
                })
        if(!article){
            return NextResponse.json({message:"Article not found"}, {status:404});
        }
        return NextResponse.json(article, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}



export async function PUT(request: NextRequest , { params }: Props) {
    try {
            const user = verifyToken(request)
            if(user === null || user.isAdmin === false){
              return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
            }
        
        const article = await db.article.findUnique({
                where:{id: parseInt(params.id)}
            })
        if(!article){
            return NextResponse.json({message:"Article not found"}, {status:404});
        }
        const body = await request.json() as UpdatedArticleDto
        const UpdatedArticle:Article = await db.article.update({
            where:{id:parseInt(params.id)},
            data:{
                title:body.title,
                description:body.description
            }
        })
        return NextResponse.json(UpdatedArticle, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }

}

export async function DELETE(request: NextRequest , { params }: Props) {
    try {
        const user = verifyToken(request)
        if(user === null || user.isAdmin === false){
          return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }
    
        const article = await db.article.findUnique({
                where:{id: parseInt(params.id)}
            })
        if(!article){
            return NextResponse.json({message:"Article not found"}, {status:404});
        }
        await db.article.delete({where:{id:parseInt(params.id)}})
        return NextResponse.json({ message: "Article Deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}



