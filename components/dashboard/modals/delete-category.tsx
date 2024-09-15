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

export const DeleteCategoryModal = () => {
  const [apiData, setApiData] = useState<AccountWithTransactions>();

  const router = useRouter();
  const { onClose, isOpen, type, data, onOpen } = useModalStore();
  const isDialogOpen = isOpen && type === "deleteCategory";

  useEffect(() => {
    if (isDialogOpen) {
      const getData = async () => {
        const res = await axios.get(
          `/api/categories/getUnique?categoryId=${data.categoryId}`
        );
        setApiData(res.data);
      };
      getData();
    }
  }, [data, isDialogOpen]);

  const onDeleteCategory = async () => {
    try {
      await axios.delete(
        `/api/categories/delete?categoryId=${data.categoryId}`
      );
      toast.success("Category deleted successfully");
      onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
      onClose();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category, this action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex w-full justify-end gap-4">
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (
                apiData?.transactions?.length &&
                apiData?.transactions?.length > 0
              ) {
                onClose();
                setTimeout(() => {
                  onOpen("secondConfirmationCategory", {
                    categoryId: data.categoryId,
                  });
                }, 400);
              } else {
                onDeleteCategory();
              }
            }}
            className="bg-branding-primary hover:bg-branding-primary/80 text-white"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
