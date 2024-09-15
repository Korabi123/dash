"use client";

import BrandingLogo from "@/public/branding/logo-white.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full bg-[#0b0221] px-4 py-[18px] sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto flex flex-row items-center justify-between">
        <div className="inline-flex items-center gap-2 cursor-pointer select-none">
          <Image src={BrandingLogo.src} height={25} width={25} alt="Dash Logo" />
          <span className="text-2xl font-semibold text-white">Dash</span>
        </div>
        <div className="flex items-center gap-8">
          <nav className="md:flex hidden items-center gap-5 font-light tracking-wide [font-size:14.5px]">
            <a href="#features" className="text-white hover:text-white/80">
              Features
            </a>
            <a href="#faq" className="text-white hover:text-white/80">
              FAQ&apos;s
            </a>
          </nav>
          <Button onClick={() => router.push("/dashboard/overview")} className="rounded-full min-w-[150px] text-sm font-[380] max-w-fit bg-white text-[#0b0221] hover:bg-white/80">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
