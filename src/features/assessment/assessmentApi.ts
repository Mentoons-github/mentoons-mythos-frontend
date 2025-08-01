import apiClient from "../../services/axiosInstance"
import { Assessment } from "../../types/redux/assessmentInterface"

export const assessmentSubmitApi = (details:Assessment) => {
    return apiClient.post('/assessment/submit',details)
}