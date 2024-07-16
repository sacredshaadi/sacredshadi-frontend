// import { auth } from '@/auth';

import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacred Shaadi Login',
  description: 'Login to Sacred Shaadi'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={`${inter.className} overflow-scroll`}>
    //     <Providers>
    //       <Toaster />
    <div className="flex flex-col overflow-hidden">
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
    //     </Providers>
    //   </body>
    // </html>
  );
}
