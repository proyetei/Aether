import { auth } from "@clerk/nextjs";
import { db } from "./prismadb";

export const getCurrentUser = async () => {
  // if null, the user is not logged in
  const { userId } = auth(); // return the authentication object of the currently active user

  // query db for user specific info or display assets only to logged in users

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId,
    },
  });

  return user;
};