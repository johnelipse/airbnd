import { db } from "@/lib/db";
import { SingleCatQueryResponse } from "@/types/react-types";
import { CategoryProps } from "@/types/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse<SingleCatQueryResponse>> {
  const { slug } = await params;
  try {
    const category = await db.category.findUnique({
      where: {
        slug,
      },
      include: {
        properties: true,
      },
    });
    return NextResponse.json(
      {
        data: category,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, error: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    await db.category.delete({
      where: {
        slug,
      },
    });
    return NextResponse.json(
      {
        message: "Category deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data: CategoryProps = await req.json();
  try {
    const updatedCategory = await db.category.update({
      where: {
        slug,
      },
      data,
    });
    return NextResponse.json(
      {
        message: "Category updated successfully",
        data: updatedCategory,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}
