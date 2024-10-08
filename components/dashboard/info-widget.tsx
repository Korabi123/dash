"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardTitle,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "../ui/card";

interface InfoWidgetProps {
  type: "income" | "expenses" | "remaining";
  footerInfo: string;
  dateRange: string;
  year: number;
  value: number;
  icon: React.ReactNode;
  isGood?: boolean;
  neutral?: boolean;
}

const InfoWidget = ({
  type,
  footerInfo,
  dateRange,
  year,
  value,
  icon,
  isGood,
  neutral
}: InfoWidgetProps) => {
  return (
    <Card className="md:w-1/3 w-full">
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </CardTitle>
            <CardDescription className="text-xs mt-2">
              {dateRange}, {year}
            </CardDescription>
          </div>
          <div
            className={cn(
              "rounded-lg flex items-center justify-center size-12 p-2",
              type === "remaining" && "bg-blue-400/25",
              type === "income" && "bg-green-400/25",
              type === "expenses" && "bg-red-400/25"
            )}
          >
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <CardDescription className="text-black flex flex-col">
          <span className="mb-2">
            <span className="[font-size:1.600rem] [line-height: 2.25rem] font-semibold tracking-tighter">
              {value}
            </span>
            <span className="text-lg font-semibold tracking-tighter">$</span>
          </span>
          {value < 0 && (
            <span className="text-red-500 text-xs">Warning: You are in debt</span>
          )}
          {neutral ? (
            <span className="text-xs text-gray-500">
              No transactions from last period
            </span>
          ) : (
            <span
              className={cn(
                "md:text-sm text-xs mt-2",
                isGood ? "text-green-500" : "text-red-500"
              )}
            >
              {footerInfo}
            </span>
          )}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default InfoWidget;
