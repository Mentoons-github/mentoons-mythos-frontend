import { createSlice } from "@reduxjs/toolkit";
import {
  createNewQuizThunk,
  deleteQuizThunk,
  editQuizThunk,
  getAllQuizesThunk,
  getSingleQuizThunk,
} from "./quizThunk";
import { QuizTypes } from "../../types/redux/mythosQuizType";

interface SliceQuiz {
  loading: boolean;
  success: boolean;
  createSuccess: boolean;
  deleteSuccess: boolean;
  deleteLoading: boolean;
  editSuccess: boolean;
  editLoading: boolean;
  message: string;
  error: null | string | undefined;
  allQuizes: QuizTypes[];
  singleQuiz: QuizTypes | null;
}

const initialState: SliceQuiz = {
  loading: false,
  success: false,
  createSuccess: false,
  deleteSuccess: false,
  deleteLoading: false,
  editSuccess: false,
  editLoading: false,
  message: "",
  error: null,
  allQuizes: [],
  singleQuiz: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuizSlice: (state) => {
      state.error = null;
      state.message = "";
      state.success = false;
      state.createSuccess = false;
      state.deleteSuccess = false;
      state.loading = false;
      state.editSuccess = false;
      state.editLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //create new quiz
      .addCase(createNewQuizThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createNewQuizThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.createSuccess = true;

        const newQuiz = action.payload.quiz;
        state.allQuizes.push(newQuiz);
      })
      .addCase(createNewQuizThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.createSuccess = false;
        state.loading = false;
      })

      //get all quiz
      .addCase(getAllQuizesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQuizesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuizes = action.payload;
        state.success = true;
      })
      .addCase(getAllQuizesThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //single quiz
      .addCase(getSingleQuizThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleQuizThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleQuiz = action.payload;
        state.success = true;
      })
      .addCase(getSingleQuizThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //delete quiz
      .addCase(deleteQuizThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteQuizThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.message = action.payload;
        state.deleteSuccess = true;
        const quizId = action.meta.arg;
        state.allQuizes = state.allQuizes.filter((quiz) => quiz._id !== quizId);
      })
      .addCase(deleteQuizThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.deleteLoading = false;
      })

      //edit quiz
      .addCase(editQuizThunk.pending, (state) => {
        state.editLoading = true;
        state.error = null;
      })
      .addCase(editQuizThunk.fulfilled, (state, action) => {
        state.editLoading = false;
        state.message = action.payload;
        state.editSuccess = true;
        const quizId = action.meta.arg.quizId;
        const editedQuiz = action.meta.arg.updatedData;
        state.allQuizes = state.allQuizes.map((quiz) =>
          quiz._id == quizId ? { ...quiz, ...editedQuiz } : quiz,
        );
      })
      .addCase(editQuizThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.editLoading = false;
      });
  },
});

export default quizSlice.reducer;
export const { resetQuizSlice } = quizSlice.actions;
