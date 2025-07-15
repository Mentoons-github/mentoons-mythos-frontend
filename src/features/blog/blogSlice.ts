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

  reducers: {
    resetBlogSlice: (state) => {
      console.log("Type of state.data:", typeof state.data);
      console.log("state.data instanceof Array:", state.data instanceof Array);
      console.log("state.data:", state.data);
      state.error = null;
      state.loading = false;
      state.message = "";
      state.createblogSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlogThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(createBlogThunk.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.message = action.payload.message;
        state.data.push(action.payload.blog);
        state.createblogSuccess = true;
      })
      .addCase(createBlogThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // fetchBlog
      .addCase(fetcheBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetcheBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload.blogs;
      })
      .addCase(fetcheBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchCurrentUserBlog
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
export const { resetBlogSlice } = blogSlice.actions;
