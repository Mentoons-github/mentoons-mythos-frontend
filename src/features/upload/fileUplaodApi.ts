import apiClient from "../../services/axiosInstance";

export const fileUploadApi = (file: File | File[], category: string) => {
  const formData = new FormData();

  if (Array.isArray(file)) {
    file.forEach((f) => formData.append("files", f)); 
  } else {
    formData.append("file", file);
  }

  formData.append("category", category);

  return apiClient.post("/upload/file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
