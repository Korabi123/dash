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

export const EditAccountSheet = () => {
  const router = useRouter();

  const [accountState, setAccountState] = useState("");

  const { onClose, isOpen, type, data } = useModalStore();
  const isSheetOpen = isOpen && type === "editAccount";

  useEffect(() => {
    const getData = async () => {
      if (isSheetOpen) {
        const res = await axios.get(
          `/api/accounts/getUnique?accountId=${data.accountId}`
        );

        console.log(res.data);

        setAccountState(res.data.name);
      }
    };

    getData();
  }, [data, isSheetOpen]);

  const onSubmit = async () => {
    try {
      const json = JSON.stringify({
        name: accountState,
      });

      await axios.patch(`/api/accounts/update?accountId=${data.accountId}`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Account updated successfully");
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
          <SheetTitle>Edit an Account</SheetTitle>
          <SheetDescription>Edit an existing account</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Label>Account Name</Label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            value={accountState}
            onChange={(e) => setAccountState(e.target.value)}
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
