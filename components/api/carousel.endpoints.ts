import apiClient from "@/lib/apiConfig/apiClient";
import { sliderUrls } from "@/lib/apiConfig/urls";

const getSlider = () => {
  return apiClient(sliderUrls.getAllCarousels, {
    method: "GET"
  });
};

export { getSlider };
