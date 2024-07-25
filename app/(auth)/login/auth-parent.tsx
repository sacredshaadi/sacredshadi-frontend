"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserAuthType, userAuthTypes } from "@/types";
import UserAuthForm from "@/components/forms/user-auth-form";
import UserLoginForm from "@/components/forms/user-login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/app/context/user-context";

const AuthParent = () => {
  const [login, setLogin] = useState(true);
  const [userType, setUserType] = useState<UserAuthType>(userAuthTypes.user);

  const handleChangeLoginType = () => {
    if (userType === userAuthTypes.super_admin) return;
    setLogin((prev) => !prev);
  };

  useEffect(() => {
    if (!useUserStore.persist?.hasHydrated()) useUserStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex h-full items-start p-4 pt-12 lg:p-8 lg:pt-24">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{login ? "Login to " : "Register"} your account</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below to login.</p>
        </div>

        <Tabs value={userType}>
          <TabsList className="w-full">
            <TabsTrigger value={userAuthTypes.user} onClick={() => setUserType(userAuthTypes.user)} className="w-1/2">
              I&apos;m a User
            </TabsTrigger>

            <TabsTrigger
              className="w-1/2"
              value={userAuthTypes.vendor}
              onClick={() => setUserType(userAuthTypes.vendor)}
            >
              I&apos;m a Vendor
            </TabsTrigger>

            <TabsTrigger
              className="w-1/2"
              value={userAuthTypes.super_admin}
              onClick={() => {
                setLogin(true);
                setUserType(userAuthTypes.super_admin);
              }}
            >
              I&apos;m an Admin
            </TabsTrigger>
          </TabsList>

          <TabsContent value={userAuthTypes.user}>
            {login ? <UserLoginForm type={userAuthTypes.user} /> : <UserAuthForm type={userAuthTypes.user} />}
          </TabsContent>
          <TabsContent value={userAuthTypes.vendor}>
            {login ? <UserLoginForm type={userAuthTypes.vendor} /> : <UserAuthForm type={userAuthTypes.vendor} />}
          </TabsContent>
          <TabsContent value={userAuthTypes.super_admin}>
            {login ? (
              <UserLoginForm type={userAuthTypes.super_admin} />
            ) : (
              <UserAuthForm type={userAuthTypes.super_admin} />
            )}
          </TabsContent>
        </Tabs>

        {userType !== userAuthTypes.super_admin ? (
          <span className="flex justify-center gap-1 space-x-2 text-sm">
            {login ? "New user?" : "Already have an account?"}
            <button onClick={handleChangeLoginType} className="text-primary underline">
              {login ? "Create an account" : "Login"}
            </button>
          </span>
        ) : null}

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
