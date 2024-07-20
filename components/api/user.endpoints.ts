import apiClient from "@/lib/apiConfig/apiClient";
import { LoginUser, RegisterUser } from "@/types/auth.types";
import { userUrls } from "@/lib/apiConfig/urls";

export const registerUser = (payload: RegisterUser) => {
  return apiClient(userUrls.registerUserUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export const loginUser = (payload: LoginUser) => {
  return apiClient(userUrls.loginUserUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export const getUserProfile = (accessToken: string) => {
  return apiClient(userUrls.userProfileUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const removeUser = (accessToken: string) => {
  return apiClient(userUrls.removeUserUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
