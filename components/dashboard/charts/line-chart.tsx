"use client"

import * as React from "react";

import { CartesianGrid, Line, LineChart as LineChartRecharts, XAxis } from "recharts"
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

export function LineChart() {
  const [date, setDate] = React.useState("");

  return (
    <ChartContainer config={chartConfig}>
      <LineChartRecharts
        accessibilityLayer
        data={chartData}
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
          // tickFormatter={(value) => {
          //   return new Date(value).toLocaleDateString("en-US", {
          //     month: "short",
          //     day: "numeric",
          //   });
          // }}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={
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
        } />
        <Line
          dataKey="income"
          type="linear"
          stroke="var(--color-income)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="expenses"
          type="linear"
          stroke="var(--color-expenses)"
          strokeWidth={2}
          dot={false}
        />
      </LineChartRecharts>
    </ChartContainer>
  );
}
