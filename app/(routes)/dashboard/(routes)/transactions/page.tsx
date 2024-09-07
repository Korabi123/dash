import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { TransactionsTable } from "@/components/dashboard/tables/transactions-table";

const TransactionsPage = () => {
  return (
    <div className="ml-4 mb-12">
      <FilterButtons />
      <TransactionsTable />
    </div>
  );
};

export default TransactionsPage;
