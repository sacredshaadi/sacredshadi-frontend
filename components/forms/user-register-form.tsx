"use client";

import * as z from "zod";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "../ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fillerCities } from "@/constants/data";
import { VendorEnum } from "@/types/user-facing";
import { useRegisterUserMutation } from "../api";
import { UserAuthType, userAuthTypes } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useUserStore } from "@/app/context/user-context";

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

interface UserAuthFormProps {
  type: UserAuthType;
}

export default function UserAuthForm(props: UserAuthFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser, setVendor, setSuperAdmin, ...users } = useUserStore();
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerUserFn } = useRegisterUserMutation();
  const defaultValues = { email: "demo@gmail.com", name: "Demo User", city: "" };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: baseDefaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      registerUserFn(data, {
        onSuccess: (data) => {
          toast({ title: "Success", description: "User registered successfully", variant: "default" });
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
          toast({ title: "Error", description: (error as any).error, variant: "destructive" });
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
        {props.type !== userAuthTypes.super_admin ? (
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
        ) : null}

        {props.type == userAuthTypes.vendor && (
          <>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select defaultValue={defaultValues.city} onValueChange={(value) => form.setValue("city", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fillerCities.map((city) => (
                          <SelectItem value={city} key={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Select defaultValue={""} onValueChange={(value) => form.setValue("service", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(VendorEnum).map((vendorType) => (
                          <SelectItem value={vendorType} key={vendorType}>
                            {vendorType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

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

        {props.type !== userAuthTypes.super_admin ? (
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
        ) : null}

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

        {props.type !== userAuthTypes.super_admin ? (
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Register User
          </Button>
        ) : null}

        {users[props.type] ? (
          <Button className="ml-auto w-full" variant="outline" type="reset" onClick={navigateToUserScreen}>
            <span>{props.type} is already logged in, take me there</span>
          </Button>
        ) : null}
      </form>
    </Form>
  );
}
