"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { User } from "@/types/auth.types";
import { Input } from "@/components/ui/input";
import { fillerCities } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { VendorEnum } from "@/types/user-facing";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/app/context/user-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerVendorFormSchema } from "./helpers";
import { useRegisterVendorMutation } from "@/components/api";

const RegisterVendor = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerVendorFn, isPending } = useRegisterVendorMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
    const { success, data, error } = registerVendorFormSchema.safeParse(values);
    if (!success || (error as any)?.errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Could not create account",
        description: <ul>{error?.errors.map((err, idx) => <li key={idx}>{err.message}</li>)}</ul>
      });
      return;
    }

    registerVendorFn(data, {
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
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label>Name</label>
        <Input name="name" type="text" placeholder="Enter your name..." required />
      </div>

      <div className="space-y-2">
        <label>City</label>
        <Select name="city" required>
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
      </div>

      <div className="space-y-2">
        <label>Service</label>
        <Select name="service" required>
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
