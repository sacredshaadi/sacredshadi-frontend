'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import ApiProvider from '@/lib/apiConfig/apiProvider';
// import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
  // session,
  children
}: {
  // session?: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ApiProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <SessionProvider  >{children}</SessionProvider> */}
          {children}
        </ThemeProvider>
      </ApiProvider>
    </>
  );
}
