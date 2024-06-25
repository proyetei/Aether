import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { FormSchema } from '@/lib/formValidation';
import { db } from '@/lib/prismadb';
import { getCurrentUser } from "@/lib/getCurrentUser";


export async function PUT(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const { postId } = params;
    const currentUser = await getCurrentUser();

    if (!postId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { entry } =
      FormSchema.parse(body);

    await db.entry.update({
      where: { id: postId },
      data: {entry},
    });

    return NextResponse.json("Journal Updated Successfully", { status: 200 });
  } catch (error) {
    console.log("Error with PUT API endpoint", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const { postId } = params;
    const post = await db.entry.delete({
      where: { id: postId,} 
      // userId: currentUser?.id, }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("Error with DELETE API endpoint", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

