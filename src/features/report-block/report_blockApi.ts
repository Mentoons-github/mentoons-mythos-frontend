import apiClient from "../../services/axiosInstance";

export const getReportsApi = (
  page: number,
  limit: number,
  sort: string,
  filter?: string,
  search?: string,
) => {
  let url = `report-block/reports?page=${page}&limit=${limit}&sort=${sort}&search=${search}`;
  if (filter && filter !== "All") {
    url += `&from=${filter}`;
  }
  return apiClient.get(url);
};

export const getSingleReportApi = (reportId: string) => {
  return apiClient.get(`report-block/reports/${reportId}`);
};

export const deleteReportApi = (reportId: string) => {
  return apiClient.delete(`report-block/reports/${reportId}`);
};

export const takeReportActionApi = (reportId: string, action: string) => {
  return apiClient.patch(`report-block/reports/action/${reportId}`, { action });
};

export const blockUserFromBlogApi = (blockedUser: string, reason: string) => {
  return apiClient.post(`report-block/block`, { blockedUser, reason });
};

export const allBlockedDeatailsApi = () => {
  return apiClient.get(`report-block/block/all`);
};