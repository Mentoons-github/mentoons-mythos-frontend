import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MythosLayout from "./layout/mythos";
import NotFound from "./components/NotFound";
import Loader from "./components/loader/Loader";
import PsychologyAssessment from "./page/assessments/psychologyAssessment";

const MythosHome = lazy(() => import("./page/home"));
const MythosAbout = lazy(() => import("./page/about"));
const MythosGroups = lazy(() => import("./page/groups"));
const MythosBlogs = lazy(() => import("./page/blogs"));
const MythosShop = lazy(() => import("./page/shop"));
const MythosQuiz = lazy(() => import("./page/quiz/quizHome"));
const MythosCart = lazy(() => import("./page/cart"));
const MythosDetails = lazy(() => import("./page/details"));
const MythosAssessments = lazy(() => import("./page/assessment"));
const MythosProductDetail = lazy(() => import("./page/productDetail"));
const MythosWishList = lazy(() => import("./page/wishlist"));

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MythosLayout />}>
            <Route index element={<MythosHome />} />
            <Route path="about-us" element={<MythosAbout />} />
            <Route path="blog" element={<MythosBlogs />} />
            <Route path="groups" element={<MythosGroups />} />
            <Route path="*" element={<NotFound />} />
            <Route path="shop" element={<MythosShop />} />
            <Route path="quiz" element={<MythosQuiz />} />
            <Route path="assessment/planet" element={<MythosAssessments />} />
            <Route
              path="assessment/psychology"
              element={<PsychologyAssessment />}
            />
            <Route path="cart" element={<MythosCart />} />
            <Route path="details" element={<MythosDetails />} />
            <Route path="products-details" element={<MythosProductDetail />} />
            <Route path="wishlist" element={<MythosWishList />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
