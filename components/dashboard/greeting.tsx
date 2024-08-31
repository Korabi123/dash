/* eslint-disable @next/next/no-img-element */
"use client";

import { useUser } from "@clerk/nextjs"
import waveEmoji from "@/public/assets/wave_emoji.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export const GreetingSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser()

  useEffect(() => {
    setIsMounted(true);

    const greetings = [
      `Welcome back`,
      `Howdy`,
      `Heya`
    ]

    const randomGreeting = () => {
      setLoading(true);
      setTimeout(() => {
        setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
        setLoading(false);
      }, 500);
    };

    randomGreeting();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-12 ml-4">
      <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-white">
        {loading ? <Skeleton className="h-10 w-72 rounded-md inline-block" /> : greeting}, {loading ? <Skeleton className="h-10 w-48 rounded-md inline-block" /> : user?.firstName}!
        <img src={waveEmoji.src} alt="wave emoji" className="inline-block mb-2 ml-4 md:size-10 size-8" />
      </h1>
      <p className="text-[#d6d6d6]/60 mt-2 md:text-base text-xs">
        This is your Financial Overview Report
      </p>
    </div>
  );
}
