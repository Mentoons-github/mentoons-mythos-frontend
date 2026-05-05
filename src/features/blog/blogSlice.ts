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
  getReplyCommentBlogThunk,
  editCommentBlogThunk,
  commentOffToggleThunk,
} from "./blogThunk";
import {
  Comments,
  IBlogV2,
  IReply,
  Reward,
} from "../../types/redux/blogInterface";

interface SliceBlog {
  // data: Blog[];
  data: IBlogV2[];
  adminBlog: IBlogV2[];
  error: null | string | undefined;
  createblogSuccess: boolean;
  total: number;
  loading: boolean;
  message: string;
  userId: string;
  comments: Comments[];
  replyComments: IReply[];
  commentSubmitLoading: boolean;
  commentSubmitSuccess: boolean;
  blog: IBlogV2 | null;
  mostReadBlogs: IBlogV2[];
  searchBlogs: IBlogV2[];
  searchLoading: boolean;
  fetchBlogLoading: boolean;
  success: boolean;
  blogId: string;
  deleteLoading: boolean;
  deleteSuccess: boolean;
  deleteMessage: string;
  blogCount: number;
  rewardPoints: Reward | null;
  likeSuccess: boolean;
  commentTotal: number;
  replyCommentTotal: number;
  currentPostId: string | null;
  currentReplyCommentId: string | null;
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
  replyComments: [],
  commentSubmitLoading: false,
  commentSubmitSuccess: false,
  blog: null as IBlogV2 | null,
  mostReadBlogs: [],
  searchBlogs: [],
  searchLoading: false,
  fetchBlogLoading: false,
  success: false,
  blogId: "",
  deleteLoading: false,
  deleteMessage: "",
  deleteSuccess: false,
  blogCount: 0,
  rewardPoints: null,
  likeSuccess: false,
  commentTotal: 0,
  replyCommentTotal: 0,
  currentPostId: null,
  currentReplyCommentId: null,
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
      state.commentSubmitLoading = false;
      state.commentSubmitSuccess = false;
      state.searchBlogs = [];
      state.searchLoading = false;
      state.success = false;
      state.blogId = "";
      state.deleteLoading = false;
      state.deleteMessage = "";
      state.deleteSuccess = false;
      state.rewardPoints = null;
      state.likeSuccess = false;
      state.commentTotal = 0;
      state.replyCommentTotal = 0;
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
        state.rewardPoints = action.payload.reward;
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
          new Map(mergedPosts.map((item) => [item._id, item])).values(),
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
        state.blogCount = action.payload;
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
        state.likeSuccess = false;
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
        state.rewardPoints = action.payload.reward;
        state.likeSuccess = true;
      })
      .addCase(likeBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.likeSuccess = false;
      })

      //post-comment
      .addCase(commentBlogThunk.pending, (state) => {
        state.commentSubmitLoading = true;
        state.error = null;
        state.commentSubmitSuccess = false;
      })
      .addCase(commentBlogThunk.fulfilled, (state, action) => {
        state.commentSubmitLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.commentSubmitSuccess = true;
        const blogId = action.meta.arg.blogId;
        const newComment = action.payload.newComment;
        console.log(newComment, "newwwww");

        state.rewardPoints = action.payload.reward;
        state.data = state.data.map((post) =>
          post._id === blogId
            ? {
                ...post,
                commentCount: (post.commentCount || 0) + 1,
              }
            : post,
        );

        state.comments.unshift(newComment);

        // 🔹 Update single blog (modal)
        if (state.blog && state.blog._id === blogId) {
          state.blog.commentCount = (state.blog.commentCount || 0) + 1;
        }
      })
      .addCase(commentBlogThunk.rejected, (state, action) => {
        state.commentSubmitLoading = false;
        state.error = action.payload;
        state.commentSubmitSuccess = false;
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
        const newReply = action.payload.comment;
        state.replyComments.push(newReply);
        const commentId = action.meta.arg.commentId;
        state.comments = state.comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replyCount: (comment.replyCount || 0) + 1 }
            : comment,
        );
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

        const postId = action.meta.arg.blogId;
        state.commentTotal = action.payload.total;
        if (state.currentPostId !== postId) {
          state.comments = action.payload.comments;
          state.currentPostId = postId;
        } else {
          const merged = [...state.comments, ...action.payload.comments];

          state.comments = Array.from(
            new Map(merged.map((c) => [c._id, c])).values(),
          );
        }

        state.commentTotal = action.payload.total;
      })

      .addCase(getCommentBlogThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get reply-comments
      .addCase(getReplyCommentBlogThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReplyCommentBlogThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const commentId = action.meta.arg.commentId;

        if (state.currentReplyCommentId !== commentId) {
          state.replyComments = action.payload.replyComments;
          state.currentReplyCommentId = commentId;
        } else {
          const merged = [
            ...state.replyComments,
            ...action.payload.replyComments,
          ];

          state.replyComments = Array.from(
            new Map(merged.map((r) => [r._id, r])).values(),
          );
        }
        state.replyCommentTotal = action.payload.total;
      })
      .addCase(getReplyCommentBlogThunk.rejected, (state, action) => {
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
        state.deleteMessage = action.payload.message;
        state.deleteSuccess = true;
        state.rewardPoints = action.payload.reward;
        const commentId = action.meta.arg;
        const { type } = action.payload;

        if (type === "comment") {
          state.comments = state.comments.filter(
            (comment) => comment._id !== commentId,
          );
        }
        if (type === "replyComment") {
          state.replyComments = state.replyComments.filter(
            (comment) => comment._id !== commentId,
          );
        }
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
        state.rewardPoints = action.payload.reward;
      })
      .addCase(deleteBlogThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.deleteLoading = false;
        state.deleteSuccess = true;
      })

      //edit comment
      .addCase(editCommentBlogThunk.pending, (state) => {
        state.commentSubmitLoading = true;
        state.error = null;
        state.commentSubmitSuccess = false;
      })
      .addCase(editCommentBlogThunk.fulfilled, (state, action) => {
        state.commentSubmitLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.commentSubmitSuccess = true;
        const { updated, type } = action.payload;

        if (type === "comment") {
          const comment = state.comments.find((c) => c._id === updated._id);
          if (comment) {
            comment.comment = (updated as Comments).comment;
          }
        }

        if (type === "replyComment") {
          const reply = state.replyComments.find((r) => r._id === updated._id);
          if (reply) {
            reply.replyText = (updated as IReply).replyText;
          }
        }
      })
      .addCase(editCommentBlogThunk.rejected, (state, action) => {
        state.commentSubmitLoading = false;
        state.error = action.payload;
        state.commentSubmitSuccess = false;
      })

      //commentoff toggle
      .addCase(commentOffToggleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentOffToggleThunk.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
        state.loading = false;

        const blogId = action.meta.arg;

        const post = state.data.find((blog) => blog._id == blogId);
        if (post) {
          post.commentsOff = !post.commentsOff;
        }
      })
      .addCase(commentOffToggleThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default blogSlice.reducer;
export const { resetBlogSlice } = blogSlice.actions;
