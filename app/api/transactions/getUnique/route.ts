import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = await auth();
    const transactionId = searchParams.get("transactionId");

    if (!userId) {
      return new NextResponse(`Invalid userId`, { status: 400 });
    }

    if (!transactionId) {
      return new NextResponse(`Missing transactionId`, { status: 400 });
    }

    const transaction = await prismadb.transaction.findUnique({
      where: {
        id: transactionId,
        userId,
      },
      include: {
        category: true,
        account: true,
      },
    });

    if (!transaction) {
      return new NextResponse(`Transaction not found`, { status: 404 });
    }

    return NextResponse.json(transaction, { status: 200, statusText: "OK" });
  } catch (error) {
    // @ts-ignore
    console.log(`Error Getting Unique Transaction: ${error.message}`);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}
