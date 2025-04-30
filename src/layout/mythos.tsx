import MythosFooter from "../components/home/footer";
import { Outlet } from "react-router-dom";
import MythosHeader from "../components/home/nav";

const MythosLayout = () => {
  return (
    <main>
      <MythosHeader />
      <Outlet />
      <MythosFooter />
    </main>
  );
};

export default MythosLayout;
