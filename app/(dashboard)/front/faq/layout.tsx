// import AuthWraper from '@/app/(auth)/(signin)/auth-wrapper';
// import Footer from '@/app/_components/footer';
// import AuthWrapper from '@/app/auth-wrapper';
// import Header from '@/components/layout/header/header';
// import Sidebar from '@/components/layout/sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Shaadi FAQ Section',
  description: 'Find answers to all your questions about Sacred Shaadi'
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1 overflow-auto">{children}</main>
    </>
  );
}

export default DashboardLayout;
