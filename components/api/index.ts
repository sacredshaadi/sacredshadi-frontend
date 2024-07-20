import * as ENDPOINTS from "./user.endpoints";
import * as SLIDER_ENDPOINTS from "./carousel.endpoints";
import { useMutation } from "@tanstack/react-query";

export const QUERY_KEYS = {
  getCart: "getCart",
  registerUser: "registerUser",
  loginUser: "loginUser",
  getSlider: "getSlider"
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
