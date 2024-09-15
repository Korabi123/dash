"use client";

import { useModalStore } from "@/hooks/useModalStore";
import { TriangleAlert } from "lucide-react";

interface CategoryRowProps {
  category: {
    id: string;
    name: string;
  }
}

export const CategoryRow = ({ category }: CategoryRowProps) => {
  const { onOpen } = useModalStore();

  return (
    <>
      {!category ? (
        <span className="hover:underline cursor-pointer transition-all inline-flex items-center gap-2 text-red-500">
          <span>
            <TriangleAlert className="text-red-500 size-4" />
          </span>
          <span>Uncategorized</span>
        </span>
      ) : (
        <span onClick={() => onOpen("editCategory", { categoryId: category?.id })} className="hover:underline cursor-pointer transition-all">{category.name}</span>
      )}
    </>
  );
};
