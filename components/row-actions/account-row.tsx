"use client";

import { useModalStore } from "@/hooks/useModalStore";
import { TriangleAlert } from "lucide-react";

interface AccountRowProps {
  account: {
    id: string;
    name: string;
  }
}

export const AccountRow = ({ account }: AccountRowProps) => {
  const { onOpen } = useModalStore();

  return (
    <>
      {!account ? (
        <span className="hover:underline cursor-pointer transition-all inline-flex items-center gap-2 text-red-500">
          <span>
            <TriangleAlert className="text-red-500 size-4" />
          </span>
          <span>Uncategorized</span>
        </span>
      ) : (
        <span onClick={() => onOpen("editAccount", { accountId: account?.id })} className="hover:underline cursor-pointer transition-all">{account.name}</span>
      )}
    </>
  );
};
