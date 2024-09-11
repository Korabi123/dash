"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AreaChart } from "./charts/area-chart";
import { BarChart } from "./charts/bar-chart";
import { Button } from "../ui/button";
import { AreaChartIcon, BarChartIcon, ChartColumnBig, ChevronDown, LineChartIcon } from "lucide-react";
import { LineChart } from "./charts/line-chart";
import { Transaction } from "@prisma/client";

interface BigInfoChartProps {
  transactions: Transaction[];
}

export const BigInfoChart = ({ transactions }: BigInfoChartProps) => {
  const [chartType, setChartType] = React.useState("Area Chart");

  return (
    <Card className="md:w-2/3 w-full">
      <CardHeader>
        <div className="w-full flex md:flex-row flex-col items-center justify-between">
          <CardTitle className="text-2xl">Transactions</CardTitle>
          <div
            className={cn("rounded-lg flex items-center justify-center p-2")}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  <span>
                    {chartType === "Area Chart" && (
                      <AreaChartIcon className="mr-2 h-4 w-4" />
                    )}
                    {chartType === "Bar Chart" && (
                      <ChartColumnBig className="mr-2 h-4 w-4" />
                    )}
                    {chartType === "Line Chart" && (
                      <LineChartIcon className="mr-2 h-4 w-4" />
                    )}
                  </span>
                  {chartType}
                  <span>
                    <ChevronDown className="inline-block size-4 ml-2 mb-[1px]" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Chart Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={chartType}
                  onValueChange={setChartType}
                >
                  <DropdownMenuRadioItem
                    className="cursor-pointer"
                    value="Area Chart"
                  >
                    <span>
                      <AreaChartIcon className="mr-2 h-4 w-4" />
                    </span>
                    Area Chart
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="cursor-pointer"
                    value="Bar Chart"
                  >
                    <span>
                      <ChartColumnBig className="mr-2 h-4 w-4" />
                    </span>
                    Bar Chart
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="cursor-pointer"
                    value="Line Chart"
                  >
                    <LineChartIcon className="mr-2 h-4 w-4" />
                    Line Chart
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        {chartType === "Area Chart" && <AreaChart transactions={transactions} />}
        {chartType === "Bar Chart" && <BarChart transactions={transactions} />}
        {chartType === "Line Chart" && <LineChart transactions={transactions} />}
      </CardContent>
    </Card>
  );
}
