import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { DataTable } from "@/components/dashboard/tables/data-table";
import { transactionColumns } from "@/types/transaction-columns";

import { ArrowUpRightFromSquare, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionsTable } from "@/components/dashboard/tables/transactions-table";

const DashboardOverviewPage = () => {
  return (
    <div className="ml-4 mb-12">
      <FilterButtons />
      <TransactionsTable />
    </div>
  );
};

export default DashboardOverviewPage;
