import { db } from "@/lib/db";
import { isEmailBlacklisted } from "@/lib/isEmailBlackListed";
import { RegisterFormProps } from "@/types/type";
import { hashSync } from "bcrypt-ts";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: RegisterFormProps = await req.json();
  const { email, password, phone, image, name } = data;
  try {
    const validateEmail = isEmailBlacklisted(email);
    if (validateEmail) {
      console.log("Use a valid email");
      return NextResponse.json(
        {
          error: "Use a valid email",
          data: null,
        },
        { status: 409 }
      );
    }
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already exists",
          data: null,
        },
        { status: 409 }
      );
    }
    const hashedPassword = hashSync(password, 10);
    const newUser = await db.user.create({
      data: { email, password: hashedPassword, phone, image, name },
    });
    const { password: userPassword, ...others } = newUser;
    return NextResponse.json(
      {
        message: "created",
        data: others,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "failed",
      },
      { status: 500 }
    );
  }
}
