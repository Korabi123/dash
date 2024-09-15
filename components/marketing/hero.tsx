"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button"

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="h-full md:bg-transparent bg-[#0b0221] border-b pb-48 border-white/15 w-full mt-24 flex flex-col items-center justify-center gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <Button size={'lg'} variant={"outline"} className="rounded-full hover:bg-white/5 hover:text-white min-w-[150px] [font-size:15.5px] tracking-wide font-[300] max-w-fit bg-transparent border-white/15 text-white/70">
        We just launched Dash
      </Button>
      <h1 className="lg:text-7xl md:text-5xl text-4xl text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white">Modern financing <br /> for the modern world</h1>
      <p className="max-w-md text-center font-[330] -mt-2 text-slate-300/60">
        Dash is the future of finance. Dash is a simple, easy to use, and secure financial hub for all your financial needs.
      </p>
      <div className="flex flex-row items-center justify-center gap-6">
        <Button onClick={() => router.push("/sign-up")} size={'lg'} variant={"default"} className="rounded-full hover:text-black min-w-[150px] [font-size:15.5px] tracking-wide font-[380] max-w-fit bg-white text-[#0b0221] hover:bg-white/90">
          Get Started
        </Button>
        <Button onClick={() => router.push('/sign-in')} size={'lg'} variant={"outline"} className="rounded-full hover:bg-white/5 hover:text-white min-w-[150px] [font-size:15.5px] tracking-wide font-[380] max-w-fit bg-transparent border-white/15 text-white/70">
          Login
        </Button>
      </div>
    </div>
  )
}
