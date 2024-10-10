import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Sacred Shaadi Blog",
  description: "Make your wedding day special with Sacred Shaadi"
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
