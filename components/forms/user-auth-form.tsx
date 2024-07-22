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
import { useRegisterUserMutation } from "../api";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { ProfileTypes } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { fillerCities } from "@/constants/data";
import { VendorEnum } from "@/types/user-facing";
// import { useUserContext } from "@/app/context/user-context";
// import auth from '@/auth';

const formSchema = z.object({
  name: z.string().min(0, { message: "Enter a valid name" }),
  city: z.string().min(1, { message: "Please select a city from the list" }),
  service: z.string().min(1, { message: "Please select atleast 1 service" }),
  phoneNo: z.string().min(0, { message: "Enter a valid phone number" }).length(10, {
    message: "Enter a valid 10 digit phone number"
  }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  })
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserAuthFormProps {
  type: ProfileTypes;
}

export default function UserAuthForm({ type }: UserAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  // const { user, setUser } = useUserContext();

  const {
    mutate: registerUserFn
    // isPending
  } = useRegisterUserMutation();

  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get("callbackUrl");
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const disabled = isPending || loading;
  const defaultValues = {
    email: "demo@gmail.com",
    name: "Demo User",
    city: ""
    // password: 'password'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // useEffect(() => {
  //   console.log('env base url', process.env.NEXT_API_BASE_URL);
  // }, []);

  const onSubmit = async (data: UserFormValue) => {
    // signIn('credentials', {
    //   email: data.email,
    //   callbackUrl: callbackUrl ?? '/dashboard'
    // });
    // console.log("data to be registered", data);
    // return;

    try {
      registerUserFn(data, {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: "User registered successfully",
            variant: "default"
          });
          // console.log("data from registerUserFn", data);
          // console.log("User registered successfully");
          // console.log("redirecting to '/'");
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/");
        },
        onError: (error) => {
          // console.error(error);
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive"
          });
        }
      });
    } catch (err: any) {
      // console.error(`Error registering user: ${err.message}`);
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
                  <Input type="text" placeholder="Enter your name..." disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type == ProfileTypes.VENDOR && (
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
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your phone no..." disabled={loading} {...field} min={0} />
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

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Register User
          </Button>
        </form>
      </Form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleSignInButton /> */}
    </>
  );
}
