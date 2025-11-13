import { Outlet, NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdAssessment } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { PiStudent, PiBookOpenUser } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { SlEnvolopeLetter } from "react-icons/sl";
import AdminNav from "../components/AdminNav";
import { Users, X } from "lucide-react";
import { joinUser } from "../../socket/events/notificationEvents";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getUnreadCountThunk } from "../../features/notification/notificationThunk";

const SIDEBARDATA = [
  { name: "Dashboard", url: "dashboard", icon: <AiFillHome /> },
  { name: "Users", url: "users", icon: <FaUsers /> },
  { name: "Products", url: "products", icon: <FaCartShopping /> },
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
  {
    name: "Career",
    url: "career",
    icon: <PiStudent />,
    children: [
      { name: "Jobs", url: "career/jobs" },
      { name: "Applications", url: "career/applications" },
    ],
  },
  {
    name: "Workshops",
    url: "workshops",
    icon: <PiBookOpenUser />,
    children: [
      { name: "All Workshops", url: "workshops/workshops" },
      { name: "Enquiries", url: "workshops/enquiries" },
    ],
  },
  {
    name: "Blogs",
    url: "blogs",
    icon: <IoNewspaperOutline />,
    children: [{ name: "All Blogs", url: "blogs/blogs" }],
  },
  {
    name: "Blocked & Reported",
    url: "report&blocks",
    icon: <MdOutlineReportGmailerrorred />,
    children: [
      { name: "Reports", url: "report&blocks/reports" },
      { name: "Blocks", url: "report&blocks/blocks" },
    ],
  },
  {
    name: "Comments & Newsletter",
    url: "comments&newsletter",
    icon: <SlEnvolopeLetter />,
    children: [
      { name: "Comments", url: "comments&newsletter/comments-from-about" },
      { name: "Newsletter", url: "comments&newsletter/newsletter" },
    ],
  },
  {
    name: "Employee Management",
    url: "employee",
    icon: <Users />,
    children: [
      { name: "All Employees", url: "employee/all-employees" },
      { name: "Tasks / Assignements", url: "employee/tasks" },
      { name: "Attendance ", url: "employee/attendance" },
      { name: "Leave Management", url: "employee/leave-management" },
    ],
  },
];

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?._id) {
      joinUser(user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    dispatch(getUnreadCountThunk());
  }, [dispatch]);

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
    <div className="flex h-screen overflow-hidden">
      {" "}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 md:p-4 z-50 bg-background transition-transform duration-300 border-r-4 border-blue-800 
          overflow-y-auto hide-scrollbar
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:static lg:translate-x-0 lg:w-80
        `}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-blue-800"
          onClick={() => setSidebarOpen(false)}
        >
          <X/>
        </button>

        <img
          src="/assets/logo/image 2.png"
          alt="logo"
          className="mb-6 mt-10 lg:mt-0 h-26 mx-auto "
        />

        <nav className="space-y-2 flex flex-col mb-5">
          {SIDEBARDATA.map((ele, ind) => (
            <div key={ind}>
              <NavLink
                to={ele.url}
                onClick={(e) => {
                  if (ele.children) {
                    e.preventDefault();
                    toggleDropdown(ele.name);
                  } else {
                    setSidebarOpen(false);
                  }
                }}
                className={({ isActive }) =>
                  `text-lg p-3 rounded-lg w-full flex items-center gap-2 transition font-semibold${
                    isActive
                      ? " bg-accent text-blue-800 font-semibold border-blue-800 border-l-3"
                      : " hover:bg-accent hover:text-blue-800 hover:border-blue-800 hover:border-l-3"
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
                      onClick={() => setSidebarOpen(false)}
                      key={i}
                      to={child.url}
                      className={({ isActive }) =>
                        `block p-2 rounded-md text-sm transition font-semibold ${
                          isActive ? " text-blue-800 " : " hover:text-blue-800"
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
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <button
          className="lg:hidden p-3 text-blue-800 absolute top-2"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <AdminNav />
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
