import { Account, Category } from "@prisma/client";

export type TransactionsWithCategory = {
  id: string;
  userId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  payee: string;
  categoryId: string | null;
  accountId: string | null;
  profileId: string | null;
  category: Category | null;
  account: Account | null;
};
