"use client";

import Link from "next/link";
import { useState } from "react";
import { userAuthTypes } from "@/types";
import LoginForm from "@/components/forms/auth/login";
import RegisterUser from "@/components/forms/auth/registerUser";
import RegisterVendor from "@/components/forms/auth/registerVendor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthParent = () => {
  const [login, setLogin] = useState(true);
  const handleChangeLoginType = () => setLogin((prev) => !prev);

  return (
    <div className="flex h-full items-start p-4 pt-12 lg:p-8 lg:pt-24">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{login ? "Login to " : "Register"} your account</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below to login.</p>
        </div>

        <Tabs defaultValue={userAuthTypes.user}>
          <TabsList className="w-full">
            <TabsTrigger value={userAuthTypes.user} className="w-1/2">
              I&apos;m a User
            </TabsTrigger>

            <TabsTrigger className="w-1/2" value={userAuthTypes.vendor}>
              I&apos;m a Vendor
            </TabsTrigger>
          </TabsList>

          <TabsContent value={userAuthTypes.user}>
            {login ? <LoginForm type={userAuthTypes.user} /> : <RegisterUser />}
          </TabsContent>
          <TabsContent value={userAuthTypes.vendor}>
            {login ? <LoginForm type={userAuthTypes.vendor} /> : <RegisterVendor />}
          </TabsContent>
        </Tabs>

        <span className="flex justify-center gap-1 space-x-2 text-sm">
          {login ? "New user?" : "Already have an account?"}
          <button onClick={handleChangeLoginType} className="text-primary underline">
            {login ? "Create an account" : "Login"}
          </button>
        </span>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our&nbsp;
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthParent;
