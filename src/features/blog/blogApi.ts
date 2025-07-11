import apiClient from "../../services/axiosInstance"
import { Blog } from "../../types/redux/blogInterface"

export const createBlogApi = (data:Blog) => {
    return apiClient.post('/blog/create', data)
}

export const fetchBlogApi = () => {
    return apiClient.get('/blog/get')
}