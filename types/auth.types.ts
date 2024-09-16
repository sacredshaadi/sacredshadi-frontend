import z from "zod";

export const loginUserSchema = z.object({
  phone: z.string(),
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

export interface VendorSubType {
  id?: string | number;
  subType: string;
  vendorSubTypeId: number;
  vendorTypeId: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorType {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  shortDescription: string;
  vendorSubTypes: VendorSubType[];
}

export interface ServiceOffered {
  id: number;
  price: number;
  description: string;
  details: string;
  serviceOfferedId: number;
}

export interface Media {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
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
  socialMedia: {
    facebookUrl: string;
    instagramUrl: string;
    twitterUrl: string;
    youtubeUrl: string;
    pinterestUrl: string;
  };
  SelectedVendorSubTypes: VendorSubType[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  offeredServices: ServiceOffered[];
}
