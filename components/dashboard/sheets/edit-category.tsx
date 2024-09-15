"use client";

//? Other Imports
import { useModalStore } from "@/hooks/useModalStore";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const EditCategorySheet = () => {
  const router = useRouter();

  const [categoryState, setCategoryState] = useState("");

  const { onClose, isOpen, type, data } = useModalStore();
  const isSheetOpen = isOpen && type === "editCategory";

  useEffect(() => {
    const getData = async () => {
      if (isSheetOpen) {
        const res = await axios.get(
          `/api/categories/getUnique?categoryId=${data.categoryId}`
        );

        console.log(res.data);

        setCategoryState(res.data.name);
      }
    };

    getData();
  }, [data, isSheetOpen]);

  const onSubmit = async () => {
    try {
      const json = JSON.stringify({
        name: categoryState,
      });

      await axios.patch(`/api/categories/update?categoryId=${data.categoryId}`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Category updated successfully");
      onClose();
      router.refresh();
    } catch (error) {
      console.log(error);
      onClose();
      toast.error("Something went wrong");
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        //? Clear all states as zustand saves the data

        onClose();
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit an Category</SheetTitle>
          <SheetDescription>Edit an existing category</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Label>Category Name</Label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            value={categoryState}
            onChange={(e) => setCategoryState(e.target.value)}
            placeholder="E.g Checking"
            className="mt-2"
          />
        </div>

        <Button
          type="submit"
          className="mt-4 bg-branding-primary self-end hover:bg-branding-primary/80 text-white w-full"
          onClick={onSubmit}
        >
          Update
        </Button>
      </SheetContent>
    </Sheet>
  );
};
