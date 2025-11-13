// import { useState } from "react";
import EmployeeHeader from "../employee/components/EmployeeHeader";
import EmployeeSidebar from "../components/employee/component/navigation/sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const EmployeeLayout = () => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  const {user} = useAppSelector((state) =>state.user)
  console.log(user,'userrrrr')

  return (
    <div className="flex flex-col min-h-screen">
      <EmployeeHeader
        // setSidebarOpen={setSidebarOpen}
        // sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1">
        <EmployeeSidebar />
        <main
          className={`flex-1 transition-all duration-300 ${
            "ml-64" 
          } mt-16 p-6 bg-gray-100`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
