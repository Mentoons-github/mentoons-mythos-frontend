import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuizTypes } from "../../types/redux/mythosQuizType";
import {
  createNewQuizApi,
  deleteQuizApi,
  editQuizApi,
  getAllQuizesApi,
  getSingleQuizApi,
} from "./quizApi";
import { AxiosError } from "axios";

//create new quiz
export const createNewQuizThunk = createAsyncThunk<
  { message: string; quiz: QuizTypes },
  QuizTypes,
  { rejectValue: string }
>("quiz/create", async (newQuiz, { rejectWithValue }) => {
  try {
    const res = await createNewQuizApi(newQuiz);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant Create blog",
    );
  }
});

//get all quiz
export const getAllQuizesThunk = createAsyncThunk<
  QuizTypes[],
  void,
  { rejectValue: string }
>("quiz/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await getAllQuizesApi();
    return res.data.quizes;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant fetch blog");
  }
});

//get single quiz
export const getSingleQuizThunk = createAsyncThunk<
  QuizTypes,
  string,
  { rejectValue: string }
>("quiz/single", async (category, { rejectWithValue }) => {
  try {
    const res = await getSingleQuizApi(category);
    return res.data.quiz;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant fetch blog");
  }
});

//get single quiz
export const deleteQuizThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("quiz/delete", async (category, { rejectWithValue }) => {
  try {
    const res = await deleteQuizApi(category);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error?.response?.data?.message || "Cant delete blog",
    );
  }
});

//edit quiz
export const editQuizThunk = createAsyncThunk<
  string,
  { updatedData: QuizTypes; quizId: string },
  { rejectValue: string }
>("quiz/update", async ({ updatedData, quizId }, { rejectWithValue }) => {
  try {
    const res = await editQuizApi(quizId, updatedData);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error?.response?.data?.message || "Cant edit blog");
  }
});
