import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils';
import Providers from '@/components/providers';
import Header from "@/components/header";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Tsinghua Search",
  description: "A better website to search for Tsinghua's Courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
