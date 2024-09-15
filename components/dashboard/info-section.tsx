"use client";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import InfoWidget from "./info-widget";
import { BigInfoChart } from "./big-info-chart";
import { SmallInfoChart } from "./small-info-chart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDays, format } from "date-fns";

import * as React from "react";
import { Transaction } from "@prisma/client";

interface InfoSectionProps {
  transactions: Transaction[];
  previousPeriodTransactions?: Transaction[];
}

export const InfoSection = ({
  transactions,
  previousPeriodTransactions,
}: InfoSectionProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const currentDayOfMonth = new Date().getDate();
  const dateFromParams = searchParams.get("date");
  const fromDate = dateFromParams
    ? new Date(dateFromParams.split(" - ")[0])
    : undefined;
  const toDate = dateFromParams
    ? new Date(dateFromParams.split(" - ")[1])
    : undefined;

  if (!fromDate || !toDate) {
    const from = new Date(
      currentYear,
      currentMonthIndex - 1,
      currentDayOfMonth
    );
    const to = addDays(
      new Date(currentYear, currentMonthIndex, currentDayOfMonth),
      0
    );

    window.location.href = `${pathname}?${createQueryString(
      "date",
      `${from.toISOString()} - ${to.toISOString()}`
    )}`;
  }

  let totalCurrentIncome = 0;
  let totalCurrentExpenses = 0;

  const calculateCurrentIncome = (transactions: Transaction[]) => {
    transactions.forEach((transaction) => {
      const isIncome = transaction.amount > 0;

      if (isIncome) {
        totalCurrentIncome += transaction.amount;
      }
    });
  }

  const calculateCurrentExpenses = (transactions: Transaction[]) => {
    transactions.forEach((transaction) => {
      const isExpense = transaction.amount < 0;

      if (isExpense) {
        totalCurrentExpenses += transaction.amount;
      }
    });
  };

  calculateCurrentIncome(transactions);
  calculateCurrentExpenses(transactions);

  const totalCurrentBalance = totalCurrentIncome - (totalCurrentExpenses * -1);

  // Comment out for testing
  if (previousPeriodTransactions?.length === 0 || !previousPeriodTransactions) {
    return (
      <div className="flex flex-col gap-16 md:gap-10 md:mt-[10vh] mt-10">
        <div id="row-1" className="flex w-full md:flex-row flex-col gap-4">
          <InfoWidget
            type="remaining"
            footerInfo="No transactions from last period"
            // @ts-ignore
            dateRange={`${format(fromDate, "LLL dd")} - ${format(
              // @ts-ignore
              toDate,
              "LLL dd"
            )}`}
            // @ts-ignore
            year={format(toDate, "yyyy")}
            value={totalCurrentBalance}
            icon={
              <svg
                className="fill-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M400 96l0 .7c-5.3-.4-10.6-.7-16-.7L256 96c-16.5 0-32.5 2.1-47.8 6c-.1-2-.2-4-.2-6c0-53 43-96 96-96s96 43 96 96zm-16 32c3.5 0 7 .1 10.4 .3c4.2 .3 8.4 .7 12.6 1.3C424.6 109.1 450.8 96 480 96l11.5 0c10.4 0 18 9.8 15.5 19.9l-13.8 55.2c15.8 14.8 28.7 32.8 37.5 52.9l13.3 0c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32l-32 0c-9.1 12.1-19.9 22.9-32 32l0 64c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-128 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-64c-34.9-26.2-58.7-66.3-63.2-112L68 304c-37.6 0-68-30.4-68-68s30.4-68 68-68l4 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-4 0c-11 0-20 9-20 20s9 20 20 20l31.2 0c12.1-59.8 57.7-107.5 116.3-122.8c12.9-3.4 26.5-5.2 40.5-5.2l128 0zm64 136a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z" />
              </svg>
            }
            neutral
          />
          <InfoWidget
            type="income"
            icon={<TrendingUpIcon className="stroke-green-500" />}
            // @ts-ignore
            dateRange={`${format(fromDate, "LLL dd")} - ${format(
              // @ts-ignore
              toDate,
              "LLL dd"
            )}`}
            // @ts-ignore
            year={format(toDate, "yyyy")}
            value={totalCurrentIncome}
            footerInfo="No transactions from last period"
            neutral
          />
          <InfoWidget
            type="expenses"
            footerInfo="No transactions from last period"
            // @ts-ignore
            dateRange={`${format(fromDate, "LLL dd")} - ${format(
              // @ts-ignore
              toDate,
              "LLL dd"
            )}`}
            // @ts-ignore
            year={format(toDate, "yyyy")}
            value={totalCurrentExpenses * -1}
            icon={<TrendingDownIcon className="stroke-red-500" />}
            neutral
          />
        </div>
        {/* Charts Are Disabled for now */}
        {/* <div className="flex w-full md:flex-row flex-col gap-4">
          <BigInfoChart transactions={transactions} />
          <SmallInfoChart transactions={transactions} />
        </div> */}
      </div>
    );
  }

  // Uncomment out for testing
  // // ! Test values for current period
  // const totalTestIncome = 5478.23;
  // const totalTestExpenses = 954;
  // const totalTestBalance = totalTestIncome - totalTestExpenses;

  // // !Test values for previous period
  // const totalPreviousIncome = 4227.23;
  // const totalPreviousExpenses = 1000.27;
  // const totalPreviousBalance = totalPreviousIncome - totalPreviousExpenses;

  // // ! Calculate percentages
  // const perviousIncomePercentage = (totalTestIncome - totalPreviousIncome) / totalTestIncome * 100;
  // const previousExpensePercentage = (totalTestExpenses - totalPreviousExpenses) / totalTestExpenses * 100;
  // const previousBalancePercentage = (totalTestBalance / totalPreviousBalance) / totalTestBalance * 100;

  // ! Calculate totals
  let totalPreviousIncome = 0;
  let totalPreviousExpenses = 0;

  const calculatePreviousIncome = (transactions: Transaction[]) => {
    transactions.forEach((transaction) => {
      const isIncome = transaction.amount > 0;

      if (isIncome) {
        totalPreviousIncome += transaction.amount;
      }
    });
  }

  const calculatePreviousExpenses = (transactions: Transaction[]) => {
    transactions.forEach((transaction) => {
      const isExpense = transaction.amount < 0;

      if (isExpense) {
        totalPreviousExpenses += transaction.amount;
      }
    });
  };

  calculatePreviousIncome(previousPeriodTransactions);
  calculatePreviousExpenses(previousPeriodTransactions);

  const totalPreviousBalance = totalPreviousIncome - (totalPreviousExpenses * -1);

  // ! Calculate percentages
  let perviousIncomePercentage =
    ((totalCurrentIncome - totalPreviousIncome) / totalCurrentIncome) * 100;
  let previousExpensePercentage =
    (((totalCurrentExpenses * -1) - (totalPreviousExpenses * -1)) / (totalCurrentExpenses * -1)) * 100;
    100;
  let previousBalancePercentage =
    ((totalCurrentBalance - totalPreviousBalance) / totalCurrentBalance) * 100;

  const isPreviousIncomePercentageNaN = isNaN(parseFloat(perviousIncomePercentage.toFixed(2)));
  const isPreviousExpensePercentageNaN = isNaN(parseFloat(previousExpensePercentage.toFixed(2)));
  const isPreviousBalancePercentageNaN = isNaN(parseFloat(previousBalancePercentage.toFixed(2)));

  if (isPreviousIncomePercentageNaN) {
    perviousIncomePercentage = 0;
  }
  if (isPreviousExpensePercentageNaN) {
    previousExpensePercentage = 0;
  }
  if (isPreviousBalancePercentageNaN) {
    previousBalancePercentage = 0;
  }

  return (
    <div className="flex flex-col gap-16 md:gap-10 md:mt-[10vh] mt-10">
      <div id="row-1" className="flex w-full md:flex-row flex-col gap-4">
        <InfoWidget
          type="remaining"
          footerInfo={`${previousBalancePercentage > 0 ? "+" : ""}${previousBalancePercentage.toFixed(
            2
          )}% from last period`}
          // @ts-ignore
          dateRange={`${format(fromDate, "LLL dd")} - ${format(
            // @ts-ignore
            toDate,
            "LLL dd"
          )}`}
          // @ts-ignore
          year={format(toDate, "yyyy")}
          value={totalCurrentBalance}
          icon={
            <svg
              className="fill-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M400 96l0 .7c-5.3-.4-10.6-.7-16-.7L256 96c-16.5 0-32.5 2.1-47.8 6c-.1-2-.2-4-.2-6c0-53 43-96 96-96s96 43 96 96zm-16 32c3.5 0 7 .1 10.4 .3c4.2 .3 8.4 .7 12.6 1.3C424.6 109.1 450.8 96 480 96l11.5 0c10.4 0 18 9.8 15.5 19.9l-13.8 55.2c15.8 14.8 28.7 32.8 37.5 52.9l13.3 0c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32l-32 0c-9.1 12.1-19.9 22.9-32 32l0 64c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-128 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-64c-34.9-26.2-58.7-66.3-63.2-112L68 304c-37.6 0-68-30.4-68-68s30.4-68 68-68l4 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-4 0c-11 0-20 9-20 20s9 20 20 20l31.2 0c12.1-59.8 57.7-107.5 116.3-122.8c12.9-3.4 26.5-5.2 40.5-5.2l128 0zm64 136a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z" />
            </svg>
          }
          isGood={previousBalancePercentage >= 0 ? true : false}
        />
        <InfoWidget
          type="income"
          icon={<TrendingUpIcon className="stroke-green-500" />}
          // @ts-ignore
          dateRange={`${format(fromDate, "LLL dd")} - ${format(
            // @ts-ignore
            toDate,
            "LLL dd"
          )}`}
          // @ts-ignore
          year={format(toDate, "yyyy")}
          value={totalCurrentIncome}
          footerInfo={`${perviousIncomePercentage > 0 ? "+" : ""}${perviousIncomePercentage.toFixed(
            2
          )}% from last period`}
          isGood={perviousIncomePercentage >= 0 ? true : false}
        />
        <InfoWidget
          type="expenses"
          footerInfo={`${previousExpensePercentage > 0 ? "+" : ""}${previousExpensePercentage.toFixed(
            2
          )}% from last period`}
          // @ts-ignore
          dateRange={`${format(fromDate, "LLL dd")} - ${format(
            // @ts-ignore
            toDate,
            "LLL dd"
          )}`}
          // @ts-ignore
          year={format(toDate, "yyyy")}
          value={totalCurrentExpenses * -1}
          icon={<TrendingDownIcon className="stroke-red-500" />}
          isGood={previousExpensePercentage >= 0 ? false : true}
        />
      </div>
      {/* Charts are disabled for now */}
      {/* <div className="flex w-full md:flex-row flex-col gap-4">
        <BigInfoChart transactions={transactions} />
        <SmallInfoChart transactions={transactions} />
      </div> */}
    </div>
  );
};
