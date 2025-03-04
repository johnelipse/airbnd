import { db } from "@/lib/db";
import { QueriesCatResponse } from "@/types/react-types";
import { CategoryProps } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: CategoryProps = await req.json();
  try {
    const createdCategory = await db.category.create({
      data,
    });
    return NextResponse.json(
      {
        message: "Category created successfully",
        data: createdCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse<QueriesCatResponse>> {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        properties: true,
      },
    });
    return NextResponse.json(
      {
        data: categories,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: [], error: "Something went wrong" },
      { status: 500 }
    );
  }
}
