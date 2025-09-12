import { createSlice } from "@reduxjs/toolkit";
import {
  commentBlogThunk,
  createBlogThunk,
  fetcheBlogThunk,
  fetchSinglBlogThunk,
  getCommentBlogThunk,
  likeBlogThunk,
  replyCommentThunk,
  fetchCurrentUserBlog,
  updateBlogViewThunk,
  fetchByMostReadThunk,
  searchBlogThunk,
  deleteBlogThunk,
  deleteCommentThunk,
  fetcheBlogCountThunk,
} from "./blogThunk";
import { Blog, Comments } from "../../types/redux/blogInterface";

interface SliceBlog {
  data: Blog[];
  adminBlog: Blog[];
  error: null | string | undefined;
  createblogSuccess: boolean;
  total: number;
  loading: boolean;
  message: string;
  userId: string;
  comments: Comments[];
  blog: Blog | null;
  mostReadBlogs: Blog[];
  searchBlogs: Blog[];
  searchLoading: boolean;
  fetchBlogLoading: boolean;
  success: boolean;
  blogId: string;
  deleteLoading: boolean;
  deleteSuccess: boolean;
  deleteMessage: string;
  blogCount:number
}

const initialState: SliceBlog = {
  data: [],
  adminBlog: [],
  error: null,
  loading: false,
  createblogSuccess: false,
  total: 0,
  message: "",
  userId: "",
  comments: [],
  blog: null as Blog | null,
  mostReadBlogs: [],
  searchBlogs: [],
  searchLoading: false,
  fetchBlogLoading: false,
  success: false,
  blogId: "",
  deleteLoading: false,
  deleteMessage: "",
  deleteSuccess: false,
  blogCount:0
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
      state.searchBlogs = [];
      state.searchLoading = false;
      state.success = false;
      state.blogId = "";
      state.deleteLoading = false;
      state.deleteMessage = "";
      state.deleteSuccess = false;
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
        state.data.unshift(action.payload.blog);
        state.createblogSuccess = true;
      })
      .addCase(createBlogThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // fetchBlog
      .addCase(fetcheBlogThunk.pending, (state) => {
        state.fetchBlogLoading = true;
        state.error = null;
      })
      .addCase(fetcheBlogThunk.fulfilled, (state, action) => {
        state.fetchBlogLoading = false;
        state.error = null;
        // state.data = [...state.data,...action.payload.blogs]
        const mergedPosts = [...state.data, ...action.payload.blogs];
        const uniquePosts = Array.from(
          new Map(mergedPosts.map((item) => [item._id, item])).values()
        );
        state.data = uniquePosts;
        state.adminBlog = action.payload.blogs; 
        state.total = action.payload.total;
        state.userId = action.payload.userId;
      })
      .addCase(fetcheBlogThunk.rejected, (state, action) => {
        state.fetchBlogLoading = false;
        state.error = action.payload;
      })

      //fetch blog count 
      .addCase(fetcheBlogCountThunk.pending, (state) => {
        state.fetchBlogLoading = true;
        state.error = null;
      })
      .addCase(fetcheBlogCountThunk.fulfilled, (state, action) => {
        state.fetchBlogLoading = false;
        state.error = null;
       state.blogCount = action.payload
      })
      .addCase(fetcheBlogCountThunk.rejected, (state, action) => {
        state.fetchBlogLoading = false;
        state.error = action.payload;
      })

      //fetch single blog
      .addCase(fetchSinglBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blog = action.payload;
      })
      .addCase(fetchSinglBlogThunk.rejected, (state, action) => {
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

      //reply-comment
      .addCase(replyCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(replyCommentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(replyCommentThunk.rejected, (state, action) => {
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
        state.comments = action.payload.comments;
      })
      .addCase(getCommentBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete comment
      .addCase(deleteCommentThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.deleteMessage = action.payload;
        state.deleteSuccess = true;
      })
      .addCase(deleteCommentThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      })

      //currentUserBlog
      .addCase(fetchCurrentUserBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
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

      //update blog views
      .addCase(updateBlogViewThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogViewThunk.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.error = null;
        state.loading = false;
      })
      .addCase(updateBlogViewThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      //most read blogs
      .addCase(fetchByMostReadThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchByMostReadThunk.fulfilled, (state, action) => {
        state.mostReadBlogs = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchByMostReadThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      //search blogs
      .addCase(searchBlogThunk.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchBlogThunk.fulfilled, (state, action) => {
        state.searchBlogs = action.payload.data;
        state.error = null;
        state.searchLoading = false;
      })
      .addCase(searchBlogThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.searchLoading = false;
      })

      //delete blog
      .addCase(deleteBlogThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteBlogThunk.fulfilled, (state, action) => {
        state.deleteMessage = action.payload.message;
        state.blogId = action.payload.blogId;
        state.error = null;
        state.deleteLoading = false;
        state.deleteSuccess = true;
        if (action.meta.arg) {
          state.data = state.data.filter((job) => job._id !== action.meta.arg);
        }
      })
      .addCase(deleteBlogThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.deleteLoading = false;
        state.deleteSuccess = true;
      });
  },
});

export default blogSlice.reducer;
export const { resetBlogSlice } = blogSlice.actions;
