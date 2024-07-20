import apiClient from "@/lib/apiConfig/apiClient";
import { useQuery } from "@tanstack/react-query";
import { VendorType } from "./types";

const baseUrl = "/api/v1";
const endpoints = {
  getVendorTypes: "/vendor-type/all"
};

export function useGetVendorTypesQuery() {
  return useQuery<{ data: VendorType[]; message: string; status: number }>({
    queryKey: ["getVendorTypes"],
    queryFn: () => apiClient(endpoints.getVendorTypes, { method: "GET" })
  });
}
