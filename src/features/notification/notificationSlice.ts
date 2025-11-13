import { createSlice } from "@reduxjs/toolkit";
import { NotificationTypes } from "../../types/notification";
import {
  deleteAllNotificationsThunk,
  deleteSingleNotificationThunk,
  getFirst3NotificationThunk,
  getNotificationsThunk,
  getUnreadCountThunk,
  markAllNotificationsAsReadThunk,
  markNotificationAsReadThunk,
} from "./notificationThunk";

interface NotificationState {
  loading: boolean;
  error: null | string;
  message: string;
  success: boolean;
  notifications: NotificationTypes[];
  unreadCount: number;
  markReadSuccess: boolean;
  markAllReadSuccess: boolean;
  markReadLoading: boolean;
  markAllReadLoading: boolean;
  delteSuccess: boolean;
  deleteLoading: boolean;
  hasMore?: boolean;
  hasMoreLoading: boolean;
  first3Notifications: NotificationTypes[];
}

const initialState: NotificationState = {
  error: null,
  loading: false,
  message: "",
  success: false,
  notifications: [],
  unreadCount: 0,
  markAllReadLoading: false,
  markAllReadSuccess: false,
  markReadLoading: false,
  markReadSuccess: false,
  delteSuccess: false,
  deleteLoading: false,
  hasMoreLoading: false,
  hasMore: false,
  first3Notifications: [],
};

const notificationSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetNotificationState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
      state.message = "";
      state.markAllReadLoading = false;
      state.markAllReadSuccess = false;
      state.markReadLoading = false;
      state.markReadSuccess = false;
      state.deleteLoading = false;
      state.delteSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder

      //ge notifications
      .addCase(getNotificationsThunk.pending, (state, action) => {
        if (action.meta.arg.lastDate) {
          state.hasMoreLoading = true;
        } else {
          state.loading = true;
        }
        state.error = null;
        state.success = false;
      })
      .addCase(getNotificationsThunk.fulfilled, (state, action) => {
        if (action.meta.arg.lastDate) {
          state.hasMoreLoading = false;
          state.notifications = [
            ...(state.notifications || []),
            ...action.payload,
          ];
        } else {
          state.loading = false;
          state.notifications = action.payload;
        }
        state.hasMore = action.payload.length === action.meta.arg.limit;
        state.error = null;
        state.success = true;
      })
      .addCase(getNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //unread count
      .addCase(getUnreadCountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUnreadCountThunk.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
        state.error = null;
        state.success = true;
        state.loading = false;
      })
      .addCase(getUnreadCountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //mark as read
      .addCase(markNotificationAsReadThunk.pending, (state) => {
        state.markReadLoading = true;
        state.error = null;
        state.markReadSuccess = false;
      })
      .addCase(markNotificationAsReadThunk.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
        state.markReadSuccess = true;
        state.markReadLoading = false;
      })
      .addCase(markNotificationAsReadThunk.rejected, (state, action) => {
        state.markReadLoading = false;
        state.error = action.payload as string;
        state.markReadSuccess = false;
      })

      //markall as read
      .addCase(markAllNotificationsAsReadThunk.pending, (state) => {
        state.markAllReadLoading = true;
        state.error = null;
        state.markAllReadSuccess = false;
      })
      .addCase(markAllNotificationsAsReadThunk.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
        state.markAllReadSuccess = true;
        state.markAllReadLoading = false;
      })
      .addCase(markAllNotificationsAsReadThunk.rejected, (state, action) => {
        state.markAllReadLoading = false;
        state.error = action.payload as string;
        state.markAllReadSuccess = false;
      })

      //delete single notification
      .addCase(deleteSingleNotificationThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.delteSuccess = false;
      })
      .addCase(deleteSingleNotificationThunk.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
        state.delteSuccess = true;
        state.deleteLoading = false;
      })
      .addCase(deleteSingleNotificationThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
        state.delteSuccess = false;
      })

      //delete all notifications
      .addCase(deleteAllNotificationsThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.delteSuccess = false;
      })
      .addCase(deleteAllNotificationsThunk.fulfilled, (state, action) => {
        state.message = action.payload;
        state.error = null;
        state.delteSuccess = true;
        state.deleteLoading = false;
      })
      .addCase(deleteAllNotificationsThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
        state.delteSuccess = false;
      })

      //first 3 notifications
      .addCase(getFirst3NotificationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getFirst3NotificationThunk.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.loading = false;
        state.first3Notifications = action.payload;
      })
      .addCase(getFirst3NotificationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default notificationSlice.reducer;
export const { resetNotificationState } = notificationSlice.actions;
