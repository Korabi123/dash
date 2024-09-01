"use client";

import * as React from "react";

import { Bar, BarChart as BarChartRecharts, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { date: "Jul 31, 2024", income: 186, expenses: 324 },
  { date: "Jul 31, 2024", income: 305, expenses: 200 },
  { date: "Aug 6, 2024", income: 543, expenses: 120 },
  { date: "Aug 13, 2024", income: 73, expenses: 190 },
  { date: "Aug 23, 2024", income: 209, expenses: 130 },
  { date: "Aug 30, 2024", income: 214, expenses: 140 },
]

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChart() {
  const [date, setDate] = React.useState("");

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
