import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MythosLayout from "./layout/mythos";
import NotFound from "./components/NotFound";
import Loader from "./components/loader/Loader";
import Rashi from "./page/group/Rashi";
import ScrollToTop from "./components/ScrollToTop";
import Register from "./page/auth/Register";
import Login from "./page/auth/Login";
import OAuthResult from "./page/auth/OAuth";
import Otp from "./page/auth/Otp";
import Blogs from "./page/blogs";
import GroupChat from "./page/GroupChat";
import AdminLayout from "./Admin/layout/AdminLayout";
import Dashboard from "./Admin/pages/Dashboard";
import Users from "./Admin/pages/Users";
import AssessmentQuestions from "./page/assessments/AssessmentQuestions";
import RequireAdmin from "./Admin/components/RequireAdmin";
import { AuthGuard, ProtectedRoute } from "./components/ProtectedRoutes";
import ForgotPassword from "./page/auth/ForgotPassword";
import AstrologyReport from "./components/astro/report";
import EmployeeLayout from "./layout/employee";
import EmployeeDashboard from "./page/employee/dashboard";
import EmployeeLogin from "./page/employee/login";
import LeaveManagement from "./page/employee/leaveManagement";

const MythosHome = lazy(() => import("./page/home"));
const MythosAbout = lazy(() => import("./page/about"));
const MythosGroups = lazy(() => import("./page/groups"));
const MythosShop = lazy(() => import("./page/shop"));
const MythosQuiz = lazy(() => import("./page/quiz/quizHome"));
const MythosCart = lazy(() => import("./page/cart"));
const MythosDetails = lazy(() => import("./page/details"));
const MythosAssessments = lazy(() => import("./page/assessment"));
const MythosProductDetail = lazy(() => import("./page/productDetail"));
const MythosWishList = lazy(() => import("./page/wishlist"));
const MythosHiring = lazy(() => import("./page/hiring"));
const MythosProfile = lazy(() => import("./page/profile"));
const MythosOrder = lazy(() => import("./page/myOrders"));
const MythosSearch = lazy(() => import("./page/globalSearch"));
const MythosContactUs = lazy(() => import("./page/contactUs"));
const MythosPsychologyAssessments = lazy(
  () => import("./page/assessments/psychologyAssessment")
);

const AppRouter = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        <Routes>
          <Route
            path="register"
            element={
              <AuthGuard>
                <Register />
              </AuthGuard>
            }
          />
          <Route
            path="login"
            element={
              <AuthGuard>
                <Login />
              </AuthGuard>
            }
          />
          <Route
            path="oauth-result"
            element={
              <AuthGuard>
                <OAuthResult />
              </AuthGuard>
            }
          />
          <Route
            path="verify-otp"
            element={
              <AuthGuard>
                <Otp />
              </AuthGuard>
            }
          />
          <Route
            path="forgot-password"
            element={
              <AuthGuard>
                <ForgotPassword />
              </AuthGuard>
            }
          />
          <Route
            path="groups/:groupId/chat"
            element={
              <ProtectedRoute>
                <GroupChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="assessment/:type/:name"
            element={
              <ProtectedRoute>
                <AssessmentQuestions />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<MythosLayout />}>
            <Route index element={<MythosHome />} />
            <Route path="about-us" element={<MythosAbout />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="groups" element={<MythosGroups />} />
            <Route path="groups/:groupId" element={<Rashi />} />
            <Route path="*" element={<NotFound />} />
            <Route path="shop" element={<MythosShop />} />
            <Route path="quiz" element={<MythosQuiz />} />
            <Route path="assessment/planet" element={<MythosAssessments />} />
            <Route path="details" element={<MythosDetails />} />
            <Route path="products-details" element={<MythosProductDetail />} />
            <Route path="hiring" element={<MythosHiring />} />
            <Route path="profile" element={<MythosProfile />} />
            <Route path="contactUs" element={<MythosContactUs />} />
            <Route path="report" element={<AstrologyReport />} />
            <Route
              path="cart"
              element={
                <ProtectedRoute>
                  <MythosCart />
                </ProtectedRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <ProtectedRoute>
                  <MythosWishList />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <MythosOrder />
                </ProtectedRoute>
              }
            />
            <Route path="search" element={<MythosSearch />} />
            <Route
              path="assessment/psychology"
              element={<MythosPsychologyAssessments />}
            />
          </Route>
          <Route
            path="/admin"
            // element={<AdminLayout />}
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="*" element={<Users />} />
            {/* <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} /> */}
          </Route>

          {/*Employee Route*/}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="leave-management" element={<LeaveManagement />} />
          </Route>
          <Route path="/employee/login" element={<EmployeeLogin />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
