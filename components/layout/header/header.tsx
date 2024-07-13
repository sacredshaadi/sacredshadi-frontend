import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from '../mobile-sidebar';
import { UserNav } from '../user-nav';
import Link from 'next/link';
import ProfileComponent from './profile';
import { Heart } from 'lucide-react';
import TabsDemo from './Tabs/test';
import Tab from './Tabs';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex flex-col gap-0 border-b bg-background/95 backdrop-blur">
      <section
        className="flex h-14 items-center justify-between border-b
      px-4"
      >
        <div className="hidden lg:block">
          <span className="text-sm font-light">
            India's Favourite Wedding Planning Platform
          </span>
          {/* <Link
            href={'https://github.com/Kiranism/next-shadcn-dashboard-starter'}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link> */}
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          {/* <UserNav /> */}

          <ProfileComponent />
          <ThemeToggle />
        </div>
      </section>
      <nav className="flex items-center justify-between overflow-x-auto p-4">
        <section className="flex items-center justify-center gap-2">
          <Heart className="h-6 w-6 dark:text-white" />
          <span>Sacred Shaadi</span>
        </section>
        salslk
        <Tab route="saskl" value="aaskk" />
        ssdk
        {/* <TabsDemo /> */}
      </nav>
    </div>
  );
}
