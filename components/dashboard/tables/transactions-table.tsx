"use client";

import { transactionColumns } from "@/types/transaction-columns";
import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare, PlusIcon } from "lucide-react";

export const TransactionsTable = () => {
  return (
    <DataTable
      title="Transactions History"
      search
      searchFor="payee"
      columns={transactionColumns}
      actions={
        <>
          <Button className="bg-branding-primary gap-2 hover:bg-branding-primary/80 text-white">
            <span>
              <PlusIcon className="size-4" />
            </span>
            <span>Add new</span>
          </Button>
          <Button className="gap-2 bg-branding-primary hover:bg-branding-primary/80 text-white">
            <span>
              <ArrowUpRightFromSquare className="size-4" />
            </span>
            <span>Import</span>
          </Button>
        </>
      }
      data={[
        {
          id: "1",
          date: "3 June, 2024",
          payee: "Merchant",
          ammount: 427.63,
          account: "Checking",
          category: "Rent",
          isIncome: true,
        },
        {
          id: "1",
          date: "9 April, 2024",
          payee: "Merchant",
          ammount: -1274.36,
          account: "Checking",
          category: "Travel",
          isIncome: false,
        },
        {
          id: "1",
          date: "1 April, 2024",
          payee: "Merchant",
          ammount: -254.79,
          account: "Checking",
          category: "Food",
          isIncome: false,
        },
      ]}
    />
  );
};
