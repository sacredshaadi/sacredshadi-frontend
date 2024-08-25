import * as ENDPOINTS from "./user.endpoints";
import * as SLIDER_ENDPOINTS from "./carousel.endpoints";
import * as CITY_ENDPOINTS from "./cities.endpoints";
import * as VENDOR_ENDPOINTS from "./vendor.endpoints";
import * as ADMIN_ENDPOINTS from "./admin.endpoints";
import * as FEEDBACK_ENDPOINTS from "./feedback.endpoints";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { ICity } from "@/types";

const feedbackKeys = {
  getAllFeedbacks: "getAllFeedbacks",
  getAllUserFeedbacks: "getAllUserFeedbacks",
  getAllVendorFeedbacks: "getAllVendorFeedbacks",
  updateFeedback: "updateFeedback",
  removeFeedback: "removeFeedback",
  createFeedback: "createFeedback"
};

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
  loginAdmin: "loginAdmin",
  vendorUpdateSubType: "vendorUpdateSubType",
  ...feedbackKeys
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

export const useGetAllVendorTypesMutation = (): UseMutationResult<any, Error, any, unknown> => {
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

export const useVendorUpdateSubTypeMutation = () => {
  return useMutation({
    mutationFn: VENDOR_ENDPOINTS.vendorUpdateSubType,
    mutationKey: [QUERY_KEYS.vendorUpdateSubType]
  });
};

export const useGetAllFeedbacksMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.getAllFeedbacks,
    mutationKey: [QUERY_KEYS.getAllFeedbacks]
  });
};

export const useGetAllUserFeedbacksMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.getAllUserFeedbacks,
    mutationKey: [QUERY_KEYS.getAllUserFeedbacks]
  });
};

export const useGetAllVendorFeedbacksMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.getAllVendorFeedbacks,
    mutationKey: [QUERY_KEYS.getAllVendorFeedbacks]
  });
};

export const useUpdateFeedbackMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.updateFeedback,
    mutationKey: [QUERY_KEYS.updateFeedback]
  });
};

export const useRemoveFeedbackMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.removeFeedback,
    mutationKey: [QUERY_KEYS.removeFeedback]
  });
};

export const useCreateFeedbackMutation = () => {
  return useMutation({
    mutationFn: FEEDBACK_ENDPOINTS.createFeedback,
    mutationKey: [QUERY_KEYS.createFeedback]
  });
};
