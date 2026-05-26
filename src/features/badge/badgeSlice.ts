import { createSlice } from "@reduxjs/toolkit";
import {
  collectBadgeThunk,
  createBadgeThunk,
  deleteBadgeThunk,
  editBadgeThunk,
  fetchBadgeAnimationThunk,
  getAllBadgesThunk,
  getMyBadgesThunk,
  removeBadgeFromUserThunk,
} from "./badgeThunk";
import { MyBadge } from "../../types/user/userInterface";
import { Badge } from "../../types/redux/blogInterface";

interface BadgeSlice {
  loading: boolean;
  error: null | string | undefined;
  message: string;
  myBadges: MyBadge[];
  deleteSuccess: boolean;
  deleteLoading: boolean;
  allBadges: Badge[];
  createLoading: boolean;
  createSuccess: boolean;
  editLoading: boolean;
  editSuccess: boolean;
  animation: Record<string, unknown> | null;
}

const initialState: BadgeSlice = {
  loading: false,
  error: null,
  message: "",
  myBadges: [],
  deleteSuccess: false,
  deleteLoading: false,
  allBadges: [],
  createLoading: false,
  createSuccess: false,
  editLoading: false,
  editSuccess: false,
  animation: null,
};

const badgeSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {
    resetBadgeSlice: (state) => {
      state.error = null;
      state.loading = false;
      state.message = "";
      state.deleteSuccess = false;
      state.deleteLoading = false;
      state.createLoading = false;
      state.createSuccess = false;
      state.editLoading = false;
      state.editSuccess = false;
    },
    resetAnimation: (state) => {
      state.animation = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //create badges
      .addCase(createBadgeThunk.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createBadgeThunk.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        state.message = action.payload.message;
        const newBadge = action.payload.badge;
        state.allBadges.push(newBadge);
      })
      .addCase(createBadgeThunk.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })

      //collect badges
      .addCase(collectBadgeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(collectBadgeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        const badgeId = action.meta.arg;
        state.myBadges = state.myBadges.map((badge) =>
          badge.badge._id === badgeId ? { ...badge, isDeleted: false } : badge,
        );
      })
      .addCase(collectBadgeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetch my badges
      .addCase(getMyBadgesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBadgesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myBadges = action.payload;
      })
      .addCase(getMyBadgesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetch all badges
      .addCase(getAllBadgesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBadgesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allBadges = action.payload;
      })
      .addCase(getAllBadgesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //remove badges
      .addCase(removeBadgeFromUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeBadgeFromUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.deleteSuccess = true;
        const badgeId = action.meta.arg;

        state.myBadges = state.myBadges.map((item) =>
          item.badge._id === badgeId ? { ...item, isDeleted: true } : item,
        );
      })
      .addCase(removeBadgeFromUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //remove badges
      .addCase(deleteBadgeThunk.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteBadgeThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.message = action.payload;
        state.deleteSuccess = true;
        const badgeId = action.meta.arg;

        state.allBadges = state.allBadges.filter(
          (badge) => badge._id !== badgeId,
        );
      })
      .addCase(deleteBadgeThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      //remove badges
      .addCase(editBadgeThunk.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editBadgeThunk.fulfilled, (state, action) => {
        state.editLoading = false;
        state.message = action.payload.message;
        state.editSuccess = true;
        const badgeId = action.meta.arg.badgeId;
        const updatedBadge = action.payload.editedBadge;
        state.allBadges = state.allBadges.map((badge) =>
          badge._id == badgeId ? { ...badge, ...updatedBadge } : badge,
        );
      })
      .addCase(editBadgeThunk.rejected, (state, action) => {
        state.editLoading = false;
        state.error = action.payload;
      })

      //fetch animation
      .addCase(fetchBadgeAnimationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBadgeAnimationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.animation = action.payload;
      })
      .addCase(fetchBadgeAnimationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default badgeSlice.reducer;
export const { resetBadgeSlice, resetAnimation } = badgeSlice.actions;
