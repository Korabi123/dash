import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = await auth();
    const accountId = searchParams.get("accountId");
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!accountId) {
      return new NextResponse("Missing accountId", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const account = await prismadb.account.update({
      where: {
        id: accountId,
        userId,
      },
      data: {
        name,
      },
    });

    if (!account) {
      return new NextResponse("Account not found", { status: 404 });
    }

    return NextResponse.json(account, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("Error updating account", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
