import apiClient from "../../services/axiosInstance";
import { QuizTypes } from "../../types/redux/mythosQuizType";

//create new quiz
export const createNewQuizApi = (newQuiz: QuizTypes) => {
  return apiClient.post("/quiz/create", newQuiz);
};

//get all quiz
export const getAllQuizesApi = () => {
  return apiClient.get("/quiz");
};

//get single quiz
export const getSingleQuizApi = (category: string) => {
  return apiClient.get(`/quiz/${category}`);
};

// delete quiz
export const deleteQuizApi = (quizId: string) => {
  return apiClient.delete(`/quiz/delete/${quizId}`);
};

//edit quiz
export const editQuizApi = (quizId: string, updatedData: QuizTypes) => {
  return apiClient.patch(`/quiz/update/${quizId}`, updatedData);
};
