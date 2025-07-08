import apiClient from "../../services/axiosInstance"
import { LoginPayload, RegisterPayload } from "../../types/redux/authInterfaces"

export const registerApi = (userData:RegisterPayload) => {
    return apiClient.post('/auth/register',userData)
}

export const loginApi = (userData:LoginPayload) => {
    return apiClient.post('/auth/login',userData)
}