import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
