import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/verifyToken";
import { UpdateUserDto } from "@/app/types/types";
import { updateUserSchema } from "@/app/validations/validationSchema";
import bcrypt from 'bcryptjs';


interface Props {
    params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = await db.user.findUnique({ 
            where: { id: Number(params.id) },
            include:{comments:true}
        });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const userAuthenticated = verifyToken(request);
        if (userAuthenticated !== null   && userAuthenticated.id === user.id) {
            // Delete User
            await db.user.delete({ where: { id: Number(params.id) } });
            // Delete Comments for Deleted  User
            const commentsId:number[] = user?.comments.map(comment => comment.id)
            await db.comment.deleteMany({where:{id:{in:commentsId}}})
            return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "forrbidden" }, { status: 403 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}



export async function GET(request: NextRequest, { params }: Props) {
    try {
      const user = await db.user.findUnique({
          where:{ id: parseInt(params.id) },
          select: {
              id: true,
              email: true,
              username: true,
              createAt: true,
              isAdmin: true,
          }
      });
  
      if(!user) {
          return NextResponse.json({ message: 'user not found' }, { status: 404 });
      }
  
      const userFromToken = verifyToken(request);
      if(userFromToken === null || userFromToken.id !== user.id){
          return NextResponse.json(
              { message: 'you are not allowed, access denied' },
              { status: 403 }
          )
      }
  
      return NextResponse.json(user, { status: 200 });
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json(
          { message: 'internal server error' },
          { status: 500 }
      )
    }
  }
export async function PUT(request: NextRequest, { params } : Props) {
    try {
        const user = await db.user.findUnique({ where: { id: parseInt(params.id) }});
        if(!user) {
            return NextResponse.json({ message: 'user not found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id) {
            return NextResponse.json(
                { message: 'you are not allowed, access denied' },
                { status: 403 }
            )
        }

        const body = await request.json() as UpdateUserDto;
        const validation = updateUserSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        if(body.password) {
           const salt = await bcrypt.genSalt(10);
           body.password = await bcrypt.hash(body.password, salt); 
        }
        const updatedUser = await db.user.update({
            where: { id: parseInt(params.id) },
            data: {
                username: body.username,
                email: body.email,
                password: body.password
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...other } = updatedUser;
        return NextResponse.json(other, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}