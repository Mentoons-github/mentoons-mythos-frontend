import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, reportUserThunk, userLogout } from "./userThunk";
import { IUser } from "../../types";

interface UserData {
  user: IUser | null;
  error: null | string | undefined;
  loading: boolean;
  success: boolean;
  reportMessage:string
  reportSuccess:boolean
}

const initialState: UserData = {
  user: null,
  error: null,
  loading: false,
  success: false,
  reportMessage:'',
  reportSuccess:false
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
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
        state.reportMessage = action.payload.message
        state.reportSuccess = true
        state.loading = false;
        state.error = null;
      })
      .addCase(reportUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ;
      });
  },
});

export const {resetUserSlice} = userSlice.actions

export default userSlice.reducer;
