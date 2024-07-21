import apiClient from "@/lib/apiConfig/apiClient";
import { vendorTypeUrls } from "@/lib/apiConfig/urls";

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
