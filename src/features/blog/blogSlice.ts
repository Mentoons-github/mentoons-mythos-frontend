import { createSlice } from "@reduxjs/toolkit";
import { commentBlogThunk, createBlogThunk, fetcheBlogThunk, getCommentBlogThunk, likeBlogThunk } from "./blogThunk";
import { Blog } from "../../types/redux/blogInterface";

interface SliceBlog {
  data: Blog[];
  error: null | string | undefined;
  createblogSuccess: boolean;
  total: number;
  loading: boolean;
  message: string;
  userId: string;
  comments:string[]
}

const initialState: SliceBlog = {
  data: [],
  error: null,
  loading: false,
  createblogSuccess: false,
  total: 0,
  message: "",
  userId: "",
  comments:[]
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlogSlice: (state) => {
      state.error = null;
      state.loading = false;
      state.message = "";
      state.createblogSuccess = false;
    },
  },
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
        state.data.unshift(action.payload.blog);
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
        state.data = [...state.data, ...action.payload.blogs];
        state.total = action.payload.total;
        state.userId = action.payload.userId;
      })
      .addCase(fetcheBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //like blog
      .addCase(likeBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        const { blogId, likes } = action.payload;

        const blog = state.data.find((b) => b._id === blogId);
        if (blog) {
          blog.likes = likes;
        }
      })
      .addCase(likeBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //post-comment
      .addCase(commentBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        
      })
      .addCase(commentBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get-comments
      .addCase(getCommentBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.comments = action.payload.comments
      })
      .addCase(getCommentBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default blogSlice.reducer;
export const { resetBlogSlice } = blogSlice.actions;
