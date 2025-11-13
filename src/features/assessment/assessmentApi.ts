import apiClient from "../../services/axiosInstance";
import {
  Assessment,
  AssessmentQuestion,
  InitialAssessmentSubmission,
} from "../../types/redux/assessmentInterface";

export const assessmentSubmitApi = (details: Assessment) => {
  return apiClient.post("/assessment/submit", details);
};

export const assessmentQuestionApi = (data: AssessmentQuestion) => {
  return apiClient.post("/assessment/new-question", data);
};

export const assessmentFetchApi = (name: string) => {
  return apiClient.get(`/assessment/fetch/${name}`);
};

export const fetchAllSubmissionApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string
) => {
  return apiClient.get(
    `assessment/getall?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

export const fetchSingleSubmissionApi = (submissionId: string) => {
  return apiClient.get(`/assessment/getSingle/${submissionId}`);
};

export const fetchInitialQuestionsApi = () => {
  return apiClient.get("/assessment/initial");
};

export const initialAssessmentSubmitApi = (
  details: InitialAssessmentSubmission,
  userId: string
) => {
  return apiClient.post(`/assessment/initial/submit/${userId}`, details);
};

export const getInitialAssessmentSubmissionsApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string
) => {
  return apiClient.get(
    `/assessment/initial/details?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

export const getSingleInitialAssessmentDetailsApi = (assessmentId: string) => {
  return apiClient.get(`/assessment/initial/details/${assessmentId}`);
};

//delete submittd assessment
export const deleteAssessmentSubmissionApi = (assessmentId:string) => {
  return apiClient.delete(`/assessment/delete/${assessmentId}`)
}
 
//delete initial submittd assessment
export const deleteInitialAssessmentSubmissionApi = (assessmentId:string) => {
  return apiClient.delete(`/assessment/initial/delete/${assessmentId}`)
}
 