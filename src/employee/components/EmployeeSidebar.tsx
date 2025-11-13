import { NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";

const SIDEBARDATA = [
  { name: "Dashboard", url: "dashboard", icon: <AiFillHome /> },
  { name: "Tasks", url: "tasks", icon: <BiTask /> },
  { name: "Attendance", url: "attendance", icon: <FaRegPenToSquare /> },
  { name: "Leave Management", url: "leave-management", icon: <FaUsers /> },
  {
    name: "Assessments",
    url: "assessments",
    icon: <MdAssessment />,
    children: [
      { name: "Psychology", url: "assessments/psychology-assessments" },
      { name: "Astrology", url: "assessments/astrology-assessments" },
      { name: "Submissions", url: "assessments/assessment-submissions" },
      { name: "Initial Submissions", url: "assessments/initial-submissions" },
    ],
  },
];

const EmployeeSidebar = ({
  setSidebarOpen,
}: {
  setSidebarOpen?: (val: boolean) => void;
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    SIDEBARDATA.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (location.pathname.includes(child.url)) {
            setOpenDropdowns((prev) =>
              prev.includes(item.name) ? prev : [...prev, item.name]
            );
          }
        });
      }
    });
  }, [location]);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <aside className="p-4 flex flex-col h-full overflow-y-auto">
      <img
        src="/assets/logo/image 2.png"
        alt="logo"
        className="mb-6 mx-auto h-20 object-contain"
      />

      <nav className="space-y-2 flex flex-col">
        {SIDEBARDATA.map((ele, ind) => (
          <div key={ind}>
            <NavLink
              to={ele.url}
              onClick={(e) => {
                if (ele.children) {
                  e.preventDefault();
                  toggleDropdown(ele.name);
                } else if (setSidebarOpen) {
                  setSidebarOpen(false); // close sidebar on mobile click
                }
              }}
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
              {ele.children &&
                (openDropdowns.includes(ele.name) ? (
                  <IoIosArrowDown className="ml-auto" />
                ) : (
                  <IoIosArrowForward className="ml-auto" />
                ))}
            </NavLink>

            {ele.children && openDropdowns.includes(ele.name) && (
              <div className="ml-8 mt-2 flex flex-col space-y-1">
                {ele.children.map((child, i) => (
                  <NavLink
                    key={i}
                    to={child.url}
                    onClick={() => setSidebarOpen && setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `block p-2 rounded-md text-sm transition font-semibold ${
                        isActive ? "text-blue-800" : "hover:text-blue-800"
                      }`
                    }
                  >
                    {child.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default EmployeeSidebar;
