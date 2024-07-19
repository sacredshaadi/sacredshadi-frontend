'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem, routeMapper } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';

interface DashboardNavProps {
  items: { [key: string]: string };
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  // if (!items?.length) {
  //   return null;
  // }

  // console.log('isActive', isMobileNav, isMinimized);

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {Object.entries(routeMapper).map(([key, val], idx) => {
          // const Icon = Icons[item.icon || 'arrowRight'];
          return (
            <>
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <Link
                    href={val ? val : '/'}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === val ? 'bg-accent' : 'transparent'
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    {/* <Icon className={`ml-3 size-5`} /> */}

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{key}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {key}
                </TooltipContent>
              </Tooltip>
            </>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
