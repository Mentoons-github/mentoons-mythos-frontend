import apiClient from "../../services/axiosInstance";

export const getReportsApi = (page: number, limit: number, sort:string, filter?: string, search?:string) => {
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
