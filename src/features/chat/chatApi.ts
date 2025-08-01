import apiClient from "../../services/axiosInstance"

export const getChatApi = (groupId:string) => {
    return apiClient.get(`chat/${groupId}`)
}