"use client";

import * as React from "react";

import { Bar, BarChart as BarChartRecharts, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
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

interface BarChartProps {
  transactions: Transaction[];
}

export function BarChart({ transactions }: BarChartProps) {
  const [date, setDate] = React.useState("");
  const [chartData, setChartData] = React.useState([{}]);

  React.useEffect(() => {
    const uniqueTransactions: any = [];
    const tempSet = new Set();

    const tempArrOfObjsFunc = () => {
      if (transactions.length > 0) {
        for (let index = 0; index < transactions.length; index++) {
          const sameDateTransactions = transactions.filter((transaction) => {
            return transaction.createdAt === transactions[index].createdAt;
          });

          let income = 0;
          let expenses = 0;
          const date = transactions[index].createdAt.toDateString().split(", ")[0];

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

  if (transactions.length === 0) {
    return (
      <ChartContainer config={chartConfig}>
      <BarChartRecharts accessibilityLayer data={[
        {
          date: "NaN",
          income: 0,
          expenses: 0,
        },

        {
          date: "NaN",
          income: 0,
          expenses: 0,
        },
        {
          date: "NaN",
          income: 0,
          expenses: 0,
        },
        {
          date: "NaN",
          income: 0,
          expenses: 0,
        },
        {
          date: "NaN",
          income: 0,
          expenses: 0,
        },
      ]}>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
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
              }} />
          }
        />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} opacity={0.8} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} opacity={0.8} />
      </BarChartRecharts>
    </ChartContainer>
    );
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChartRecharts accessibilityLayer data={chartData}>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
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
              }} />
          }
        />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} opacity={0.8} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} opacity={0.8} />
      </BarChartRecharts>
    </ChartContainer>
  );
}
