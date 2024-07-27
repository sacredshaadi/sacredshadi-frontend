import { VendorType } from "@/types/auth.types";
import { vendorTypeEndpoints, citiesEndpoints } from "@/lib/apiConfig/endpoints";
import { ICity } from "@/types";

export async function getAllVendorTypes(): Promise<VendorType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${vendorTypeEndpoints.getAllVendorTypes}`);
    const data = await response.json();
    return data.data as VendorType[];
  } catch (err) {
    return [];
  }
}

export async function getAllCities(): Promise<ICity[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${citiesEndpoints.getAllCities}`);
    const data = await response.json();
    return data.data as ICity[];
  } catch (err) {
    return [];
  }
}

export const getRouteFromTitle = (title: string) => {
  return title.toLowerCase().split(" ").join("-");
};
