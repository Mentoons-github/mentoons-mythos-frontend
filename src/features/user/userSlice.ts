import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData, userLogout } from "./userThunk";
import { IUser } from "../../types";

interface UserData {
  user: IUser | null;
  error: null | string | undefined;
  loading: boolean;
  success: boolean;
}

const initialState: UserData = {
  user: null,
  error: null,
  loading: false,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
      });
  },
});

export default userSlice.reducer;
