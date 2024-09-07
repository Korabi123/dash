import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { DataTable } from "@/components/dashboard/tables/data-table";
import { transactionColumns } from "@/types/transaction-columns";

const DashboardOverviewPage = () => {
  return (
    <div className="ml-4 mb-12">
      <FilterButtons />
      <DataTable
        columns={transactionColumns}
        data={[
          {
            id: "1",
            date: "2024-01-01",
            payee: "Payee 1",
            ammount: 100,
            account: "Account 1",
            category: "Category 1",
          },
          {
            id: "1",
            date: "2024-04-09",
            payee: "Payee 2",
            ammount: 200,
            account: "Account 2",
            category: "Category 2",
          },
          {
            id: "1",
            date: "2023-01-01",
            payee: "Payee 3",
            ammount: 300,
            account: "Account 3",
            category: "Category 3",
          },
        ]}
      />
    </div>
  );
}

export default DashboardOverviewPage;
