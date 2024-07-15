'use client';

import React, { useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [loading, setLoading] = React.useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        throw new Error('User not found');
      }
      setLoading(false);
    } catch (err) {
      toast({
        title: 'User Authentication Error',
        description: 'An error occurred while fetching user data',
        variant: 'destructive'
      });
      console.error(err);
      router.push('/');
    } finally {
    }
  }, []);

  if (loading) return <div>loading...</div>;
  return <>{children}</>;
};

export default AuthWrapper;
