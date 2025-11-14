import apiClient from "../../services/axiosInstance";
import { EnquiryI, WorkshopI } from "../../types/redux/workshopInterface";

// add workshop
export const addWorkshopApi = (details: WorkshopI) => {
  return apiClient.post("/workshop/add-new", details);
};

// get all workshops
export const getAllWorkshopsApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string
) => {
  return apiClient.get(
    `/workshop/get?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

//register workshop
export const registerWorkshopApi = (details: EnquiryI, workshopId: string) => {
  return apiClient.post(`/workshop/register/${workshopId}`, details);
};

// workshop enquiries get
export const workshopEnquiriesApi = (
  page: number,
  limit: number,
  sort: string,
  search?: string
) => {
  return apiClient.get(
    `/workshop/enquiries?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

// workshop count
export const fetchWorkshopCountApi = () => {
  return apiClient.get("workshop/get/count");
};

//single Workshop
export const singleWorkshopApi = (workshopId: string) => {
  return apiClient.get(`/workshop/${workshopId}`);
};

//delete workshop
export const deleteWorkshopApi = (workshopId: string) => {
  return apiClient.delete(`/workshop/delete/${workshopId}`);
};

export const updateWorkshopApi = (data: WorkshopI, workshopId: string) => {
  return apiClient.put(`/workshop/edit/${workshopId}`, data);
};

// enquiry count
export const fetchEnquiryCountApi = () => {
  return apiClient.get("workshop/enquiries/get/count");
};

//single enquiry
export const singleEnquiryApi = (enquiryId: string) => {
  return apiClient.get(`/workshop/enquiries/${enquiryId}`);
};

//delete enquiry
export const deleteEnquiryApi = (enquiryId: string) => {
  return apiClient.delete(`/workshop/enquiries/delete/${enquiryId}`);
};
