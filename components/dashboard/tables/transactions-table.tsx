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
          date: "3 May, 2024",
          payee: "Payee 1",
          ammount: 100,
          account: "Account 1",
          category: "Category 1",
        },
        {
          id: "1",
          date: "9 April, 2024",
          payee: "Payee 2",
          ammount: 200,
          account: "Account 2",
          category: "Category 2",
        },
        {
          id: "1",
          date: "1 April, 2024",
          payee: "Payee 3",
          ammount: 300,
          account: "Account 3",
          category: "Category 3",
        },
      ]}
    />
  );
};
