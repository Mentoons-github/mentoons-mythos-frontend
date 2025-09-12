import apiClient from "../../services/axiosInstance";
import {
  ApplicationFilters,
  AssignementSend,
  Career,
  IJobs,
} from "../../types/redux/careerInterface";

export const appyCareerApi = (data: Career, jobId: string) => {
  return apiClient.post(`career/apply/${jobId}`, data);
};

export const getJobsApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string
) => {
  return apiClient.get(
    `career/jobs?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

export const fetchJobCountApi = () => {
  return apiClient.get(`career/job/get/count`);
};

export const getSingleJobApi = (jobId: string) => {
  return apiClient.get(`career/job/${jobId}`);
};

export const addNewJobApi = (job: IJobs) => {
  return apiClient.post("career/job/createjob", job);
};

export const updateJobApi = (datas: IJobs, jobId: string) => {
  return apiClient.put(`career/job/update/${jobId}`, datas);
};

export const deleteJobApi = (jobId: string) => {
  return apiClient.delete(`career/job/delete/${jobId}`);
};

export const getAllApplicationsApi = (
  page: number,
  limit: number,
  sort?:string,
  search?:string,
  filters: ApplicationFilters = {}
) => {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));
  params.append("sort", String(sort));
  params.append("search", String(search));

  if (filters.genders && filters.genders.length > 0) {
    params.append("genders", filters.genders.join(","));
  }

  if (filters.jobTitles && filters.jobTitles.length > 0) {
    params.append("jobTitles", filters.jobTitles.join(","));
  }

  if (filters.locations && filters.locations.length > 0) {
    params.append("locations", filters.locations.join(","));
  }

  if (filters.status && filters.status.length > 0) {
    params.append("status", filters.status.join(","));
  }

  return apiClient.get(`/career/job/get/applications?${params.toString()}`);
};

export const fetchJobApplicationCountApi = () => {
  return apiClient.get("/career/job/application/count")
}

export const deleteJobApplicationApi = (applicationId: string) => {
  return apiClient.delete(`career/job/application/delete/${applicationId}`);
};

export const deleteSelectedJobApplicationsApi = (applicationIds: string[]) => {
  return apiClient.delete("career/job/application/delete", {
    data: { applicationIds },
  });
};

export const getSingleJobApplicationApi = (applicationId: string) => {
  return apiClient.get(`/career/job/get/application/${applicationId}`);
};

export const sendAssignementsApi = (details: AssignementSend) => {
  return apiClient.post(`/career/job/application/assignement`, details);
};

export const updateStatusApi = (data: {
  applicationIds: string[];
  status: string;
}) => {
  return apiClient.patch("/career/job/application/status", data);
};
