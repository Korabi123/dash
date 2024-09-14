import { Category, Transaction } from "@prisma/client"

export type CategoryWithTransactions = {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
}
