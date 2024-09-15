"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountWithTransactions } from "@/types/account-with-transactions";

export const SecondConfirmationCategoryModal = () => {
  const router = useRouter();
  const { onClose, isOpen, type, data } = useModalStore();
  const isDialogOpen = isOpen && type === "secondConfirmationCategory";

  const onDeleteCategory = async () => {
    try {
      await axios.delete(`/api/categories/delete?categoryId=${data.categoryId}`);
      toast.success("Category deleted successfully");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
      onClose();
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uncategorize Transactions?</DialogTitle>
          <DialogDescription>
            Once deleted, all transactions linked to this category will remain
            uncategorized.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex w-full justify-end gap-4">
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onDeleteCategory()}
            className="bg-branding-primary hover:bg-branding-primary/80 text-white"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
