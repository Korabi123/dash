"use client";

import * as React from "react";

import { Pie, PieChart as PieChartRecharts } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

export function PieChart() {
  const [ammount, setAmmount] = React.useState("");
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>();

  React.useEffect(() => {
    let tempObj = {};

    const chartConfigFunc = () => {
      for (let index = 0; index < chartData.length; index++) {
        const category = chartData[index].category;

        tempObj = {
          ...tempObj,
          [category]: {
            label:
              category.charAt(0).toUpperCase() +
              category.slice(1) /* + " " + chartData[index].percentage + "%" */,
            color: chartData[index].fill,
          },
        };

        setChartConfig(tempObj);
      }
    };

    chartConfigFunc();
  }, []);

  if (!chartConfig) {
    return null;
  }

  console.log(chartConfig);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square">
      <PieChartRecharts>
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
        <Pie
          data={chartData}
          dataKey="percentage"
          nameKey="category"
          innerRadius={"55%"}
          className="mb-4"
        />
        <ChartLegend
          content={
            <div className="flex flex-col items-start gap-2">
              {chartData.map((item) => (
                <div key={item.category} className="flex items-center gap-1">
                  <div className={`size-3 [border-radius:calc(var(--radius)-1px);]`} style={{ background: item.fill }} />
                  <div className="space-x-2">
                    <span className="text-xs">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    <span className="text-muted-foreground">
                      <span className="font-mono [font-size:10px] font-medium tabular-nums">
                        {item.ammount.charAt(0)}
                      </span>
                      {item.ammount.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      </PieChartRecharts>
    </ChartContainer>
  );
}
