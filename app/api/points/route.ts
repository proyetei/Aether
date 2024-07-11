
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

  if (!userId) {
    return redirect("/");
  }
    const result = await db.user.findMany({
      where:{userId: currentUser?.id},
    });

    return NextResponse.json( result );
  } catch (error: any) {
    console.log("Error with GET API endpoint", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: Request) {
    try {
      const user = await initializeUser();
      const { userId } = auth();
      if (!userId || !user) {
        return redirect("/");
      }
      const returnUserPoints = await db.user.update({
        where: { userId },
        data: {
          userPoints: user.userPoints + 3
        }
      });
  
      return NextResponse.json( {returnUserPoints} );
    } catch (error: any) {
      console.log("Error with POST API endpoint ", error);
  
      return new NextResponse("Internal Error", { status: 500 });
    }
}