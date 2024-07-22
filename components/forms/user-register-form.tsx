"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
// import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import GoogleSignInButton from "../github-auth-button";
import { registerVendorMutation, useRegisterUserMutation } from "../api";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { ProfileTypes } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { fillerCities } from "@/constants/data";
import { VendorEnum } from "@/types/user-facing";
// import { useUserContext } from "@/app/context/user-context";
// import auth from '@/auth';

const formSchema = z.object({
  name: z.string().min(1, { message: "Enter your name" }),
  phoneNo: z.string().min(0, { message: "Enter a valid phone number" }).length(10, {
    message: "Enter a valid 10 digit phone number"
  }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  })
});

const vendorRegisterFormSchema = formSchema.extend({
  city: z.number().min(1, { message: "Please select a city" }),
  service: z.number().min(1, { message: "Please select a service" })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: registerUserFn, isPending: isUserPending } = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const baseDefaultValues = { email: "demo@gmail.com", name: "Demo User", city: "", phoneNo: "1234567890" };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: baseDefaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    console.log("data: ", data);
    // return;

    try {
      registerUserFn(data, {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: "User registered successfully",
            variant: "default"
          });
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/");
        },
        onError: (error: any) => {
          // console.error(error);
          toast({
            title: "Error",
            description: error.message || error.error || "Error registering user",
            variant: "destructive"
          });
        }
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Redirect error",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name..." disabled={isUserPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email..." disabled={isUserPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your phone no..."
                    disabled={isUserPending}
                    {...field}
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <section className="flex items-center justify-between gap-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      disabled={isUserPending}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      // className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => {
                        // console.log("clicked");
                        setShowPassword((prev) => !prev);
                      }}
                      // disabled={disabled}
                    >
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

          <Button disabled={isUserPending} className="ml-auto w-full" type="submit">
            {isUserPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register User
          </Button>
        </form>
      </Form>
    </>
  );
}
