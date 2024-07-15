import AuthWraper from '@/app/(auth)/(signin)/auth-wrapper';
import AuthWrapper from '@/app/auth-wrapper';
import Header from '@/components/layout/header/header';
import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Matrimony Dashboard',
  description: 'Web Matrimony Dashboard with Next.js and Shadcn'
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden pt-16">{children}</main>
      </div>
    </AuthWrapper>
  );
}

export default DashboardLayout;
