"use server";
import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { db } from "./db";

export type AuthUser = {
  email: string;
  phone: string;
  name: string;
  image: string;
};

export const getAuthSesssion = cache(async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);
  if (!session) {
    return null;
    // redirect("/login");
  }
  const id = session.userId as string;
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      phone: true,
      image: true,
      email: true,
    },
  });
  return user as AuthUser;
});
