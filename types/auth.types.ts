import z from "zod";

export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string()
});

export type LoginUser = z.infer<typeof loginUserSchema>;

export const registerUserSchema = loginUserSchema.extend({
  name: z.string()
});

export type RegisterUser = z.infer<typeof registerUserSchema>;

interface UserSub {
  name: string;
  email: string;
  password: string;
  role: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface User extends UserSub {}

interface VendorSubType {
  id: number;
  subType: string;
  vendorTypeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorType {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  vendorSubTypes: VendorSubType[];
}

export interface Vendor {
  vendorId: number;
  description?: string;
  details?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  email: string;
  phone?: string;
  vendorType: VendorType;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
