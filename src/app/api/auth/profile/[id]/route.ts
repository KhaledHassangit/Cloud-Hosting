import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/prisma";
import { verifyToken } from "@/app/lib/verifyToken";


interface Props {
    params: { id: string }
}


export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = await db.user.findUnique({ where: { id: Number(params.id) } });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const userAuthenticated = verifyToken(request);
        if (userAuthenticated !== null   && userAuthenticated.id === user.id) {
            await db.user.delete({ where: { id: Number(params.id) } });
            return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
        }

        return NextResponse.json({ message: "forrbidden" }, { status: 403 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Invalid request" }, { status: 500 });
    }
}

