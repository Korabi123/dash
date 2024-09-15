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

export const CreateAccountSheet = () => {
  const router = useRouter();

  const [accountState, setAccountState] = useState("");

  const { onClose, isOpen, type, data } = useModalStore();
  const isSheetOpen = isOpen && type === "createAccount";

  const onSubmit = async () => {
    try {
      const json = JSON.stringify({
        name: accountState,
      });

      await axios.post(`/api/accounts/create`, json, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Account created successfully");
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
          <SheetTitle>Create an Account</SheetTitle>
          <SheetDescription>Create a new Account</SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <Label>Account Name</Label>
          <Input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
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
          Create
        </Button>
      </SheetContent>
    </Sheet>
  );
};
