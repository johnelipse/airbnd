import { FormValues } from "@/components/back/property-form";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const property = await db.property.findUnique({
      where: {
        slug,
      },
      include: {
        Category: true,
      },
    });
    return NextResponse.json(
      {
        message: "success",
        data: property,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        messsage: "failed",
        error: "message failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await db.property.delete({
      where: {
        slug,
      },
    });
    return NextResponse.json({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data: FormValues = await req.json();
  try {
    const property = await db.property.update({
      where: {
        slug,
      },
      data,
    });
    return NextResponse.json(
      {
        message: "created",
        data: property,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "failed",
        error: "something wrong",
      },
      { status: 500 }
    );
  }
}
