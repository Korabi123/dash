import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { AccountsTable } from "@/components/dashboard/tables/accounts-table";

const AccountsPage = () => {
  return (
    <div className="ml-4 mb-12">
      <FilterButtons />
      <AccountsTable />
    </div>
  );
};

export default AccountsPage;
