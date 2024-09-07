"use client";

import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { categoryColumns } from "@/types/category-columns";

export const CategoriesTable = () => {
  return (
    <DataTable
      title="Categories"
      search
      searchFor="name"
      columns={categoryColumns}
      actions={
        <>
          <Button className="bg-branding-primary gap-2 hover:bg-branding-primary/80 text-white">
            <span>
              <PlusIcon className="size-4" />
            </span>
            <span>Add new</span>
          </Button>
        </>
      }
      data={[
        {
          id: "1",
          name: "Rent",
        },
        {
          id: "1",
          name: "Food",
        },
        {
          id: "1",
          name: "Travel",
        }
      ]}
    />
  );
};
