
import { initializeUser } from "@/lib/initializeUser";
import { FormSchema } from '@/lib/formValidation';
import { NextResponse } from "next/server";
import { db } from '@/lib/prismadb';
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs";

export async function GET(req: Request){
  try {
    const currentUser = await getCurrentUser();
    const { userId } = auth();
    if (!userId || !currentUser) {
      return redirect("/");
    }
    return NextResponse.json( currentUser.userPoints );
  } catch (error: any) {
    console.log("Error with GET API endpoint", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { promptAnswered } = await req.json();
    const user = await initializeUser();
    const { userId } = auth();
    if (!userId || !user) {
      return redirect("/");
    }
    let addPoints = 0
    if (promptAnswered){
      addPoints = 2
    }
    const updatedUserPoints = await db.user.update({
      where: { userId },
      data: {
        userPoints: user.userPoints + 3 + addPoints
      }
    });
  
    return NextResponse.json( updatedUserPoints.userPoints );
  } catch (error: any) {
      console.log("Error with POST API endpoint ", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}