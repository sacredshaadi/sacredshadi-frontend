import z from "zod";
import { UserAuthType } from "@/types";
import { authEdnpoints } from "@/lib/apiConfig/endpoints";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
});
export type LoginFormDataType = z.infer<typeof loginFormSchema>;
export const loginFormDefaultValues: Partial<LoginFormDataType> = { email: "", password: "" };
export const loginConfig: Record<UserAuthType, { endpoint: string; defaultRedirect: string }> = {
  user: { endpoint: authEdnpoints.loginUser, defaultRedirect: "/" },
  vendor: { endpoint: authEdnpoints.loginVendor, defaultRedirect: "/" },
  super_admin: { endpoint: authEdnpoints.loginSuperAdmin, defaultRedirect: "/admin/dashboard" }
};

export const registerUserFormSchema = loginFormSchema.extend({
  name: z.string().min(0, { message: "Enter a valid name" }),
  phoneNo: z.string().min(0, { message: "Invalid phone number" }).length(10, {
    message: "Phone number must have 10 digits"
  })
});
export type RegisterUserBodyType = z.infer<typeof registerUserFormSchema>;
export const registerUserDefaultValues: Partial<RegisterUserBodyType> = { email: "demo@gmail.com", name: "Demo User" };

export const registerVendorFormSchema = registerUserFormSchema.extend({
  city: z.string().min(1, { message: "Please select a city from the list" }),
  service: z.string().min(1, { message: "Please select atleast 1 service" })
});
export type RegisterVendorBodyType = z.infer<typeof registerVendorFormSchema>;
export const registerVendorDefaultValues: Partial<RegisterVendorBodyType> = { ...registerUserDefaultValues };

export const useNavigateToNextScreenAfterSuccess = () => {};
