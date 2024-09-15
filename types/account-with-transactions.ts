import { Transaction } from "@prisma/client";

export type AccountWithTransactions = {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
}
