import type { Metadata } from 'next';
import Header from '@/components/layout/header/header';
import Footer from '@/app/_components/footer';

export const metadata: Metadata = {
  title: 'Sacred Shaadi Dashboard',
  description: 'One stop solution for all your wedding needs'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-col overflow-hidden">
        {/* <Sidebar /> */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <Footer />
    </>
  );
}
