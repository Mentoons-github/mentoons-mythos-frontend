import apiClient from "../../services/axiosInstance";
import { IBlogV2 } from "../../types/redux/blogInterface";

export const createBlogApi = (data: IBlogV2) => {
  return apiClient.post("/blog/create", data);
};

export const fetchBlogApi = (skip: number, limit: number, sort?: string) => {
  return apiClient.get(`/blog/get?skip=${skip}&limit=${limit}&sort=${sort}`);
};

export const fetchBlogCountApi = () => {
  return apiClient.get("/blog/count");
};

export const fetchSinglBlogApi = (blogId: string) => {
  return apiClient.get(`/blog/get/${blogId}`);
};

export const likeBlogApi = (blogId: string) => {
  return apiClient.patch(`/blog/${blogId}/like`);
};

export const commentBlogApi = (blogId: string, comment: string) => {
  return apiClient.post(`/blog/${blogId}/comment/post-comments`, { comment });
};

export const replyCommentApi = (
  commentId: string,
  replyText: string,
  replyToUserId: string,
) => {
  return apiClient.post(`/blog/comments/${commentId}/reply`, {
    replyText,
    replyToUserId,
  });
};

export const getCommentBlogApi = (
  blogId: string,
  skip: number,
  limit: number,
) => {
  return apiClient.get(
    `/blog/${blogId}/comment/get-comments?skip=${skip}&limit=${limit}`,
  );
};

export const getReplyCommentBlogApi = (
  commentId: string,
  skip: number,
  limit: number,
) => {
  return apiClient.get(
    `/blog/${commentId}/reply/get-reply?skip=${skip}&limit=${limit}`,
  );
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

export const editCommentBlogApi = (commentId: string, newComment: string) => {
  return apiClient.patch(`/blog/comment/edit/${commentId}`, { newComment });
};

export const commentOffToggleApi = (blogId: string) => {
  return apiClient.patch(`/blog/commentOffToggle/${blogId}`);
};
