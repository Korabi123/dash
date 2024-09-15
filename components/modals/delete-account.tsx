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

export const DeleteAccountModal = () => {
  const router = useRouter();
  const { onClose, isOpen, type, data } = useModalStore();
  const isDialogOpen = isOpen && type === "deleteAccount";

  const onDeleteAccount = async () => {
    try {
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
