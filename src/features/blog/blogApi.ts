import apiClient from "../../services/axiosInstance"
import { Blog } from "../../types/redux/blogInterface"

export const createBlogApi = (data:Blog) => {
    return apiClient.post('/blog/create', data)
}

export const fetchBlogApi = (skip:number,limit:number) => {
    return apiClient.get(`/blog/get?skip=${skip}&limit=${limit}`)
}

export const fetchSinglBlogApi = (blogId:string) => {
    return apiClient.get(`/blog/get/${blogId}`)
}

export const likeBlogApi = (blogId:string) => {
    return apiClient.patch(`/blog/${blogId}/like`)
}

export const commentBlogApi = (blogId:string, comment:string) => {
    return apiClient.post(`/blog/${blogId}/comment/post-comments`,{comment})
}

export const replyCommentApi = (commentId:string, replyText:string) => {
    return apiClient.post(`/blog/comments/${commentId}/reply`, {replyText})
}

export const getCommentBlogApi = (blogId:string) => {
    return apiClient.get(`/blog/${blogId}/comment/get-comments`)
}