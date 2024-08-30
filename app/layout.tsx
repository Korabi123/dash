import type { Metadata } from "next";
import { Calistoga, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins" });
const calistoga = Calistoga({ subsets: ["latin"], weight: "400", variable: "--font-calistoga" });
export const metadata: Metadata = {
  title: {
    default: "Dash | Manage your finances",
    template: "%s | Dash",
  },
  description: "Dash is the future of finance. Dash is a simple, easy to use, and secure financial hub for all your financial needs.",
  openGraph: {
    type: "website",
    url: "http://localhost:3000",
    title: "Dash | Manage your finances",
    description: "Dash is the future of finance. Dash is a simple, easy to use, and secure financial hub for all your financial needs.",
    images: [
      "",
    ],
    siteName: "Dash",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dash | Manage your finances",
    description: "Dash is the future of finance. Dash is a simple, easy to use, and secure financial hub for all your financial needs.",
    creator: "@Korab_WebDev",
  },
  keywords: [
    "fintech",
    "finance",
    "banking",
    "payments",
    "wallet",
    "dash",
    "Dash",
    "Dash Finance",
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            inter.variable,
            poppins.variable,
            calistoga.variable,
            "font-inter antialiased"
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
