import apiClient from "../../services/axiosInstance"
import { RegisterPayload } from "../../types/redux/authInterfaces"

export const registerApi = (userData:RegisterPayload) => {
    return apiClient.post('/auth/register',userData)
}