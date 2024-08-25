import apiClient from "@/lib/apiConfig/apiClient";
import { feedbackEndpoints } from "@/lib/apiConfig/endpoints";

type mutationReqType = { accessToken: string; data: any };

export const getAllUserFeedbacks = (accessToken: string) => {
  return apiClient(feedbackEndpoints.getAllUserFeedbacks, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getAllVendorFeedbacks = (accessToken: string) => {
  return apiClient(feedbackEndpoints.getAllVendorFeedbacks, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getAllFeedbacks = (accessToken: string) => {
  return apiClient(feedbackEndpoints.getAllFeedbacks, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const updateFeedback = (payload: mutationReqType) => {
  return apiClient(feedbackEndpoints.updateFeedback, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const removeFeedback = (payload: mutationReqType) => {
  return apiClient(feedbackEndpoints.removeFeedback, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};

export const createFeedback = (payload: mutationReqType) => {
  return apiClient(feedbackEndpoints.createFeedback, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.accessToken}`
    },
    body: JSON.stringify(payload.data)
  });
};
