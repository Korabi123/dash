"use client";

import {
  Area,
  AreaChart as AreaChartRecharts,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Transaction } from "@prisma/client";

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface AreaChartProps {
  transactions: Transaction[];
}

export function AreaChart({ transactions }: AreaChartProps) {
  const [date, setDate] = React.useState("");
  const [chartData, setChartData] = React.useState([{}]);

  React.useEffect(() => {
    const uniqueTransactions: any = [];
    const tempSet = new Set();

    // const transactions = [
    //   {
    //     createdAt: "Jul 31, 2024",
    //     amount: 186,
    //   },
    //   {
    //     createdAt: "Jul 31, 2024",
    //     amount: -399,
    //   },
    //   {
    //     createdAt: "Aug 6, 2024",
    //     amount: 543,
    //   },
    //   {
    //     createdAt: "Aug 6, 2024",
    //     amount: -120,
    //   },
    //   {
    //     createdAt: "Aug 13, 2024",
    //     amount: -73,
    //   },
    //   {
    //     createdAt: "Aug 13, 2024",
    //     amount: 880,
    //   },
    //   {
    //     createdAt: "Aug 23, 2024",
    //     amount: 209,
    //   },
    //   {
    //     createdAt: "Aug 23, 2024",
    //     amount: -130,
    //   },
    //   {
    //     createdAt: "Aug 30, 2024",
    //     amount: 214,
    //   },
    //   {
    //     createdAt: "Aug 30, 2024",
    //     amount: -140,
    //   },
    //   {
    //     createdAt: "Sep 6, 2024",
    //     amount: 543,
    //   },
    //   {
    //     createdAt: "Sep 6, 2024",
    //     amount: -73,
    //   }
    // ];

    const tempArrOfObjsFunc = () => {
      if (transactions.length > 0) {
        for (let index = 0; index < transactions.length; index++) {
          const sameDateTransactions = transactions.filter((transaction) => {
            return transaction.createdAt === transactions[index].createdAt;
          });

          let income = 0;
          let expenses = 0;
          const date = transactions[index].createdAt
            .toDateString()
            .split(", ")[0];

          for (let i = 0; i < sameDateTransactions.length; i++) {
            if (sameDateTransactions[i].amount > 0) {
              income += sameDateTransactions[i].amount;
            } else {
              expenses += sameDateTransactions[i].amount * -1;
            }
          }

          const transactionObj = { date, income, expenses };

          const transactionString = JSON.stringify(transactionObj);
          if (!tempSet.has(transactionString)) {
            tempSet.add(transactionString);
            uniqueTransactions.push(transactionObj);
            setChartData(uniqueTransactions);
          }
        }
      } else {
        return null;
      }
    };
    tempArrOfObjsFunc();
  }, [transactions]);

  // const transactions = [
  //   {
  //     createdAt: "Jul 31, 2024",
  //     amount: 186,
  //   },
  //   {
  //     createdAt: "Jul 31, 2024",
  //     amount: -399,
  //   },
  //   {
  //     createdAt: "Aug 6, 2024",
  //     amount: 543,
  //   },
  //   {
  //     createdAt: "Aug 6, 2024",
  //     amount: -120,
  //   },
  //   {
  //     createdAt: "Aug 13, 2024",
  //     amount: -73,
  //   },
  //   {
  //     createdAt: "Aug 13, 2024",
  //     amount: 880,
  //   },
  //   {
  //     createdAt: "Aug 23, 2024",
  //     amount: 209,
  //   },
  //   {
  //     createdAt: "Aug 23, 2024",
  //     amount: -130,
  //   },
  // ];

  return (
    <ChartContainer config={chartConfig}>
      <AreaChartRecharts
        accessibilityLayer
        data={[
          { date: "NaN", income: 0, expenses: 0 },
          { date: "NaN", income: 0, expenses: 0 },
          { date: "NaN", income: 0, expenses: 0 },
          { date: "NaN", income: 0, expenses: 0 },
          { date: "NaN", income: 0, expenses: 0 },
          { date: "NaN", income: 0, expenses: 0 },
          { date: "NaN", income: 0, expenses: 0 },
          { date: "NaN", income: 0, expenses: 0 },
        ]}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              hideLabel
              showDate
              date={date}
              className="w-[180px]"
              formatter={(value, name, item, index) => {
                return (
                  <>
                    <div
                      className="h-4.5 w-1 shrink-0 rounded-[2px] bg-[--color-bg]"
                      style={
                        {
                          "--color-bg": `var(--color-${name})`,
                        } as React.CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      <span className="text-xs font-normal text-muted-foreground">
                        $
                      </span>
                      {value}
                      {(() => {
                        setDate(item.payload.date);
                        return null;
                      })()}
                    </div>
                  </>
                );
              }}
            />
          }
        />
        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-income)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-income)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-expenses)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-expenses)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="expenses"
          type="natural"
          fill="url(#fillMobile)"
          fillOpacity={0.4}
          stroke="var(--color-expenses)"
          strokeWidth={2}
          stackId="a"
        />
        <Area
          dataKey="income"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-income)"
          strokeWidth={2}
          stackId="b"
        />
      </AreaChartRecharts>
    </ChartContainer>
  );
}
