import { currentUser } from "@clerk/nextjs/server";
import { CreateTransactionSheet } from "../dashboard/sheets/create-transaction";
import prismadb from "@/lib/prismadb";
import { EditTransactionSheet } from "../dashboard/sheets/edit-transaction";
import { DeleteTransactionModal } from "../dashboard/modals/delete-transaction";
import { EditAccountSheet } from "../dashboard/sheets/edit-account";
import { CreateAccountSheet } from "../dashboard/sheets/create-account";
import { DeleteAccountModal } from "../dashboard/modals/delete-account";
import { DeleteCategoryModal } from "../dashboard/modals/delete-category";
import { SecondConfirmationCategoryModal } from "../dashboard/modals/second-confirmation-category";
import { CreateCategorySheet } from "../dashboard/sheets/create-category";
import { EditCategorySheet } from "../dashboard/sheets/edit-category";

export const ZustandProvider = async () => {
  const currentUserClerk = await currentUser();

  if (!currentUserClerk) {
    return null;
  }

  const accounts = await prismadb.account.findMany({
    where: {
      userId: currentUserClerk.id,
    }
  });

  const categories = await prismadb.category.findMany({
    where: {
      userId: currentUserClerk.id,
    }
  });

  return (
    <>
      {/* Transactions */}
      <CreateTransactionSheet accounts={accounts} categories={categories} />
      <EditTransactionSheet accounts={accounts} categories={categories} />
      <DeleteTransactionModal />

      {/* Accounts */}
      <CreateAccountSheet />
      <EditAccountSheet />
      <DeleteAccountModal />

      {/* Categories */}
      <CreateCategorySheet />
      <EditCategorySheet />
      <DeleteCategoryModal />
      <SecondConfirmationCategoryModal />
    </>
  )
}
