import { createSlice } from "@reduxjs/toolkit";
import {
  blockUserThunk,
  fetchAllUserThunk,
  fetchUserData,
  reportUserThunk,
  userLogout,
  updateUserData,
} from "./userThunk";
import { IUser } from "../../types";

export interface UserData {
  user: IUser | null;
  error: null | string | undefined;
  loading: boolean;
  success: boolean;
  reportMessage: string;
  reportSuccess: boolean;
  allUsers: IUser[];
  blockMessage: string;
}

const initialState: UserData = {
  user: null,
  error: null,
  loading: true,
  success: false,
  reportMessage: "",
  reportSuccess: false,
  allUsers: [],
  blockMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserSlice: (state) => {
      state.error = null;
      state.loading = false;
      state.reportMessage = "";
      state.reportSuccess = false;
      state.success = false;
      state.blockMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      //fetch all users
      .addCase(fetchAllUserThunk.fulfilled, (state, action) => {
        state.allUsers = action.payload.users;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchAllUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      //block users
      .addCase(blockUserThunk.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        const index = state.allUsers.findIndex(
          (u) => u._id === updatedUser._id
        );
        if (index !== -1) {
          state.allUsers[index].isBlocked = updatedUser.isBlocked;
        }
        state.blockMessage = action.payload.message;
        state.success = action.payload.success;
        state.error = null;
        state.loading = false;
      })
      .addCase(blockUserThunk.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(blockUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })

      //logout
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.success = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //retportUser
      .addCase(reportUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reportUserThunk.fulfilled, (state, action) => {
        state.reportMessage = action.payload.message;
        state.reportSuccess = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(reportUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateUser
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUserSlice } = userSlice.actions;

export default userSlice.reducer;
