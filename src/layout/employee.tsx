import { useState } from "react";
import EmployeeHeader from "../components/employee/component/navigation/header";
import EmployeeSidebar from "../components/employee/component/navigation/sidebar";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <EmployeeHeader
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1">
        <EmployeeSidebar sidebarOpen={sidebarOpen} />
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          } mt-16 p-6 bg-gray-100`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
