"use client"

import * as React from "react";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RadarChartRecharts } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  {
    category: "rent",
    ammount: "$1400",
    percentage: 13,
    fill: "hsl(var(--chart-1))",
  },
  {
    category: "utilities",
    percentage: 13,
    ammount: "$1400",
    fill: "hsl(var(--chart-2))"
  },
  {
    category: "clothing",
    percentage: 13,
    ammount: "$1400",
    fill: "hsl(var(--chart-3))"
  },
  {
    category: "other",
    percentage: 3,
    ammount: "$1400",
    fill: "hsl(var(--chart-5))"
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RadarChart() {
  const [ammount, setAmmount] = React.useState("");

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square">
      <RadarChartRecharts data={chartData}>
      <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              hideLabel
              showDate
              date={ammount}
              className="w-[180px]"
              formatter={(value, name, item, index) => {
                return (
                  <>
                    <div
                      className="h-4.5 w-1 shrink-0 rounded-[2px] bg-[--color-bg]"
                      style={
                        {
                          "--color-bg": `${item.payload.fill}`,
                        } as React.CSSProperties
                      }
                    />
                    {item.payload.category.charAt(0).toUpperCase() + item.payload.category.slice(1)}
                    <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                      {value}
                      <span className="text-xs font-normal text-muted-foreground">
                        %
                      </span>
                      {(() => {
                        setAmmount(item.payload.ammount);
                        return null;
                      })()}
                    </div>
                  </>
                );
              }} />
          }
        />
        <PolarAngleAxis
          dataKey="category"
        />
        <PolarGrid />
        <Radar
          dataKey="percentage"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
        />
      </RadarChartRecharts>
    </ChartContainer>
  );
}
