'use client';
import { MoonIcon, SunIcon, PersonIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useUserContext } from '@/app/context/user-context';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/types/auth.types';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
type CompProps = {};
export default function ProfileComponent({}: CompProps) {
  const setUser = useUserContext((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const user = useUserContext((state) => state.user);
  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    try {
      if (user?.tokens?.accessToken) return;
      setLoading(true);
      const currUser = localStorage.getItem('user') || '';
      if (!currUser) {
        throw new Error('User not found');
      }
      // console.log('setting new user --> ', currUser);
      setUser(JSON.parse(currUser).data as User);
    } catch (err: any) {
      // toast({
      //   title: 'Error',
      //   description: err.message as string,
      //   variant: 'destructive'
      // });
      console.error(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.tokens?.accessToken) setLoading(false);
  }, [user]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, [user]);

  if (loading) {
    return (
      <Button variant={'outline'} size={'icon'}>
        <Loader2 className="h-4 animate-spin" />
      </Button>
    );
  } else if (!user)
    return (
      <Button variant={'outline'} onClick={() => router.push('/login')}>
        Login
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
          <PersonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
