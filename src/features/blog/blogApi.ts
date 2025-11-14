import apiClient from "../../services/axiosInstance";
import { Blog } from "../../types/redux/blogInterface";

export const createBlogApi = (data: Blog) => {
  return apiClient.post("/blog/create", data);
};

export const fetchBlogApi = (
  skip: number,
  limit: number,
  sort?: string,
  search?: string
) => {
  return apiClient.get(
    `/blog/get?skip=${skip}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

export const fetchBlogCountApi = () => {
  return apiClient.get('/blog/count')
}

export const fetchSinglBlogApi = (blogId: string) => {
  return apiClient.get(`/blog/get/${blogId}`);
};

export const likeBlogApi = (blogId: string) => {
  return apiClient.patch(`/blog/${blogId}/like`);
};

export const commentBlogApi = (blogId: string, comment: string) => {
  return apiClient.post(`/blog/${blogId}/comment/post-comments`, { comment });
};

export const replyCommentApi = (commentId: string, replyText: string) => {
  return apiClient.post(`/blog/comments/${commentId}/reply`, { replyText });
};

export const getCommentBlogApi = (blogId: string) => {
  return apiClient.get(`/blog/${blogId}/comment/get-comments`);
};

export const deleteCommentApi = (commentId: string) => {
  return apiClient.delete(`/blog/comment/delete/${commentId}`);
};

export const fetchUsersBlogApi = () => {
  return apiClient.get("/blog");
};

export const updateBlogViewApi = (blogId: string) => {
  return apiClient.patch(`/blog/${blogId}/views`);
};

export const fetchByMostReadApi = () => {
  return apiClient.get("/blog/most-read");
};

export const searchBlogApi = (search: string) => {
  return apiClient.get(`/blog/search?query=${search}`);
};

export const deleteBlogApi = (blogId: string) => {
  return apiClient.delete(`blog/delete/${blogId}`);
};
