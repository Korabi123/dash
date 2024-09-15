"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountWithTransactions } from "@/types/account-with-transactions";

export const DeleteAccountModal = () => {
  const [apiData, setApiData] = useState<AccountWithTransactions>();

  const router = useRouter();
  const { onClose, isOpen, type, data } = useModalStore();
  const isDialogOpen = isOpen && type === "deleteAccount";

  useEffect(() => {
    if (isDialogOpen) {
      const getData = async () => {
        const res = await axios.get(`/api/accounts/getUnique?accountId=${data.accountId}`);
        setApiData(res.data);
      }
      getData();
    }
  }, [data, isDialogOpen]);

  const onDeleteAccount = async () => {
    try {
      if (apiData?.transactions?.length) {
        toast.error("Please unlink all transactions before deleting the account");
        onClose();
        return;
      }

      await axios.delete(`/api/accounts/delete?accountId=${data.accountId}`);
      toast.success("Account deleted successfully");
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
          <DialogTitle>Delete Account?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this account, this action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex w-full justify-end gap-4">
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onDeleteAccount()} className="bg-branding-primary hover:bg-branding-primary/80 text-white">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
};
