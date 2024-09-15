"use client";

import { useModalStore } from "@/hooks/useModalStore";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal, Trash, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";
import { ColumnActions } from "@/components/column-actions/column-actions";
import { CategoryRow } from "@/components/row-actions/category-row";
import { AccountRow } from "@/components/row-actions/account-row";

export type Transaction = {
  id: string;
  date: string;
  payee: string;
  amount: number;
  account: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  isIncome: boolean;
}

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },


  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const transaction = row.original as Transaction;

      return (
        <CategoryRow category={transaction.category} />
      );
    },
  },
  {
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Payee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const transaction = row.original as Transaction;

      return (
        <div className="flex items-center gap-2">
          {transaction.isIncome ? (
            <Badge variant={"income"}>
             {transaction.amount}$
            </Badge>
          ) : (
            <Badge variant={"expenses"}>
              {transaction.amount}$
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const transaction = row.original as Transaction;

      return (
        <AccountRow account={transaction.account} />
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original as Transaction;

      return (
        <ColumnActions transactionId={transaction.id} />
      );
    }
  },
];
