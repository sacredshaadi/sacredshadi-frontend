"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@/types/auth.types";
import { Input } from "@/components/ui/input";
import { fillerCities } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { VendorEnum } from "@/types/user-facing";
import apiClient from "@/lib/apiConfig/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { authEdnpoints } from "@/lib/apiConfig/endpoints";
import { useUserStore } from "@/app/context/user-context";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegisterVendorBodyType, registerVendorDefaultValues, registerVendorFormSchema } from "./helpers";

const RegisterVendor = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<RegisterVendorBodyType>({
    resolver: zodResolver(registerVendorFormSchema),
    defaultValues: registerVendorDefaultValues
  });

  const { mutate: registerUserFn, isPending } = useMutation({
    mutationKey: ["registerVendor"],
    mutationFn: (payload: RegisterVendorBodyType) => {
      return apiClient(authEdnpoints.registerUser, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
    }
  });

  const onSubmit = (data: RegisterVendorBodyType) => {
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
                <Input type="text" placeholder="Enter your name..." disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="city"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => form.setValue("city", value)}>
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
          name="service"
          control={form.control}
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

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email..." disabled={isPending} {...field} />
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
                <Input type="number" placeholder="Enter your phone no..." disabled={isPending} {...field} min={0} />
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
                  <Input type={showPassword ? "text" : "password"} placeholder="" disabled={isPending} {...field} />
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
          Register User
        </Button>
      </form>
    </Form>
  );
};

export default RegisterVendor;
