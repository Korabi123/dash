import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = auth();
    const userIdParam = searchParams.get("userId");
    const firstPartFromRange = searchParams.get("gte");
    const secondPartFromRange = searchParams.get("lte");

    if (userId !== userIdParam) {
      return new NextResponse(`Invalid userId`, { status: 400 });
    }

    if (!userIdParam) {
      return new NextResponse(`Missing userId`, { status: 400 });
    }

    if (!firstPartFromRange || !secondPartFromRange) {
      return new NextResponse(`Missing date range`, { status: 400 });
    }

    const transactions = await prismadb.transaction.findMany({
      where: {
        userId: userIdParam,
        createdAt: {
          lte: secondPartFromRange,
          gte: firstPartFromRange,
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(transactions, { status: 200, statusText: "OK" });
  } catch (error) {
    // @ts-ignore
    console.log(`Error Getting All Transactions: ${error.message}`);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}
