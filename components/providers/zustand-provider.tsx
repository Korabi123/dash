import { currentUser } from "@clerk/nextjs/server";
import { CreateTransactionSheet } from "../dashboard/sheets/create-transaction";
import prismadb from "@/lib/prismadb";
import { EditTransactionSheet } from "../dashboard/sheets/edit-transaction";
import { DeleteTransactionModal } from "../modals/delete-transaction";

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
      <CreateTransactionSheet accounts={accounts} categories={categories} />
      <EditTransactionSheet accounts={accounts} categories={categories} />
      <DeleteTransactionModal />
    </>
  )
}
