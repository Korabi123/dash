import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = auth();
    const categoryId = searchParams.get("categoryId");

    if (!userId) {
      return new NextResponse(`Invalid userId`, { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse(`Missing categoryId`, { status: 400 });
    }

    const categoryWithTransactions = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        transactions: true,
      },
    });

    if (!categoryWithTransactions) {
      return new NextResponse(`Category not found`, { status: 404 });
    }

    return NextResponse.json(categoryWithTransactions, { status: 200, statusText: "OK" });
  } catch (error) {
    // @ts-ignore
    console.log(`Error Getting All Transactions: ${error.message}`);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}
