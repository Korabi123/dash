"use client";

import * as React from "react"

import { Button } from "../ui/button";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils";


export const FilterButtons = () => {
  const [position, setPosition] = React.useState("All Accounts");
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth();
  const currentDayOfMonth = new Date().getDate();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(currentYear, currentMonthIndex -1, currentDayOfMonth),
    to: addDays(new Date(currentYear, currentMonthIndex, currentDayOfMonth), 0),
  })

  return (
    <div className="mt-4 flex md:flex-row flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="max-w-fit md:h-9 md:px-4 md:text-sm h-8 rounded-md px-3 text-xs" variant="active">
            {position}{" "}
            <span>
              <ChevronDownIcon className="inline-block size-4 ml-2 mb-[1px]" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter Data By Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem className="cursor-pointer" value="All Accounts">All Accounts</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="cursor-pointer" value="Morgage">Morgage</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className="cursor-pointer" value="Savings">Savings</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"active"}
            className={cn(
              "justify-start text-left max-w-fit font-normal md:h-9 md:px-4 md:text-sm h-8 rounded-md px-3 text-xs",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-white" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="text-white">Pick a date</span>
            )}
            <span>
              <ChevronDownIcon className="inline-block size-4 ml-4 mb-[1px] text-white" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-auto p-1" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="mt-2 p-2 flex gap-2 items-center">
            <Button variant={"outline"} className="w-1/2">
              Reset
            </Button>
            <Button className="w-1/2 bg-branding-primary hover:bg-branding-primary/80 text-white">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    </div>
  );
}
