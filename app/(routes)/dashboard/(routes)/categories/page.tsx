import { FilterButtons } from "@/components/dashboard/filter-buttons";
import { CategoriesTable } from "@/components/dashboard/tables/categories-table";

const CategoriesPage = () => {
  return (
    <div className="ml-4 mb-12">
      <FilterButtons />
      <CategoriesTable />
    </div>
  );
};

export default CategoriesPage;
