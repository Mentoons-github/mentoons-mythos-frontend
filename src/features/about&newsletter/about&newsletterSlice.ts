import { createSlice } from "@reduxjs/toolkit";
import { IAboutComment, INewsLetter } from "../../types/redux/about&newsletter";
import {
  deleteAboutCommentThunk,
  deleteNewsletterThunk,
  getAboutCommentThunk,
  getNewsletterThunk,
  getSingleAboutCommentThunk,
  getSingleNewsletterThunk,
  postAboutCommentThunk,
  sendMessageToMailThunk,
  subscribeNewsletterThunk,
} from "./about&newsletterThunk";

interface StateInterface {
  loading: boolean;
  singleLoading: boolean;
  error: null | string;
  success: boolean;
  singleComment: IAboutComment | null;
  comments: IAboutComment[];
  message: string;
  commentPage: number;
  commentTotalPages: number;
  newsletterPage: number;
  newsletterTotalPages: number;
  deleteSuccess: boolean;
  deleteLoading: boolean;
  newsletterSuccess: boolean;
  newsletters: INewsLetter[];
  singleNewsletter: INewsLetter | null;
  sendMessageLoading: boolean;
}

const initialState: StateInterface = {
  loading: false,
  error: null,
  success: false,
  singleComment: null,
  comments: [],
  message: "",
  commentPage: 0,
  commentTotalPages: 0,
  singleLoading: false,
  deleteSuccess: false,
  deleteLoading: false,
  newsletterSuccess: false,
  newsletters: [],
  singleNewsletter: null,
  newsletterPage: 0,
  newsletterTotalPages: 0,
  sendMessageLoading: false,
};

const about_newsletterSlice = createSlice({
  name: "about_newsletter",
  initialState,
  reducers: {
    resetAboutNewsletterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.singleLoading = false;
      state.deleteSuccess = false;
      state.message = "";
      state.newsletterSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // post comment
      .addCase(postAboutCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postAboutCommentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(postAboutCommentThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // get comments
      .addCase(getAboutCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAboutCommentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.comments = action.payload.comments;
        state.commentPage = action.payload.page;
        state.commentTotalPages = action.payload.totalPages;
      })
      .addCase(getAboutCommentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // get single comment
      .addCase(getSingleAboutCommentThunk.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
      })
      .addCase(getSingleAboutCommentThunk.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.error = null;
        state.singleComment = action.payload;
      })
      .addCase(getSingleAboutCommentThunk.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload as string;
      })

      //delete comment
      .addCase(deleteAboutCommentThunk.pending, (state) => {
        state.error = null;
        state.deleteSuccess = false;
        state.deleteLoading = true;
      })
      .addCase(deleteAboutCommentThunk.fulfilled, (state, action) => {
        state.error = null;
        state.deleteSuccess = true;
        state.message = action.payload;
        state.deleteLoading = false;
        if (action.meta.arg) {
          state.comments = state.comments.filter(
            (comment) => comment._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteAboutCommentThunk.rejected, (state, action) => {
        state.deleteSuccess = false;
        state.error = action.payload as string;
        state.deleteLoading = false;
      })

      //************************************************************************************* */

      // newsletter

      // post newsletter
      .addCase(subscribeNewsletterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.newsletterSuccess = false;
      })
      .addCase(subscribeNewsletterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newsletterSuccess = true;
        state.message = action.payload;
      })
      .addCase(subscribeNewsletterThunk.rejected, (state, action) => {
        state.loading = false;
        state.newsletterSuccess = false;
        state.error = action.payload as string;
      })

      // get newsletters
      .addCase(getNewsletterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewsletterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.newsletters = action.payload.letters;
        state.newsletterPage = action.payload.page;
        state.newsletterTotalPages = action.payload.totalPages;
      })
      .addCase(getNewsletterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // get single newsletter
      .addCase(getSingleNewsletterThunk.pending, (state) => {
        state.singleLoading = true;
        state.error = null;
      })
      .addCase(getSingleNewsletterThunk.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.error = null;
        state.singleNewsletter = action.payload;
      })
      .addCase(getSingleNewsletterThunk.rejected, (state, action) => {
        state.singleLoading = false;
        state.error = action.payload as string;
      })

      //delete newsletter
      .addCase(deleteNewsletterThunk.pending, (state) => {
        state.error = null;
        state.deleteSuccess = false;
        state.deleteLoading = true;
      })
      .addCase(deleteNewsletterThunk.fulfilled, (state, action) => {
        state.error = null;
        state.deleteSuccess = true;
        state.message = action.payload;
        state.deleteLoading = false;
        if (action.meta.arg) {
          state.newsletters = state.newsletters.filter(
            (letter) => letter._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteNewsletterThunk.rejected, (state, action) => {
        state.deleteSuccess = false;
        state.error = action.payload as string;
        state.deleteLoading = false;
      })

      //send message to mails
      .addCase(sendMessageToMailThunk.pending, (state) => {
        state.sendMessageLoading = true;
        state.error = null;
        state.newsletterSuccess = false;
      })
      .addCase(sendMessageToMailThunk.fulfilled, (state, action) => {
        state.sendMessageLoading = false;
        state.error = null;
        state.newsletterSuccess = true;
        state.message = action.payload;
      })
      .addCase(sendMessageToMailThunk.rejected, (state, action) => {
        state.sendMessageLoading = false;
        state.newsletterSuccess = false;
        state.error = action.payload as string;
      });
  },
});

export default about_newsletterSlice.reducer;
export const { resetAboutNewsletterState } = about_newsletterSlice.actions;
