"use client";

import { transactionColumns } from "@/types/transaction-columns";
import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare, PlusIcon } from "lucide-react";
import { accountColumns } from "@/types/account-columns";

export const AccountsTable = () => {
  return (
    <DataTable
      title="Accounts"
      search
      searchFor="name"
      columns={accountColumns}
      actions={
        <>
          <Button className="bg-branding-primary gap-2 hover:bg-branding-primary/80 text-white">
            <span>
              <PlusIcon className="size-4" />
            </span>
            <span>Add new</span>
          </Button>
        </>
      }
      data={[
        {
          id: "1",
          name: "Checking",
        },
        {
          id: "1",
          name: "Savings",
        },
        {
          id: "1",
          name: "Morgage",
        },
      ]}
    />
  );
};
