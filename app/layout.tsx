import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
// import { isAuthenticated } from '@/auth';
import { redirect } from 'next/navigation';
import Header from '@/components/layout/header/header';
import Footer from './_components/footer';

// import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sacred Shaadi',
  description: 'One stop solution for all your wedding needs'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
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
        <NextTopLoader />
        <Providers>
          <Toaster />
          {/* <Header /> */}
          {/* <div className="flex flex-col overflow-hidden"> */}
          {/* <Sidebar /> */}
          {/* <main className="flex-1 overflow-auto"> */}
          {children}
          {/* </main> */}
          {/* </div> */}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
