"use client";

import { transactionColumns } from "@/types/transaction-columns";
import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare, PlusIcon } from "lucide-react";
import { accountColumns } from "@/types/account-columns";
import { Account } from "@prisma/client";
import { useModalStore } from "@/hooks/useModalStore";

interface AccountsTableProps {
  accounts: Account[];
}

export const AccountsTable = ({ accounts }: AccountsTableProps) => {
  const { onOpen } = useModalStore();

  return (
    <DataTable
      title="Accounts"
      search
      searchFor="name"
      columns={accountColumns}
      actions={
        <>
          <Button onClick={() => onOpen("createAccount")} className="bg-branding-primary gap-2 hover:bg-branding-primary/80 text-white">
            <span>
              <PlusIcon className="size-4" />
            </span>
            <span>Add new</span>
          </Button>
        </>
      }
      data={accounts}
    />
  );
};
