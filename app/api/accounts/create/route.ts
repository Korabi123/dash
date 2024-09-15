import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
  try {
    const body = await req.json();
    const { userId } = auth();
    const { name } = body;

    if (!userId) {
      return new NextResponse(`Invalid userId`, { status: 400 });
    }

    if (!name) {
      return new NextResponse(`Missing name`, { status: 400 });
    }

    const category = await prismadb.account.create({
      data: {
        name,
        userId,
      },
    });

    if (!category) {
      return new NextResponse(`Something went wrong`, { status: 500 });
    }

    return NextResponse.json(category, { status: 200, statusText: "OK" });
  } catch (error) {
    // @ts-ignore
    console.log(`Error Creating Account: ${error.message}`);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}
