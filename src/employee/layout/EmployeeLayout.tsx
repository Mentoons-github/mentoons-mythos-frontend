import { Outlet } from "react-router-dom";
import EmployeeHeader from "../components/EmployeeHeader";
import EmployeeSidebar from "../components/EmployeeSidebar";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { joinUser } from "../../socket/events/notificationEvents";
import { useEffect, useState } from "react";
import { getUnreadCountThunk } from "../../features/notification/notificationThunk";
import { IoMdMenu } from "react-icons/io";
import { X } from "lucide-react";

const EmployeeLayout = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?._id) {
      joinUser(user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    dispatch(getUnreadCountThunk());
  }, [dispatch]);

  return (
    <div className="flex h-screen ">
      <aside
        className={`fixed z-40 left-0 top-0 h-full w-72 border-r-4 border-blue-800 bg-white transition-transform duration-300 transform 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-blue-800"
          onClick={() => setSidebarOpen(false)}
        >
          <X />
        </button>
        <EmployeeSidebar setSidebarOpen={setSidebarOpen} />
      </aside>

      <div className="flex flex-col flex-1 lg:ml-72 overflow-hidden">
        <header className="fixed top-0 left-0 lg:left-72 right-0 z-30  border-b shadow-md flex items-center justify-between ">
          <button
            className="lg:hidden pl-3 text-3xl text-blue-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <IoMdMenu />
          </button>

          <EmployeeHeader />
        </header>

        <main className="flex-1 mt-16 overflow-y-auto p-4 lg:p-6 will-change-scroll transform-gpu hide-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
