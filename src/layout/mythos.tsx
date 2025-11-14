import MythosFooter from "../components/home/footer";
import { Navigate, Outlet } from "react-router-dom";
import MythosHeader from "../components/home/nav";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useState, useEffect } from "react";
import RashiFinderModal from "../components/modal/astro/rashiFindermodal.tsx";
import FindIntelligenceModal from "../components/modal/assessment/FindIntelligenceModal.tsx";
import { userLogout } from "../features/user/userThunk.ts";

const MythosLayout = () => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [showRashiModal, setShowRashiModal] = useState(false);
  const [showIntelligenceModal, setShowIntelligenceModal] = useState(false);

  if (user?.isBlocked) {
    dispatch(userLogout());
  }

  useEffect(() => {
    if (user) {
      const modalsShown = sessionStorage.getItem("modalsShown");
      if (!modalsShown) {
        setTimeout(() => {
          if (!user.astrologyDetail) {
            setShowRashiModal(true);
          } else if (!user.takeInitialAssessment) {
            setShowIntelligenceModal(true);
          }
        }, 3000);
      }
    }
  }, [user]);

  const handleRashiClose = () => {
    setShowRashiModal(false);

    if (!user?.takeInitialAssessment) {
      setShowIntelligenceModal(true);
    } else {
      sessionStorage.setItem("modalsShown", "true");
    }
  };
  const handleIntelligenceClose = () => {
    setShowIntelligenceModal(false);
    sessionStorage.setItem("modalsShown", "true");
  };

  if(loading){
    <div>Loading...</div>
  }

  if (user) {
    if (user?.role === "employee") return <Navigate to="/employee" replace />;
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  return (
    <main>
      <MythosHeader />

      {showRashiModal && user && (
        <RashiFinderModal onClose={handleRashiClose} />
      )}

      {showIntelligenceModal && user && (
        <FindIntelligenceModal onClose={handleIntelligenceClose} />
      )}

      <Outlet />
      <MythosFooter />
    </main>
  );
};

export default MythosLayout;
