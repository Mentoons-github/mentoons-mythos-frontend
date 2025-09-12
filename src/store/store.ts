import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import blogReducer from "../features/blog/blogSlice";
import uploadReducer from "../features/upload/fileUploadSlice";
import astroReducer from "../features/astrology/astroSlice";
import userReducer from "../features/user/userSlice";
import chatReducer from "../features/chat/chatSlice";
import assessmentReducer from "../features/assessment/assessmentSlice";
import careerReducer from "../features/career/careerSlice";
import bookCallReducer from "../features/bookCall/bookCallSlice";
import workshopReducer from "../features/workshop/workshopSlice";
import ReportBlockReducer from '../features/report-block/report_blockSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    upload: uploadReducer,
    astro: astroReducer,
    user: userReducer,
    chat: chatReducer,
    assessment: assessmentReducer,
    career: careerReducer,
    book_call: bookCallReducer,
    workshop: workshopReducer,
    report_block:ReportBlockReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
