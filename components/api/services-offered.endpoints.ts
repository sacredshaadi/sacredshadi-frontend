import apiClient from "@/lib/apiConfig/apiClient";
import { offerEndpoints, searchEndpoints } from "@/lib/apiConfig/endpoints";

type mutationReqType = { accessToken: string; data: any };

export const createOffer = (payload: mutationReqType) => {
  return apiClient(offerEndpoints.createOffer, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const updateOffer = (payload: mutationReqType) => {
  return apiClient(offerEndpoints.updateOffer, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const getAllOffers = (accessToken: string) => {
  return apiClient(offerEndpoints.getAllOffers, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const removeOffer = (payload: mutationReqType) => {
  return apiClient(offerEndpoints.removeOffer, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const getOfferById = (offerId: string) => {
  return apiClient(`${searchEndpoints.search}/${offerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
};