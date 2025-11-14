import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { BiTask } from "react-icons/bi";

const SIDEBARDATA = [
  { name: "Dashboard", url: "dashboard", icon: <AiFillHome /> },
  { name: "Tasks", url: "tasks", icon: <BiTask /> },
  { name: "Attendance", url: "attendance", icon: <FaRegPenToSquare /> },
  { name: "Leave Management", url: "leave-management", icon: <FaUsers /> },
];

const EmployeeSidebar = ({
  setSidebarOpen,
}: {
  setSidebarOpen?: (val: boolean) => void;
}) => {
  return (
    <aside className="p-4 flex flex-col h-full overflow-y-auto">
      <img
        src="/assets/logo/image 2.png"
        alt="logo"
        className="mb-6 mx-auto h-20 object-contain"
      />

      <nav className="space-y-2 flex flex-col">
        {SIDEBARDATA.map((ele, ind) => (
          <NavLink
            key={ind}
            to={ele.url}
            onClick={() => setSidebarOpen && setSidebarOpen(false)}
            className={({ isActive }) =>
              `text-lg p-3 rounded-lg w-full flex items-center gap-2 transition font-semibold ${
                isActive
                  ? "bg-accent text-blue-800 font-semibold border-l-4 border-blue-800"
                  : "hover:bg-accent hover:text-blue-800 hover:border-l-4 hover:border-blue-800"
              }`
            }
          >
            {ele.icon}
            <span className="flex-1">{ele.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default EmployeeSidebar;
