import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
import { LoginFormProps } from "@/types/type";
import { compareSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: LoginFormProps = await req.json();
  const { email, password } = data;
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          error: "Wrong Credentials",
        },
        { status: 403 }
      );
    }
    const isPasswordCorrect = compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          data: null,
          error: "Wrong credentials.",
        },
        { status: 403 }
      );
    }
    await createSession(existingUser);
    const { password: checkedPassword, ...others } = existingUser;
    return NextResponse.json(
      {
        message: "compared",
        data: others,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed",
      },
      { status: 500 }
    );
  }
}
