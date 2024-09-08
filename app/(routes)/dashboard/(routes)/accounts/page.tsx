import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { AccountsTable } from "@/components/dashboard/tables/accounts-table";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

const AccountsPage = async () => {
  const currentClerkUser = await currentUser();

  if (!currentClerkUser) {
    return null;
  }

  const accounts = await prismadb.account.findMany({
    where: {
      userId: currentClerkUser.id,
    }
  });

  return (
    <div className="ml-4 mb-12">
      <FilterButtons accounts={accounts} />
      <AccountsTable />
    </div>
  );
};

export default AccountsPage;
