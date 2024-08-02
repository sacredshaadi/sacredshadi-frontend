import * as ENDPOINTS from "./user.endpoints";
import * as SLIDER_ENDPOINTS from "./carousel.endpoints";
import * as CITY_ENDPOINTS from "./cities.endpoints";
import * as VENDOR_ENDPOINTS from "./vendor.endpoints";
import * as ADMIN_ENDPOINTS from "./admin.endpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICity } from "@/types";

export const QUERY_KEYS = {
  getCart: "getCart",
  registerUser: "registerUser",
  loginUser: "loginUser",
  getSlider: "getSlider",
  getAllCities: "getAllCities",
  getAllVendorTypes: "getAllVendorTypes",
  registerVendor: "registerVendor",
  loginVendor: "loginVendor",
  vendorProfile: "vendorProfile",
  getAllVendorSubTypes: "getAllVendorSubTypes",
  loginAdmin: "loginAdmin"
};

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: ENDPOINTS.registerUser,
    mutationKey: [QUERY_KEYS.registerUser]
  });
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: ENDPOINTS.loginUser,
    mutationKey: [QUERY_KEYS.loginUser]
  });
};

export const useSliderMutation = () => {
  return useMutation({
    mutationFn: SLIDER_ENDPOINTS.getSlider,
    mutationKey: [QUERY_KEYS.getSlider]
  });
};

export const useGetAllCitiesQuery = () => {
  return useQuery<{ data: ICity[]; message: string; status: number }>({
    queryFn: CITY_ENDPOINTS.getAllCities,
    queryKey: [QUERY_KEYS.getAllCities]
  });
};

export const useGetAllVendorTypesMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.getAllVendorTypes,
    mutationKey: [QUERY_KEYS.getAllVendorTypes]
  });
};

export const useRegisterVendorMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.registerVendor,
    mutationKey: [QUERY_KEYS.registerVendor]
  });
};

export const useLoginVendorMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.loginVendor,
    mutationKey: [QUERY_KEYS.loginVendor]
  });
};

export const useVendorProfileMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.vendorProfile,
    mutationKey: [QUERY_KEYS.vendorProfile]
  });
};

export const useGetVendorAllSubTypesMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.getAllVendorSubTypes,
    mutationKey: [QUERY_KEYS.getAllVendorSubTypes]
  });
};

export const useAdminLoginMutation = () => {
  return useMutation({
    mutationFn: ADMIN_ENDPOINTS.loginAdmin,
    mutationKey: [QUERY_KEYS.loginAdmin]
  });
};

export const createSubVendorTypeMutation = () => {};
