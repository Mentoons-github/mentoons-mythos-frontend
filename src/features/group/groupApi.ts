import apiClient from "../../services/axiosInstance";

export const getRashiGroupMembersApi = (rashi: string) => {
  return apiClient.get(`/groups/rashi/members/${rashi}`);
};

export const getIntelligenceGroupMembersApi = (intelligence: string) => {
  return apiClient.get(`/groups/intelligence/members/${intelligence}`);
};
