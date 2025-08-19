import MythosFooter from "../components/home/footer";
import { Outlet } from "react-router-dom";
import MythosHeader from "../components/home/nav";
import { useAppSelector } from "../hooks/reduxHooks";
import { useState, useEffect } from "react";
import RashiFinderModal from "../components/modal/astro/rashiFindermodal.tsx";

const MythosLayout = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      console.log("user found");
      setShowModal(true);
    }
  }, [user]);

  if (!user) return null;

  return (
    <main>
      <MythosHeader />
      {showModal && <RashiFinderModal onClose={() => setShowModal(false)} />}
      <Outlet />
      <MythosFooter />
    </main>
  );
};

export default MythosLayout;
