import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { CategoriesTable } from "@/components/dashboard/tables/categories-table";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

const CategoriesPage = async () => {
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
      <CategoriesTable />
    </div>
  );
};

export default CategoriesPage;
