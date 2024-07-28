"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { UserAuthType } from "@/types";
import { User } from "@/types/auth.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiConfig/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/app/context/user-context";
import { LoginFormDataType, loginConfig, loginFormDefaultValues, loginFormSchema } from "./helpers";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const LoginForm = (props: { type: UserAuthType; useMutation: () => UseMutationResult<any, Error, any, unknown> }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setVendor, setSuperAdmin, ...users } = useUserStore();
  const form = useForm<LoginFormDataType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues
  });

  const { mutate: loginFn, isPending } = props.useMutation();

  useEffect(() => {
    if (!useUserStore.persist.hasHydrated()) useUserStore.persist.rehydrate();
  }, []);

  // const setUserStoreFn: Record<UserAuthType, (u: User | null) => void> = useMemo(
  //   () => ({ user: setUser, vendor: setVendor, super_admin: setSuperAdmin }),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  // const { mutate: loginFn, isPending } = useMutation({
  //   mutationKey: [props.type],
  //   mutationFn: (payload: LoginFormDataType) => {
  //     return apiClient(loginConfig[props.type].endpoint, {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //       headers: { "Content-Type": "application/json" }
  //     });
  //   }
  // });

  const cleanUp = useCallback(
    (data: any) => {
      if (props.type === "super_admin") {
        setSuperAdmin(data);
        router.push("/admin/dashboard");
      } else if (props.type === "vendor") {
        setVendor(data);
        router.push("/vendor/dashboard");
      } else {
        setUser(data);
        router.push("/");
      }
    },
    [form]
  );

  const onSubmit = (data: LoginFormDataType) => {
    loginFn(data, {
      onSuccess: (data: { data: any }) => {
        toast({ title: "Success", description: "Logged in successfully", variant: "default" });
        cleanUp(data.data);
      },
      onError: (err: any) => {
        toast({ title: "Could not log in", description: err.error, variant: "destructive" });
      }
    });
  };

  const navigateToUserScreen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(loginConfig[props.type].defaultRedirect); // TODO: also check for redirects
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <section className="flex items-center justify-between gap-2">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </section>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="ml-auto w-full" type="submit">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span>{isPending ? "Logging in.." : "Login"}</span>
        </Button>

        {users[props.type] ? (
          <Button className="ml-auto mt-2 w-full" variant="outline" type="reset" onClick={navigateToUserScreen}>
            <span>{props.type} is already logged in, take me there</span>
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LoginForm;
