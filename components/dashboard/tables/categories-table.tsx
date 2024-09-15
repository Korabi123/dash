"use client";

import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { categoryColumns } from "@/types/category-columns";
import { Category } from "@prisma/client";
import { useModalStore } from "@/hooks/useModalStore";

interface CategoriesTableProps {
  categories: Category[];
}

export const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const { onOpen } = useModalStore();

  return (
    <DataTable
      title="Categories"
      search
      searchFor="name"
      columns={categoryColumns}
      actions={
        <>
          <Button onClick={() => onOpen("createCategory")} className="bg-branding-primary gap-2 hover:bg-branding-primary/80 text-white">
            <span>
              <PlusIcon className="size-4" />
            </span>
            <span>Add new</span>
          </Button>
        </>
      }
      data={categories}
    />
  );
};
