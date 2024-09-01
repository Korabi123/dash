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
import { Button } from "../ui/button";
import { ChevronDown, RadarIcon, RadicalIcon, TargetIcon } from "lucide-react";
import { PieChartIcon } from "@radix-ui/react-icons";
import { PieChart } from "./charts/pie-chart";
import { RadarChart } from "./charts/radar-chart";
import { RadialChart } from "./charts/radial-chart";
export const SmallInfoChart = () => {
  const [chartType, setChartType] = React.useState("Pie Chart");

  return (
    <Card className="md:w-1/3 w-full">
      <CardHeader>
        <div className="w-full flex md:flex-row flex-col items-center justify-between">
          <CardTitle className="text-2xl">Categories</CardTitle>
          <div className={cn("rounded-lg flex items-center justify-center p-2")}>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  <span>
                    {chartType === "Pie Chart" && (
                      <PieChartIcon className="mr-2 h-4 w-4" />
                    )}
                    {chartType === "Radar Chart" && (
                      <RadarIcon className="mr-2 h-4 w-4" />
                    )}
                    {chartType === "Radial Chart" && (
                      <TargetIcon className="mr-2 h-4 w-4" />
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
                    value="Pie Chart"
                  >
                    <span>
                      <PieChartIcon className="mr-2 h-4 w-4" />
                    </span>
                    Pie Chart
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="cursor-pointer"
                    value="Radar Chart"
                  >
                    <span>
                      <RadarIcon className="mr-2 h-4 w-4" />
                    </span>
                    Radar Chart
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="cursor-pointer md:flex hidden"
                    value="Radial Chart"
                  >
                    <span>
                      <TargetIcon className="mr-2 h-4 w-4" />
                    </span>
                    Radial Chart
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        {chartType === "Pie Chart" && <PieChart />}
        {chartType === "Radar Chart" && <RadarChart />}
        {chartType === "Radial Chart" && <RadialChart />}
      </CardContent>
    </Card>
  );
}
