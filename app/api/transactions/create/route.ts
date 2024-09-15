import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST (req: Request) {
  try {
    const body = await req.json();
    const { userId } = await auth();
    const { date, categoryName, accountName, payee, amount } = body;

    if (!userId) {
      return new NextResponse(`Invalid userId`, { status: 400 });
    }

    if (!date) {
      return new NextResponse(`Missing date`, { status: 400 });
    }

    if (!categoryName) {
      return new NextResponse(`Missing categoryName`, { status: 400 });
    }

    if (!accountName) {
      return new NextResponse(`Missing accountName`, { status: 400 });
    }

    if (!payee) {
      return new NextResponse(`Missing payee`, { status: 400 });
    }

    if (!amount) {
      return new NextResponse(`Missing amount`, { status: 400 });
    }

    const categoryByName = await prismadb.category.findFirst({
      where: {
        name: categoryName,
        userId,
      },
    });

    if (!categoryByName) {
      return new NextResponse(`Category not found`, { status: 404 });
    }

    const accountByName = await prismadb.account.findFirst({
      where: {
        name: accountName,
        userId,
      },
    });

    if (!accountByName) {
      return new NextResponse(`Account not found`, { status: 404 });
    }

    const transaction = await prismadb.transaction.create({
      data: {
        userId,
        createdAt: date,
        category: {
          connect: {
            id: categoryByName?.id,
          },
        },
        account: {
          connect: {
            id: accountByName?.id,
          },
        },
        payee,
        amount,
      },
    });

    if (!transaction) {
      return new NextResponse(`Something went wrong`, { status: 500 });
    }

    return NextResponse.json(transaction, { status: 200, statusText: "OK" });
  } catch (error) {
    // @ts-ignore
    console.log(`Error Creating Transaction: ${error.message}`);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
};
