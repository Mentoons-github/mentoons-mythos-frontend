import apiClient from "../../services/axiosInstance";
import { Badge } from "../../types/redux/blogInterface";

export const createNewBadgeApi = (data: Badge) => {
  return apiClient.post("/badge/create", data);
};

export const collectBadgeApi = (badgeId: string) => {
  return apiClient.patch(`/badge/collect/${badgeId}`);
};

export const getMyBadgesApi = () => {
  return apiClient.get("/badge/me");
};

export const getAllBadgesApi = () => {
  return apiClient.get("/badge/all");
};

export const getSingleBadgeApi = (badgeId: string) => {
  return apiClient.get(`/badge/single/${badgeId}`);
};

export const removeBadgeFromUserApi = (badgeId: string) => {
  return apiClient.patch(`/badge/delete/user/${badgeId}`);
};

export const deleteBadgeApi = (badgeId: string) => {
  return apiClient.delete(`/badge/delete/${badgeId}`);
};

export const editBadgeApi = (badgId: string, badgeData: Badge) => {
  return apiClient.patch(`/badge/edit/${badgId}`, badgeData);
};

export const fetchBadgeAnimationApi = (badgeId: string) => {
  return apiClient.get(`/badge/animation/${badgeId}`);
};
