import { createSlice } from "@reduxjs/toolkit";
import {
  addWorkshopThunk,
  deleteEnquiryThunk,
  deleteWorkshopThunk,
  fetchEnquiryCountThunk,
  fetchWorkshopCountThunk,
  getWorkshopsThunk,
  SingleEnquiryThunk,
  SingleWorkshopThunk,
  updateWorkshopThunk,
  workshopEnquiriesThunk,
  workshopRegisterThunk,
} from "./workshopThunk";
import { EnquiryI, WorkshopI } from "../../types/redux/workshopInterface";

interface WorkshopState {
  loading: boolean;
  message: string;
  error: null | string;
  success: boolean;
  enquiries: EnquiryI[];
  workshops: WorkshopI[];
  workshopsPage: number;
  workshopsTotalPages: number;
  enquiriesPage: number;
  enquiriesTotalPages: number;
  singleEnquiry: EnquiryI | null;
  singleLoading: boolean;
  singleSuccess: boolean;
  deleteMessage: string;
  deleteSuccess: boolean;
  deleteLoading: boolean;
  enquiryCount: number;
  workshopCount: number;
  addWorkshopSuccess: boolean;
  singleWorkshop: WorkshopI | null;
  updateLoading: boolean;
  updateSuccess: boolean;
}

const initialState: WorkshopState = {
  loading: false,
  message: "",
  error: null,
  success: false,
  enquiries: [],
  workshops: [],
  workshopsPage: 0,
  workshopsTotalPages: 0,
  enquiriesPage: 0,
  enquiriesTotalPages: 0,
  singleEnquiry: null,
  singleLoading: false,
  singleSuccess: false,
  deleteMessage: "",
  deleteSuccess: false,
  deleteLoading: false,
  enquiryCount: 0,
  workshopCount: 0,
  addWorkshopSuccess: false,
  singleWorkshop: null,
  updateLoading: false,
  updateSuccess: false,
};

const workshopSlice = createSlice({
  name: "workshop",
  initialState,
  reducers: {
    resetWorkshopSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.success = false;
      state.singleLoading = false;
      state.singleSuccess = false;
      state.deleteMessage = "";
      state.deleteSuccess = false;
      state.deleteLoading = false;
      state.addWorkshopSuccess = false;
      state.updateLoading = false;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // add new workshop
      .addCase(addWorkshopThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.addWorkshopSuccess = false;
      })
      .addCase(addWorkshopThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        const newWorkshop = action.payload.workshop;
        state.workshops.unshift(newWorkshop);
        state.addWorkshopSuccess = true;
      })
      .addCase(addWorkshopThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.addWorkshopSuccess = false;
      })

      //register enquiries
      .addCase(workshopRegisterThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(workshopRegisterThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.success = true;
      })
      .addCase(workshopRegisterThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //get all workshops
      .addCase(getWorkshopsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkshopsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshops = action.payload.workshops;
        state.workshopsPage = action.payload.page;
        state.workshopsTotalPages = action.payload.totalPages;
      })
      .addCase(getWorkshopsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //enquiries
      .addCase(workshopEnquiriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(workshopEnquiriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.enquiries = action.payload.enquiryDetails;
        state.enquiriesPage = action.payload.page;
        state.enquiriesTotalPages = action.payload.totalPages;
        state.success = true;
      })
      .addCase(workshopEnquiriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //fetch workshop count
      .addCase(fetchWorkshopCountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchWorkshopCountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.workshopCount = action.payload;
        state.success = true;
      })
      .addCase(fetchWorkshopCountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //single workshop
      .addCase(SingleWorkshopThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(SingleWorkshopThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleWorkshop = action.payload;
        state.success = true;
      })
      .addCase(SingleWorkshopThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //delete workshop
      .addCase(deleteWorkshopThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteWorkshopThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.deleteMessage = action.payload;
        state.deleteSuccess = true;
        if (action.meta.arg) {
          state.workshops = state.workshops.filter(
            (job) => job._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteWorkshopThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
        state.deleteSuccess = false;
      })

      //update workshop
      .addCase(updateWorkshopThunk.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateWorkshopThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.updateSuccess = true;

        const updatedWorkshop = action.payload.editedWorkshop;
        if (updatedWorkshop?._id) {
          state.workshops = state.workshops.map((workshop) =>
            workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          );
          if (state.singleWorkshop?._id === updatedWorkshop._id) {
            state.singleWorkshop = updatedWorkshop;
          }
        }
      })
      .addCase(updateWorkshopThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload as string;
        state.updateSuccess = false;
      })

      //fetch enquiry count
      .addCase(fetchEnquiryCountThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchEnquiryCountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.enquiryCount = action.payload;
        state.success = true;
      })
      .addCase(fetchEnquiryCountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //single enquiry
      .addCase(SingleEnquiryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(SingleEnquiryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleEnquiry = action.payload;
        state.success = true;
      })
      .addCase(SingleEnquiryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      })

      //delete enquiry
      .addCase(deleteEnquiryThunk.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteEnquiryThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.deleteMessage = action.payload;
        state.deleteSuccess = true;
        if (action.meta.arg) {
          state.enquiries = state.enquiries.filter(
            (job) => job._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteEnquiryThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload as string;
        state.deleteSuccess = false;
      });
  },
});

export default workshopSlice.reducer;
export const { resetWorkshopSlice } = workshopSlice.actions;
