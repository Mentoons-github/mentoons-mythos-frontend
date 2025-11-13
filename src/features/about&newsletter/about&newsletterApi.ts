import apiClient from "../../services/axiosInstance";
import { IAboutComment } from "../../types/redux/about&newsletter";

//about
export const postAboutCommentApi = (data: IAboutComment) => {
  return apiClient.post("/about/comment", data);
};

export const getAboutCommentsApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string
) => {
  return apiClient.get(
    `/about/comments?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

export const getSingleAboutCommentApi = (commentId: string) => {
  return apiClient.get(`/about/comment/${commentId}`);
};

export const deleteAboutCommentApi = (commentId: string) => {
  return apiClient.delete(`/about/comment/delete/${commentId}`);
};

/* ****************************************************************************** */

//newsletter
export const subscribeNewsletterApi = (email: string) => {
  return apiClient.post("/newsletter/subscribe", { email });
};

export const getNewslettersApi = (
  page: number,
  limit: number,
  sort?: string,
  search?: string
) => {
  return apiClient.get(
    `/newsletter/subscribers?page=${page}&limit=${limit}&sort=${sort}&search=${search}`
  );
};

export const getSingleNewsletterApi = (newsletterId: string) => {
  return apiClient.get(`/newsletter/subscriber/${newsletterId}`);
};

export const deleteNewsletterApi = (newsletterId: string) => {
  return apiClient.delete(`/newsletter/subscriber/delete/${newsletterId}`);
};

export const sendMessageToMailApi = (data:{emails:string[],subject:string,message:string}) => {
  return apiClient.post('/newsletter/message', data)
} 
