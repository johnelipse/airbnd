"use server";
import { jwtVerify, SignJWT } from "jose";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
export type SessionPayload = {
  userId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  expiresAt: Date;
};

const secretekey = process.env.SESSION_SECRETE;

const encodedkey = new TextEncoder().encode(secretekey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(encodedkey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedkey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error);
  }
}

export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const payLoadData = {
    userId: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    expiresAt: expiresAt,
  };
  const session = await encrypt(payLoadData);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const payload = await decrypt(session);
  if (!session || !payload) {
    return null;
  }
  const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
