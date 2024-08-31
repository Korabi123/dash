"use client";

import Image from "next/image"
import BrandingLogo from "@/public/branding/svg-white.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export const DashboardHeader = () => {
  return (
    <header className="w-full bg-transparent">
      <div className="flex container py-4 md:px-10 items-center justify-between">
        <div className="flex items-center gap-8">
          <a
            href={"/"}
            className="flex p-2 px-3 hover:bg-white/10 rounded-md transition-all items-center gap-2 cursor-pointer select-none"
          >
            <Image src={BrandingLogo} alt="Dash Logo" />
            <span className="text-xl font-semibold text-white">Dash</span>
          </a>
          <nav className="hidden md:flex items-center gap-3">
            <Button variant={"active"}>Overview</Button>
            <Button variant={"nonActive"}>Transactions</Button>
            <Button variant={"nonActive"}>Accounts</Button>
            <Button variant={"nonActive"}>Categories</Button>
            <Button variant={"nonActive"}>Settings</Button>
          </nav>
        </div>
        <div className="hidden md:block">
          <UserButton />
        </div>
        <div className="flex gap-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"nonActive"}>
                <span className="sr-only">Open menu</span>
                <HamburgerMenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col h-[100vh] mt-10 items-center w-full gap-8">
                <nav className="flex flex-col mt-10 items-center w-full gap-3">
                  <Button variant={"active"} className="w-full bg-branding-primary hover:bg-branding-primary/80">Overview</Button>
                  <Button variant={"nonActive"} className="text-black hover:bg-muted hover:text-black w-full">Transactions</Button>
                  <Button variant={"nonActive"} className="text-black hover:bg-muted hover:text-black w-full">Accounts</Button>
                  <Button variant={"nonActive"} className="text-black hover:bg-muted hover:text-black w-full">Categories</Button>
                  <Button variant={"nonActive"} className="text-black hover:bg-muted hover:text-black w-full">Settings</Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
