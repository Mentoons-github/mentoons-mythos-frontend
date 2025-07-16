import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
const MythosPsychologyAssessments = lazy(
  () => import("./page/assessments/psychologyAssessment")
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="oauth-result" element={<OAuthResult />} />
          <Route path="verify-otp" element={<Otp />} />
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
            <Route path="cart" element={<MythosCart />} />
            <Route path="details" element={<MythosDetails />} />
            <Route path="products-details" element={<MythosProductDetail />} />
            <Route path="wishlist" element={<MythosWishList />} />
            <Route path="hiring" element={<MythosHiring />} />
            <Route path="profile" element={<MythosProfile />} />
            <Route path="orders" element={<MythosOrder />} />
            <Route path="search" element={<MythosSearch />} />
            <Route
              path="assessment/psychology"
              element={<MythosPsychologyAssessments />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
