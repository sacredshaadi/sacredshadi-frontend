'use client';

import UserAuthForm from '@/components/forms/user-auth-form';
import UserLoginForm from '@/components/forms/user-login-form';
import Link from 'next/link';
import React from 'react';

const AuthWraper = () => {
  const [login, setLogin] = React.useState(true);

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Login to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials below to login.
          </p>
        </div>
        {login ? <UserLoginForm /> : <UserAuthForm />}
        <span className="flex justify-center gap-1 space-x-2 text-sm">
          {login ? 'New user?' : 'Already have an account?'}
          <button
            onClick={() => setLogin((prev) => !prev)}
            className="text-primary underline"
          >
            {login ? 'Create an account' : 'Login'}
          </button>
        </span>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthWraper;
