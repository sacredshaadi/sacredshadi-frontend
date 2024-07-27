"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { User } from "@/types/auth.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerVendorFormSchema } from "./helpers";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/app/context/user-context";
import { useGetVendorTypesQuery } from "@/app/admin/_components/apis";
import { useGetAllCitiesQuery, useRegisterVendorMutation } from "@/components/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterVendor = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setVendor } = useUserStore();
  const { data: citiesRes } = useGetAllCitiesQuery();
  const [showPassword, setShowPassword] = useState(false);
  const { data: vendorTypesRes } = useGetVendorTypesQuery();
  const { mutate: registerVendorFn, isPending } = useRegisterVendorMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const _values = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
    const values = { ..._values, cityId: parseInt(_values.cityId), vendorTypeId: parseInt(_values.vendorTypeId) };
    const { success, data, error } = registerVendorFormSchema.safeParse(values);
    if (!success || (error as any)?.errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Could not create account",
        description: (
          <ul>
            {error?.errors.map((err, idx) => (
              <li key={idx}>
                {err.path}: {err.message}
              </li>
            ))}
          </ul>
        )
      });
      return;
    }

    registerVendorFn(data, {
      onSuccess: (data: { data: User }) => {
        toast({ title: "Success", description: "Created Account Successfully", variant: "default" });
        setVendor(data.data);
        router.replace("/");
      },
      onError: (err: any) => {
        toast({ title: "Could not create account", description: err.error, variant: "destructive" });
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label>Name</label>
        <Input name="name" type="text" placeholder="Enter your name..." required />
      </div>

      <div className="space-y-2">
        <label>City</label>
        <Select name="cityId" required>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {citiesRes?.data.map((city) => (
              <SelectItem value={city.id as any} key={city.id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label>Service</label>
        <Select name="vendorTypeId" required>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {vendorTypesRes?.data.map((vendorType) => (
              <SelectItem value={vendorType.id as any} key={vendorType.id}>
                {vendorType.type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label>Email</label>
        <Input name="email" type="email" placeholder="Enter your email..." required />
      </div>

      <div className="space-y-2">
        <label>Phone No.</label>
        <Input name="phoneNo" type="number" placeholder="Enter your phone no..." required />
      </div>

      <div className="space-y-2">
        <label>Password</label>
        <section className="flex items-center justify-between gap-2">
          <Input name="password" type={showPassword ? "text" : "password"} required />
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
          </Button>
        </section>
      </div>

      <Button disabled={isPending} className="ml-auto w-full" type="submit">
        Register Vendor
      </Button>
    </form>
  );
};

export default RegisterVendor;
