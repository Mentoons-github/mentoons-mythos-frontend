import apiClient from "../../services/axiosInstance"
import { CareerGPSTypes } from "../../types/redux/about&newsletter"

export const submitCareerGpsApi = (details:CareerGPSTypes)  => {
    return apiClient.post("/career-gps/submit", details)
}