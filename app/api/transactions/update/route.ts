import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { userId } = await auth();
    const transactionId = searchParams.get("transactionId");
    const body = await req.json();
    const { date, categoryName, accountName, payee, amount } = body;

    if (!userId) {
      return new NextResponse(`Invalid userId`, { status: 400 });
    }

    if (!transactionId) {
      return new NextResponse(`Missing transactionId`, { status: 400 });
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

    const categoryById = await prismadb.category.findFirst({
      where: {
        name: categoryName,
        userId,
      },
    });

    if (!categoryById) {
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

    await prismadb.transaction.update({
      where: {
        id: transactionId,
        userId,
      },
      data: {
        createdAt: date,
        category: {
          connect: {
            id: categoryById?.id,
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

    return new NextResponse("Transaction updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("Error while updating transaction", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
