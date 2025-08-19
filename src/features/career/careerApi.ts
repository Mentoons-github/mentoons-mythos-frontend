import apiClient from "../../services/axiosInstance"
import { Career } from "../../types/redux/careerInterface"

export const appyCareerApi = (data:Career) => {
    return apiClient.post('career/apply',data)
}