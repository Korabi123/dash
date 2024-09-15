"use client";

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
import { useEffect, useState } from "react";
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
import { Account, Category, Transaction } from "@prisma/client";
import { useRouter } from "next/navigation";
import { TransactionForAxios } from "@/types/transactions-for-axios";
import { TransactionsWithCategory } from "@/types/transactions-with-category-and-account";

interface EditTransactionSheetProps {
  accounts: Account[];
  categories: Category[];
}

export const EditTransactionSheet = ({
  accounts,
  categories,
}: EditTransactionSheetProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionData, setTransactionData] =
    useState<TransactionsWithCategory>();

  const [payee, setPayee] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [accountState, setAccountState] = useState("");
  const [date, setDate] = useState<Date>();

  const { onClose, isOpen, type, data } = useModalStore();
  const isSheetOpen = isOpen && type === "editTransaction";

  useEffect(() => {
    const getData = async () => {
      if (isSheetOpen) {
        const res = await axios.get(
          `/api/transactions/getUnique?transactionId=${data.transactionId}`
        );

        console.log(res.data);

        setTransactionData(res.data);
        setAmount(res.data.amount);
        setPayee(res.data.payee);
        setCategoryState(res.data.category?.name);
        setAccountState(res.data.account?.name);
        setDate(new Date(res.data.createdAt));
      }
    };

    getData();
  }, [data, isSheetOpen]);

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

  const onSubmit = async () => {
    try {
      const json = JSON.stringify({
        date: date?.toISOString(),
        categoryName: categoryState,
        accountName: accountState,
        payee: payee,
        amount: amount,
      });

      if (!json) {
        toast.error("Something went wrong");
        return;
      }

      if (!date) {
        toast.error("Date is required");
        return;
      }

      if (!categoryState) {
        toast.error("Category is required");
        return;
      }

      if (!accountState) {
        toast.error("Account is required");
        return;
      }

      if (!payee) {
        toast.error("Payee is required");
        return;
      }

      if (!amount) {
        toast.error("Amount is required");
        return;
      }

      console.log(json);
      await axios.patch(`/api/transactions/update?transactionId=${data.transactionId}`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Transaction updated successfully");
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      onClose();
      toast.error("Something went wrong");
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        //? Clear all states as zustand saves the data

        onClose();
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Transaction</SheetTitle>
          <SheetDescription>Edit a existing transaction</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-8">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="justify-start w-full text-left font-normal md:h-9 md:px-4 md:text-sm h-8 rounded-md px-3 text-xs"
                variant="outline"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-1" align="center">
              <Calendar
                initialFocus
                mode="single"
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            </PopoverContent>
          </Popover>
          <div>
            <Label>Category</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="mt-2" asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-muted-foreground"
                >
                  {categoryState
                    ? categories.find(
                        (category) => category.name === categoryState
                      )?.name
                    : "Select a category..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
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
                          Start by typing a category name in the search box
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
                            setCategoryState(
                              category.name === categoryState
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
                              categoryState === category.name
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
          </div>
          <div>
            <Label>Account</Label>
            <Popover open={openAccount} onOpenChange={setOpenAccount}>
              <PopoverTrigger className="mt-2" asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-muted-foreground"
                >
                  {accountState
                    ? accounts.find((account) => account.name === accountState)
                        ?.name
                    : "Select an account..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
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
                            setAccountState(
                              account.name === accountState ? "" : account.name
                            );
                            setOpenAccount(false);
                          }}
                        >
                          {account.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              accountState === account.name
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
          </div>
          <div>
            <Label>Payee</Label>
            <Input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              placeholder="E.g John Doe"
              className="mt-2"
            />
          </div>
          <div>
            <Label>Amount</Label>
            <div className="flex h-full mt-2 items-center gap-2 group">
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
              <Input
                type="number"
                placeholder="Amount"
                value={amount === 0 ? "" : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
          <p className="text-muted-foreground md:text-sm text-xs">
            {amount === 0 && "Enter an amount"}
            {amount > 0 && "This will count as income"}
            {amount < 0 && "This will count as an expense"}
          </p>

          <Button
            type="submit"
            className="bg-branding-primary self-end hover:bg-branding-primary/80 text-white w-full"
            onClick={onSubmit}
          >
            Update
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
