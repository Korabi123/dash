"use client";

import * as React from "react";

import { Pie, PieChart as PieChartRecharts } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Account, Category, Transaction } from "@prisma/client";
import axios from "axios";
import prismadb from "@/lib/prismadb";
import { CategoryWithTransactions } from "@/types/category-with-transactions";

interface PieChartProps {
  transactions: Transaction[];
}

export function PieChart({ transactions }: PieChartProps) {
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>();
  const [chartData, setChartData] = React.useState([{}]);

  // const staticTransactions = [
  //   {
  //     category: {
  //       name: "rent",
  //       transactions: [
  //         {
  //           category: "rent",
  //           ammount: 543,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "rent",
  //           ammount: -230,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "rent",
  //           ammount: 660,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "rent",
  //           ammount: "130",
  //           createdAt: "Jun 13, 2024",
  //         },
  //       ],
  //     },
  //     ammount: 543,
  //     createdAt: "Jul 31, 2024",
  //   },
  //   {
  //     category: {
  //       name: "utilities",
  //       transactions: [
  //         {
  //           category: "utilities",
  //           ammount: 543,
  //           createdAt: "Jul 31, 2024",
  //         },
  //       ],
  //     },
  //     ammount: -230,
  //     createdAt: "Jul 31, 2024",
  //   },
  //   {
  //     category: {
  //       name: "clothing",
  //       transactions: [
  //         {
  //           category: "clothing",
  //           ammount: 543,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "clothing",
  //           ammount: -230,
  //           createdAt: "Jul 31, 2024",
  //         },
  //       ],
  //     },
  //     ammount: 230,
  //     createdAt: "Jul 31, 2024",
  //   },
  //   {
  //     category: {
  //       name: "other",
  //       transactions: [
  //         {
  //           category: "other",
  //           ammount: 543,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "other",
  //           ammount: -230,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "other",
  //           ammount: 230,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "other",
  //           ammount: 660,
  //           createdAt: "Aug 6, 2024",
  //         },
  //         {
  //           category: "other",
  //           ammount: 130,
  //           createdAt: "Aug 6, 2024",
  //         },
  //         {
  //           category: "other",
  //           ammount: -130,
  //         },
  //       ],
  //     },
  //     ammount: 660,
  //     createdAt: "Aug 6, 2024",
  //   },
  //   {
  //     category: {
  //       name: "food",
  //       transactions: [
  //         {
  //           category: "food",
  //           ammount: 543,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "food",
  //           ammount: -230,
  //           createdAt: "Jul 31, 2024",
  //         },
  //         {
  //           category: "food",
  //           ammount: "130",
  //           createdAt: "Aug 13, 2024",
  //         },
  //         {
  //           category: "food",
  //           ammount: 130,
  //           createdAt: "Aug 13, 2024",
  //         },
  //         {
  //           category: "food",
  //           ammount: "-130",
  //           createdAt: "Sep 6, 2024",
  //         },
  //         {
  //           category: "food",
  //           ammount: 120,
  //           createdAt: "Sep 6, 2024",
  //         },
  //       ],
  //     },
  //     ammount: 130,
  //     createdAt: "Aug 13, 2024",
  //   },
  // ];

  React.useEffect(() => {
    let tempObj = {};
    const categoryData: any = [];

    const tempArrOfObjsFunc = async () => {
      if (transactions.length > 0) {
        const allTransactions = transactions.length;
        const transactionsInCategoryPercentages: {
          category: string;
          percentage: number;
          ammount: number;
        }[] = [];

        for (let index = 0; index < transactions.length; index++) {
          const transactionsInCategory =
            await axios.get<CategoryWithTransactions>(
              `/api/categories/getUnique?categoryId=${transactions[index].categoryId}`
            );

          const transactionsInCategoryAmount =
            transactionsInCategory?.data.transactions.forEach((transaction) => {
              return transaction.amount;
            });

          const transactionsInCategoryPercentage =
            (transactionsInCategoryAmount! / allTransactions) * 100;

          transactionsInCategoryPercentages.push({
            category: transactionsInCategory?.data.name!,
            percentage: transactionsInCategoryPercentage * 0.001,
            ammount: transactionsInCategoryAmount!,
          });
        }

        const sortedCategories = transactionsInCategoryPercentages.sort(
          (a, b) => b.percentage - a.percentage
        );

        const topFiveCategories = sortedCategories.slice(0, 5);

        topFiveCategories.forEach((element) => {
          categoryData.push({
            category: element.category,
            percentage: element.percentage,
            ammount: element.ammount + "$",
            fill: `hsl(var(--chart-${categoryData.length + 1}))`,
          });
        });

        setChartData(categoryData);
      }
    };

    const chartConfigFunc = () => {
      for (let index = 0; index < chartData.length; index++) {
        // @ts-ignore
        const category = chartData[index].category;

        tempObj = {
          ...tempObj,
          [category]: {
            label: category,
            // @ts-ignore
            color: chartData[index].fill,
          },
        };

        setChartConfig(tempObj);
      }
    };

    tempArrOfObjsFunc();
    chartConfigFunc();
  }, [chartData, transactions]);

  if (!chartConfig) {
    return null;
  }

  return (
    <div className="">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square">
        <PieChartRecharts>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                hideLabel
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
                        {value}
                        <span className="text-xs font-normal text-muted-foreground">
                          %
                        </span>
                      </div>
                    </>
                  );
                }}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="percentage"
            nameKey="category"
            innerRadius={"55%"}
            className="mb-4"
          />
        </PieChartRecharts>
      </ChartContainer>
      <div className="flex flex-col gap-1 -mt-4 mx-auto">
        {chartData.map((item) => (
          // @ts-ignore
          <div key={item.category} className="flex items-center gap-1">
            <div
              className={`size-3 [border-radius:calc(var(--radius)-1px);]`}
              // @ts-ignore
              style={{ background: item.fill }}
            />
            <div className="space-x-2">
              <span className="text-xs">
                {/* @ts-ignore */}
                {item.category}
              </span>
              <span className="text-muted-foreground text-xs">
                <span className="font-mono [font-size:10px] font-medium tabular-nums">
                  {/* @ts-ignore */}
                  {item.ammount}
                </span>
                {/* @ts-ignore */}
                {item.ammount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
