import apiClient from "@/lib/apiConfig/apiClient";
import { albumEndpoints } from "@/lib/apiConfig/endpoints";

export const createAlbumInBulk = (payload: { accessToken: string; data: any }) => {
  return apiClient(albumEndpoints.createAlbumInBulk, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const deleteMedia = (payload: { accessToken: string; data: any }) => {
  return apiClient(albumEndpoints.deleteMedia, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const getAlbumByVendorId = (vendorId: number) => {
  return apiClient(`${albumEndpoints.getAlbumByVendorId}/${vendorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
};
