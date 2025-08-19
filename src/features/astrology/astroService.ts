import apiClient from "../../services/axiosInstance";
import { ZodiacDetails } from "../../types";

export const getSunsignAndMoonsign = () => {
  return apiClient.get("/astrology/zodiac-signs");
};

export const updateZodiac = (data: ZodiacDetails) => {
  return apiClient.put("/astrology/update-zodiac", data);
};

export const checkRashi = () => {
  return apiClient.get("/astrology/checkUserRashi");
};

export const downloadAstroReport = (signType: "moon" | "sun") => {
  return apiClient.get(`/astrology/download-report?signType=${signType}`, {
    responseType: "blob",
  });
};
