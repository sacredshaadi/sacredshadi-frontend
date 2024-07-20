import { VendorType } from "@/types/auth.types";
import { vendorTypeUrls } from "../../lib/apiConfig/urls";

/**
 *  Get all vendor types
 * @returns @interface VendorType the list of all vendor types
 */

export async function getAllVendorTypes(): Promise<VendorType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${vendorTypeUrls.getAllVendorTypes}`);
    const data = await response.json();
    return data.data as VendorType[];
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 * Get the route from the title
 * @param title
 * @returns the route from the title
 */

export const getRouteFromTitle = (title: string) => {
  return title.toLowerCase().split(" ").join("-");
};
