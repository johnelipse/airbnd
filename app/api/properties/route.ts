import { FormValues } from "@/components/back/property-form";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: FormValues = await req.json();
  try {
    const createdProperty = await db.property.create({
      data,
    });
    return NextResponse.json(
      {
        message: "Success",
        data: createdProperty,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const properties = await db.property.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Category: true,
      },
    });
    return NextResponse.json(
      {
        message: "Success",
        data: properties,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}
