import apiClient from "../../services/axiosInstance";

export const fileUplaodApi = (file: File, category: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);
  return apiClient.post("/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // if you're using cookies
  });
};
