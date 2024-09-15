import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = await auth();
    const categoryId = searchParams.get("categoryId");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("Missing categoryId", { status: 400 });
    }

    const category = await prismadb.category.delete({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    return NextResponse.json(category, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("Error deleting category", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
