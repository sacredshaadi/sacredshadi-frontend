import { VendorType } from "@/types/auth.types";
import { vendorTypeEndpoints, citiesEndpoints } from "@/lib/apiConfig/endpoints";
import { ICity } from "@/types";
import { Metadata } from "next";

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

type SeoRes = {
  id: number;
  url: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  createdAt: string;
  updatedAt: string;
};

const defaultMetadata: Metadata = {
  creator: "Sacred Shadi",
  robots: "index, follow",
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: { countryName: "India", images: ["/favicon.png"] }
};

export async function getUrlMetadataForSeo(props: {
  routeUrl: string;
  fallbackTitle: string;
  fallbackDescription: string;
}): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/seo/url?seoUrl=${props.routeUrl}`);
    if (!res) throw new Error("Not found");
    const data: { status: number; data: SeoRes[]; message: string } = await res.json();
    if (data.data.length === 0) throw new Error("No response");

    const metadata: Metadata = {
      ...defaultMetadata,
      keywords: data.data.reduce<string[]>((acc, curr) => [...acc, curr.metaKeywords], []),
      title: data.data[0].metaTitle,
      description: data.data[0].metaDescription,
      openGraph: {
        ...defaultMetadata.openGraph,
        title: data.data[0].metaTitle,
        description: data.data[0].metaDescription
      }
    };
    return metadata;
  } catch (err: any) {
    const metadata: Metadata = {
      ...defaultMetadata,
      title: props.fallbackTitle,
      description: props.fallbackDescription,
      openGraph: { ...defaultMetadata.openGraph, title: props.fallbackTitle, description: props.fallbackDescription }
    };
    return metadata;
  }
}
