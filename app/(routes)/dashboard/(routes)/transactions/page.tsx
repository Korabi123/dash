import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { TransactionsTable } from "@/components/dashboard/tables/transactions-table";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

const TransactionsPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string },
  searchParams: { [key: string]: string | string[] | undefined },
}) => {
  const currentClerkUser = await currentUser();

  if (!currentClerkUser) {
    return null;
  }

  const accounts = await prismadb.account.findMany({
    where: {
      userId: currentClerkUser.id,
    }
  });

  const paramsDateRange = searchParams.date?.toString();
    const firstMonthFromRange = paramsDateRange
      ? new Date(paramsDateRange.split(" - ")[0])
      : undefined;
    const secondMonthFromRange = paramsDateRange
      ? new Date(paramsDateRange.split(" - ")[1])
      : undefined;

  // @ts-ignore
  const secondMonthFromRangePlusTwoDays = new Date(secondMonthFromRange.getTime() + (2 * 24 * 60 * 60 * 1000));

  const transactions = await prismadb.transaction.findMany({
    where: {
      userId: currentClerkUser.id,
      createdAt: {
        lt: secondMonthFromRangePlusTwoDays,
        gte: firstMonthFromRange,
      }
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      account: true,
    }
  });

  console.log(firstMonthFromRange, secondMonthFromRange);

  return (
    <div className="ml-4 mb-12">
      <FilterButtons accounts={accounts} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
