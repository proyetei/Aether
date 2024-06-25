import Edit from "@/components/Edit";
import { FC } from "react";
import { Metadata } from "next";
import { db } from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

interface pageProps{
    params: {
      postId: string
    }
}

export const metadata: Metadata = {
  title: "Edit Journal",
};
// pass the postId parameters to the page to be able to see the content
const page: FC<pageProps> = async ({ params }) => {
  const { postId } = params;
  const currentUser = await getCurrentUser();
  const post = await db.entry.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) {
    return (
      <div>
        Not found!!!
      </div>
    )
  }
  if (!currentUser || post?.userId !== currentUser?.id) {
    redirect("/");}
    return (
      <div>
        <Edit post={post} />
      </div>
    )
  }
  export default page;