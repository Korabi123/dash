import { Account, Category } from "@prisma/client";

export type TransactionForAxios = {
  data: {
    id: string;
    userId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    payee: string;
    categoryId: string | null;
    accountId: string | null;
    profileId: string | null;
    category: Category;
    account: Account;
  }
};
