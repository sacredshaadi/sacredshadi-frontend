import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sacred Shaadi",
  description: "One stop solution for all your wedding needs"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={`${inter.className} overflow-scroll`}>
        <NextTopLoader />
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body> */}

      <body className={`${inter.className} overflow-auto`}>
        <NextTopLoader showSpinner={false} color="#E11D48" />
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
