import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogThunk,
  fetcheBlogThunk,
  fetchCurrentUserBlog,
} from "./blogThunk";
import { Blog } from "../../types/redux/blogInterface";

interface SliceBlog {
  data: Blog[];
  error: null | string | undefined;
  createblogSuccess: boolean;
  loading: boolean;
  message: string;
}

const initialState: SliceBlog = {
  data: [],
  error: null,
  loading: false,
  createblogSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //createBlog
      .addCase(createBlogThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createBlogThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
        state.createblogSuccess = true;
      })
      .addCase(createBlogThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      //fetch blog
      .addCase(fetcheBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetcheBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetcheBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCurrentUserBlog.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchCurrentUserBlog.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchCurrentUserBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default blogSlice.reducer;
