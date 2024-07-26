import apiClient from "@/lib/apiConfig/apiClient";
import { vendorTypeUrls, vendorUrls } from "@/lib/apiConfig/urls";

export const createVendorType = (accessToken: string, payload: any) => {
  return apiClient(vendorTypeUrls.createVendorTypeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload)
  });
};

export const getAllVendorTypes = () => {
  return apiClient(vendorTypeUrls.getAllVendorTypes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const removeVendorType = (accessToken: string) => {
  return apiClient(vendorTypeUrls.removeVendorType, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const updateVendorType = (accessToken: string) => {
  return apiClient(vendorTypeUrls.updateVendorType, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const registerVendor = (payload: any) => {
  return apiClient(vendorUrls.registerVendorUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export const loginVendor = (payload: any) => {
  return apiClient(vendorUrls.loginVendors, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export const vendorProfile = (accessToken: string) => {
  return apiClient(vendorUrls.vendorProfile, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
    // body: JSON.stringify(payload)
  });
};
