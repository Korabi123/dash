import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { AccountsTable } from "@/components/dashboard/tables/accounts-table";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { addDays } from "date-fns";
import { redirect } from "next/navigation";

const AccountsPage = async ({
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

  const paramsDateRange = searchParams.date?.toString();

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const currentDayOfMonth = new Date().getDate();

  const from = new Date(currentYear, currentMonthIndex -1, currentDayOfMonth);
  const to = addDays(new Date(currentYear, currentMonthIndex, currentDayOfMonth), 0);

  if (!paramsDateRange) {
    redirect(`/dashboard/accounts?date=${from.toISOString()} - ${to.toISOString()}`);
  }

  const firstMonthFromRange = paramsDateRange
      ? new Date(paramsDateRange.split(" - ")[0])
      : undefined;
    const secondMonthFromRange = paramsDateRange
      ? new Date(paramsDateRange.split(" - ")[1])
      : undefined;

  // @ts-ignore
  const secondMonthFromRangePlusTwoDays = new Date(secondMonthFromRange.getTime() + (2 * 24 * 60 * 60 * 1000));

  const accounts = await prismadb.account.findMany({
    where: {
      userId: currentClerkUser.id,
      createdAt: {
        lt: secondMonthFromRangePlusTwoDays,
        gte: firstMonthFromRange,
      }
    }
  });

  return (
    <div className="ml-4 mb-12">
      <FilterButtons accounts={accounts} />
      <AccountsTable accounts={accounts} />
    </div>
  );
};

export default AccountsPage;
