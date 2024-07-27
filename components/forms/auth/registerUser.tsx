"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterUserBodyType, registerUserDefaultValues, registerUserFormSchema } from "./helpers";
import { User } from "@/types/auth.types";
import { useUserStore } from "@/app/context/user-context";
import { useRegisterUserMutation } from "@/components/api";

const RegisterUser = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterUserBodyType>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: registerUserDefaultValues
  });

  const { mutate: registerUserFn } = useRegisterUserMutation();

  const onSubmit = (data: RegisterUserBodyType) => {
    registerUserFn(data, {
      onSuccess: (data: { data: User }) => {
        toast({ title: "Success", description: "Created Account Successfully", variant: "default" });
        setUser(data.data);
        router.replace("/");
      },
      onError: (err: any) => {
        toast({ title: "Could not create account", description: err.error, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@sacredshadi.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phoneNo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your phone no..." {...field} min={0} />
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

        <Button className="ml-auto w-full" type="submit">
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterUser;
