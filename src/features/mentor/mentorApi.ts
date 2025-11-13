import apiClient from "../../services/axiosInstance";
import { MentorTypes } from "../../types/redux/careerInterface";

export const submitMentorFormApi = (form: MentorTypes) => {
  return apiClient.post("mentor/submit", form);
};
