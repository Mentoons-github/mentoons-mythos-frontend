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
import ReportBlockReducer from "../features/report-block/report_blockSlice";
import GroupReducer from "../features/group/groupSlice";
import About_NewsLetter from "../features/about&newsletter/about&newsletterSlice";
import adminReduces from "../features/admin/adminSlice";
import employeeReduces from "../features/employee/employeeSlice";
import notificationReduces from "../features/notification/notificationSlice";
import attendateReduces from "../features/attendance_leave/attendance_leaveSlice";
import mentorReduces from "../features/mentor/mentorSlice";
import careerGpsReduces from "../features/careerGps/careerGpsSlice"

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
    report_block: ReportBlockReducer,
    group: GroupReducer,
    about_newsletter: About_NewsLetter,
    admin: adminReduces,
    employee: employeeReduces,
    notification: notificationReduces,
    attendance_leave: attendateReduces,
    mentor: mentorReduces,
    careerGps: careerGpsReduces
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
