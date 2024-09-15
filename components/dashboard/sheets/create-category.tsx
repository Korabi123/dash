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
import { useState } from "react";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const CreateCategorySheet = () => {
  const router = useRouter();

  const [categoryState, setCategoryState] = useState("");

  const { onClose, isOpen, type } = useModalStore();
  const isSheetOpen = isOpen && type === "createCategory";

  const onSubmit = async () => {
    try {
      const json = JSON.stringify({
        name: categoryState,
      });

      await axios.post(`/api/categories/create`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Category created successfully");
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
          <SheetTitle>Create an Category</SheetTitle>
          <SheetDescription>Create a new Category</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Label>Category Name</Label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setCategoryState(e.target.value)}
            placeholder="E.g Travel"
            className="mt-2"
          />
        </div>

        <Button
          type="submit"
          className="mt-4 bg-branding-primary self-end hover:bg-branding-primary/80 text-white w-full"
          onClick={onSubmit}
        >
          Create
        </Button>
      </SheetContent>
    </Sheet>
  );
};
