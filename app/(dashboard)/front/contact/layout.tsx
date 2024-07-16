import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sacred Shaadi Contact Us',
  description: 'Contact Sacred Shaadi for all your wedding needs'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
