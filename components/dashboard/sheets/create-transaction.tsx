"use client";

//? Form Imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

//? Other Imports
import { useModalStore } from "@/hooks/useModalStore";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { CircleMinus, CirclePlus, Info } from "lucide-react";
import { Account, Category } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CreateTransactionSheetProps {
  accounts: Account[];
  categories: Category[];
}

const formSchema = z.object({
  date: z.date().transform((value) => new Date(value)),
  category: z
    .string()
    .min(1, "Category is required")
    .max(250, "Category is too long"),
  account: z
    .string()
    .min(1, "Account is required")
    .max(250, "Account is too long"),
  payee: z.string().min(1, "Payee is required").max(250, "Payee is too long"),
  amount: z.number().min(0, "Amount is required"),
});

export const CreateTransactionSheet = ({
  accounts,
  categories,
}: CreateTransactionSheetProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: undefined,
      category: "",
      account: "",
      payee: "",
      amount: 0,
    },
  });

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState(0);
  const { onClose, isOpen, type, reset } = useModalStore();
  const isSheetOpen = isOpen && type === "createTransaction";

  const onNewCategory = async ({ name }: { name: string }) => {
    try {
      const json = JSON.stringify({ name: name });

      await axios.post("/api/categories/create", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.success("Category created successfully");
      setOpen(false);
      router.refresh();
    }
  };

  const onNewAccount = async ({ name }: { name: string }) => {
    try {
      const json = JSON.stringify({ name: name });

      await axios.post("/api/accounts/create", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.success("Account created successfully");
      setOpenAccount(false);
      router.refresh();
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { date, category, account, payee } = data;

    try {
      const datePlusOneDay = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
      const json = JSON.stringify({
        date: datePlusOneDay.toISOString(),
        categoryName: category,
        accountName: account,
        payee: payee,
        amount: amount,
      });

      if (!json) {
        toast.error("Something went wrong");
        return;
      }

      if (!amount) {
        toast.error("Amount is required");
        return;
      }

      await axios.post("/api/transactions/create", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Transaction created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      onClose();
      router.refresh();
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        onClose();

        //? Clear all states as zustand saves the data
        reset();
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>Add a new transaction</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-8"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl {...field}>
                        <Button
                          className="justify-start w-full text-left font-normal md:h-9 md:px-4 md:text-sm h-8 rounded-md px-3 text-xs"
                          variant="outline"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-1" align="center">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={1}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between text-muted-foreground"
                        >
                          {field.value
                            ? categories.find(
                                (category) => category.name === field.value
                              )?.name
                            : "Select a category..."}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          onValueChange={(e) => setInput(e.valueOf())}
                          placeholder="Search categories..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty className="p-0">
                            {!input.length ? (
                              <p className="text-muted-foreground text-xs p-2 pt-2.5">
                                Start by typing a category name in the search
                                box
                              </p>
                            ) : (
                              <Button
                                className="w-full rounded-t-none"
                                onClick={() =>
                                  onNewCategory({
                                    name:
                                      input.toString().charAt(0).toUpperCase() +
                                      input.toString().slice(1),
                                  })
                                }
                                variant={"ghost"}
                              >
                                <span>
                                  Create &quot;
                                  {input.toString().charAt(0).toUpperCase() +
                                    input.toString().slice(1)}
                                  &quot;
                                </span>
                              </Button>
                            )}
                          </CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => {
                                  form.setValue(
                                    "category",
                                    category.name === field.value
                                      ? ""
                                      : category.name
                                  );
                                  setOpen(false);
                                }}
                              >
                                {category.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    form.getValues("category") === category.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Account</FormLabel>
                  <Popover open={openAccount} onOpenChange={setOpenAccount}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between text-muted-foreground"
                        >
                          {field.value
                            ? accounts.find(
                                (account) => account.name === field.value
                              )?.name
                            : "Select an account..."}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          onValueChange={(e) => setInput(e.valueOf())}
                          placeholder="Search accounts..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty className="p-0">
                            {!input.length ? (
                              <p className="text-muted-foreground text-xs p-2 pt-2.5">
                                Start by typing a account name in the search box
                              </p>
                            ) : (
                              <Button
                                className="w-full rounded-t-none"
                                onClick={() =>
                                  onNewAccount({
                                    name:
                                      input.toString().charAt(0).toUpperCase() +
                                      input.toString().slice(1),
                                  })
                                }
                                variant={"ghost"}
                              >
                                <span>
                                  Create &quot;
                                  {input.toString().charAt(0).toUpperCase() +
                                    input.toString().slice(1)}
                                  &quot;
                                </span>
                              </Button>
                            )}
                          </CommandEmpty>
                          <CommandGroup>
                            {accounts.map((account) => (
                              <CommandItem
                                key={account.id}
                                value={account.name}
                                onSelect={() => {
                                  form.setValue(
                                    "account",
                                    account.name === field.value
                                      ? ""
                                      : account.name
                                  );
                                  setOpenAccount(false);
                                }}
                              >
                                {account.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    form.getValues("account") === account.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payee</FormLabel>
                  <Input autoCapitalize="off" autoComplete="off" autoCorrect="off" {...field} placeholder="E.g John Doe" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <div className="flex h-full items-center gap-2 group">
                    <Button
                      type="button"
                      onClick={() => setAmount(amount * -1)}
                      className={cn(
                        "p-2.5 rounded-md text-white font-semibold",
                        amount > 0
                          ? "bg-green-400 hover:bg-green-500"
                          : "bg-red-400 hover:bg-red-500",
                        amount === 0 && "bg-gray-400 hover:bg-gray-500"
                      )}
                    >
                      {amount > 0 ? (
                        <CirclePlus className="h-4 w-4" />
                      ) : (
                        <>
                          {amount === 0 && <Info className="h-4 w-4" />}
                          {amount < 0 && <CircleMinus className="h-4 w-4" />}
                        </>
                      )}
                    </Button>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Amount"
                        value={amount === 0 ? "" : amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-muted-foreground md:text-sm text-xs">
              {amount === 0 && "Enter an amount"}
              {amount > 0 && "This will count as income"}
              {amount < 0 && "This will count as an expense"}
            </p>

            <Button
              type="submit"
              className="bg-branding-primary self-end hover:bg-branding-primary/80 text-white w-full"
            >
              Add
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
