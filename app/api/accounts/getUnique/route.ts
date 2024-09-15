import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = await auth();
    const accountId = searchParams.get("accountId");

    if (!userId) {
      return new NextResponse("Invalid userId", { status: 400 });
    }

    if (!accountId) {
      return new NextResponse("Missing accountId", { status: 400 });
    }

    const account = await prismadb.account.findUnique({
      where: {
        id: accountId,
        userId,
      },
      include: {
        transactions: true,
      }
    });

    if (!account) {
      return new NextResponse("Account not found", { status: 404 });
    }

    return NextResponse.json(account, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("Error getting unique account", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
