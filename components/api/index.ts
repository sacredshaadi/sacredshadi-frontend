import * as ENDPOINTS from "./user.endpoints";
import * as SLIDER_ENDPOINTS from "./carousel.endpoints";
import * as CITY_ENDPOINTS from "./cities.endpoints";
import * as VENDOR_ENDPOINTS from "./vendor.endpoints";
import { useMutation } from "@tanstack/react-query";

export const QUERY_KEYS = {
  getCart: "getCart",
  registerUser: "registerUser",
  loginUser: "loginUser",
  getSlider: "getSlider",
  getAllCities: "getAllCities",
  getAllVendorTypes: "getAllVendorTypes",
  registerVendor: "registerVendor",
  loginVendor: "loginVendor",
  vendorProfile: "vendorProfile"
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

export const useGetAllCitiesMutation = () => {
  return useMutation({
    mutationFn: CITY_ENDPOINTS.getAllCities,
    mutationKey: [QUERY_KEYS.getAllCities]
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
