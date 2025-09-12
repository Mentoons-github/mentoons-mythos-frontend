import { createSlice } from "@reduxjs/toolkit";
import {
  addNewJobThunk,
  applyCareerThunk,
  deleteJobApplicationThunk,
  deleteJobThunk,
  deleteSelectedJobApplicationsThunk,
  fetchJobApplicationCountThunk,
  fetchJobsCountThunk,
  getAllApplicationsThunk,
  getJobsThunk,
  getSingleJobApplicationThunk,
  getSingleJobThunk,
  sendAssignementsThunk,
  updateApplicationStatusThunk,
  updateJobThunk,
} from "./careerThunk";
import { Career, IJobs } from "../../types/redux/careerInterface";

interface sliceCareer {
  loading: boolean;
  singleLoding: boolean;
  error: null | undefined | string;
  message: string;
  success: boolean;
  jobs: IJobs[];
  singleJob: null | IJobs;
  newJobSuccess: boolean;
  newJobMessage: string;
  newJobLoading: boolean;
  deleteLoading: boolean;
  deleteSuccess: boolean;
  updateLoading: boolean;
  updateSuccess: boolean;
  applications: Career[];
  total: number;
  page: number;
  totalPages: number;
  jobPage: number;
  jobTotalPage: number;
  singleApplication: null | Career;
  assignementMessage: string;
  assignementLoading: boolean;
  assignementSuccess: boolean;
  statusSuccess: boolean;
  jobCount: number;
  jobApplicationCount: number;
}

const initialState: sliceCareer = {
  loading: false,
  singleLoding: false,
  error: null,
  message: "",
  success: false,
  jobs: [],
  singleJob: null,
  newJobMessage: "",
  newJobSuccess: false,
  newJobLoading: false,
  deleteLoading: false,
  deleteSuccess: false,
  updateLoading: false,
  updateSuccess: false,
  applications: [],
  total: 0,
  page: 0,
  totalPages: 0,
  jobPage: 0,
  jobTotalPage: 0,
  singleApplication: null,
  assignementMessage: "",
  assignementLoading: false,
  assignementSuccess: false,
  statusSuccess: false,
  jobCount: 0,
  jobApplicationCount: 0,
};

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    resetCareerSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "";
      state.success = false;
      state.newJobMessage = "";
      state.newJobSuccess = false;
      state.newJobLoading = false;
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.updateLoading = false;
      state.updateSuccess = false;
      state.assignementMessage = "";
      state.assignementLoading = false;
      state.assignementSuccess = false;
      state.statusSuccess = false;

    },
  },
  extraReducers: (builder) => {
    builder

      //apply job
      .addCase(applyCareerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(applyCareerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.success = true;
      })
      .addCase(applyCareerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //get jobs
      .addCase(getJobsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getJobsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.jobs = action.payload.jobs;
        // state.success = true
        state.jobTotalPage = action.payload.totalPages;
        state.jobPage = action.payload.page;
      })
      .addCase(getJobsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //fetch job count
      .addCase(fetchJobsCountThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchJobsCountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.jobCount = action.payload;
        state.success = true;
      })
      .addCase(fetchJobsCountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //get single job
      .addCase(getSingleJobThunk.pending, (state) => {
        state.singleLoding = true;
        state.error = null;
      })
      .addCase(getSingleJobThunk.fulfilled, (state, action) => {
        state.singleLoding = false;
        state.error = null;
        state.singleJob = action.payload;
      })
      .addCase(getSingleJobThunk.rejected, (state, action) => {
        state.singleLoding = false;
        state.error = action.payload;
      })

      //add new job
      .addCase(addNewJobThunk.pending, (state) => {
        state.newJobLoading = true;
        state.error = null;
        state.newJobSuccess = false;
      })
      .addCase(addNewJobThunk.fulfilled, (state, action) => {
        state.newJobLoading = false;
        state.error = null;
        state.newJobMessage = action.payload.message;
        state.newJobSuccess = true;
        const newJob = action.payload.newJob;
        state.jobs.push(newJob);
      })
      .addCase(addNewJobThunk.rejected, (state, action) => {
        state.newJobLoading = false;
        state.error = action.payload;
        state.newJobSuccess = false;
      })

      //update job
      .addCase(updateJobThunk.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateJobThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.error = null;
        state.message = action.payload.message;
        state.updateSuccess = true;

        const updatedJob = action.payload.updatedJob;
        if (updatedJob?._id) {
          state.jobs = state.jobs.map((job) =>
            job._id === updatedJob._id ? updatedJob : job
          );

          // also update singleJob if it's the same one
          if (state.singleJob?._id === updatedJob._id) {
            state.singleJob = updatedJob;
          }
        }
      })
      .addCase(updateJobThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })

      //delete job
      .addCase(deleteJobThunk.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteJobThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.message = action.payload;
        state.deleteSuccess = true;

        if (action.meta.arg) {
          state.jobs = state.jobs.filter((job) => job._id !== action.meta.arg);
        }
      })
      .addCase(deleteJobThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      })

      //get all job applications
      .addCase(getAllApplicationsThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getAllApplicationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.applications = action.payload.applications;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.success = true;
      })
      .addCase(getAllApplicationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //fetch job applications count
      .addCase(fetchJobApplicationCountThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchJobApplicationCountThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.jobApplicationCount = action.payload;
        state.success = true;
      })
      .addCase(fetchJobApplicationCountThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //delete job application
      .addCase(deleteJobApplicationThunk.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.error = null;
      })
      .addCase(deleteJobApplicationThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.error = null;
        state.message = action.payload;
        state.deleteSuccess = true;

        if (action.meta.arg) {
          state.applications = state.applications.filter(
            (application) => application._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteJobApplicationThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      })

      //delted selected applications
      .addCase(deleteSelectedJobApplicationsThunk.pending, (state) => {
        state.deleteLoading = true;
        state.deleteSuccess = false;
        state.error = null;
      })
      .addCase(
        deleteSelectedJobApplicationsThunk.fulfilled,
        (state, action) => {
          state.deleteLoading = false;
          state.error = null;
          state.message = action.payload;
          state.deleteSuccess = true;

          if (action.meta.arg?.applicationIds?.length) {
            state.applications = state.applications.filter(
              (application) =>
                !action.meta.arg.applicationIds.includes(
                  application._id as string
                )
            );
          }
        }
      )
      .addCase(deleteSelectedJobApplicationsThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      })

      //get single job application
      .addCase(getSingleJobApplicationThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getSingleJobApplicationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleApplication = action.payload;
        state.success = true;
      })
      .addCase(getSingleJobApplicationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //send assignement
      .addCase(sendAssignementsThunk.pending, (state) => {
        state.assignementLoading = true;
        state.assignementSuccess = false;
        state.error = null;
      })
      .addCase(sendAssignementsThunk.fulfilled, (state, action) => {
        state.assignementLoading = false;
        state.error = null;
        state.assignementMessage = action.payload;
        state.assignementSuccess = true;
      })
      .addCase(sendAssignementsThunk.rejected, (state, action) => {
        state.assignementLoading = false;
        state.error = action.payload;
        state.assignementSuccess = false;
      })

      //update application status
      .addCase(updateApplicationStatusThunk.pending, (state) => {
        state.loading = true;
        state.statusSuccess = false;
        state.error = null;
      })
      .addCase(updateApplicationStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload;
        state.statusSuccess = true;
      })
      .addCase(updateApplicationStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.statusSuccess = false;
      });
  },
});

export default careerSlice.reducer;
export const { resetCareerSlice } = careerSlice.actions;
