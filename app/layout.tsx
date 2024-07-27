import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/layout/providers";

const font = Inter({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Sacred Shaadi",
  description: "One stop solution for all your wedding needs"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "overflow-auto")}>
        <NextTopLoader showSpinner={false} color="#E11D48" />
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
