"use client";

import { transactionColumns } from "@/types/transaction-columns";
import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare, PlusIcon } from "lucide-react";
import { TransactionsWithCategory } from "@/types/transactions-with-category-and-account";
import { useModalStore } from "@/hooks/useModalStore";
import { useEffect, useState } from "react";

interface TransactionsTableProps {
  transactions: TransactionsWithCategory[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModalStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const formattedTransactions = transactions.map((transaction) => {
    return {
      id: transaction.id,
      date: transaction.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      payee: transaction.payee,
      amount: transaction.amount,
      account: transaction?.account,
      category: transaction.category,
      isIncome: transaction.amount > 0,
    };
  });

  return (
    <DataTable
      title="Transactions History"
      search
      searchFor="payee"
      columns={transactionColumns as any}
      actions={
        <>
          <Button onClick={() => onOpen("createTransaction")} className="bg-branding-primary gap-2 hover:bg-branding-primary/80 text-white">
            <span>
              <PlusIcon className="size-4" />
            </span>
            <span>Add new</span>
          </Button>
        </>
      }
      data={formattedTransactions}
    />
  );
};
