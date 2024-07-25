"use client";

import * as z from "zod";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { useToast } from "../ui/use-toast";
import { useLoginUserMutation } from "../api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAuthType, userAuthTypes } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUserStore } from "@/app/context/user-context";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserLoginForm(props: { type: UserAuthType }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: loginUserFn, isPending } = useLoginUserMutation();
  const { setUser, setVendor, setSuperAdmin, ...users } = useUserStore();
  const defaultValues = { email: "demo@gmail.com", name: "Demo User" };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      loginUserFn(data, {
        onSuccess: (data) => {
          toast({ title: "Success", description: "User logged in successfully", variant: "default" });
          if (props.type === userAuthTypes.super_admin) {
            setSuperAdmin(data.data);
            router.push("/admin/dashboard");
          } else if (props.type === userAuthTypes.vendor) {
            setVendor(data.data);
            router.push("/");
          } else if (props.type === userAuthTypes.user) {
            setUser(data.data);
            router.push("/");
          }
        },
        onError: (error) => {
          toast({ title: "Could not log in", description: (error as any).error, variant: "destructive" });
        }
      });
    } catch (err: any) {
      toast({ title: "Redirect error", description: err.message, variant: "destructive" });
    }
  };

  const navigateToUserScreen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.type === userAuthTypes.super_admin) router.push("/admin/dashboard");
    else if (props.type === userAuthTypes.vendor) router.push("/");
    else if (props.type === userAuthTypes.user) router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email..." disabled={loading} {...field} />
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
                  <Input type={showPassword ? "text" : "password"} placeholder="" disabled={loading} {...field} />
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
          <Button className="ml-auto w-full" variant="outline" type="reset" onClick={navigateToUserScreen}>
            <span>{props.type} is already logged in, take me there</span>
          </Button>
        ) : null}
      </form>
    </Form>
  );
}
