import { Outlet, NavLink, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdAssessment } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { PiStudent } from "react-icons/pi";
import { PiBookOpenUser } from "react-icons/pi";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineReportGmailerrorred } from "react-icons/md";


const SIDEBARDATA = [
  {
    name: "Dashboard",
    url: "dashboard",
    icon: <AiFillHome />,
  },
  {
    name: "Users",
    url: "users",
    icon: <FaUsers />,
  },
  {
    name: "Products",
    url: "products",
    icon: <FaCartShopping />,
  },
  {
    name: "Assessments",
    url: "assessments",
    icon: <MdAssessment />,
    children: [
      { name: "Psychology", url: "assessments/psychology" },
      { name: "Astrology", url: "assessments/astrology" },
      { name: "Submissions", url: "assessments/submissions" },
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
      { name: "All Workshops", url: "workshops/all" },
      { name: "Enquiries", url: "workshops/enquiries" },
    ],
  },
  {
    name: "Blogs",
    url: "blogs",
    icon: <IoNewspaperOutline />,
    children: [
      { name: "All Blogs", url: "blogs/all" },
    ],
  },
  {
    name: "Report & Blocks",
    url: "report&blocks",
    icon: <MdOutlineReportGmailerrorred />,
    children: [
      { name: "Reports", url: "report&blocks/reports" },
      { name: "Blocks", url: "report&blocks/blocks" },
    ],
  },
];

const AdminLayout = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    SIDEBARDATA.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (location.pathname.includes(child.url)) {
            setOpenDropdown(item.name);
          }
        });
      }
    });
  }, [location]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="flex h-screen ">
      <aside className="w-72 bg-black/90 text-white p-4 border-r-4 border-green-400 flex flex-col overflow-y-auto will-change-scroll transform-gpu ">
        <img
          src="/assets/logo/image 2.png"
          alt="logo"
          className="mb-6 items-center justify-center h-24"
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
                  }
                }}
                className={({ isActive }) =>
                  `text-lg p-3 rounded-lg w-full flex items-center gap-2 transition ${
                    isActive
                      ? "bg-white/20 text-[#E39712] font-semibold border-green-400 border-l-3"
                      : "text-white hover:bg-white/20 hover:text-[#E39712] hover:border-green-400 hover:border-l-3"
                  }`
                }
              >
                {ele.icon}
                <span className="flex-1">{ele.name}</span>
                {ele.children &&
                  (openDropdown === ele.name ? (
                    <IoIosArrowDown className="ml-auto" />
                  ) : (
                    <IoIosArrowForward className="ml-auto" />
                  ))}
              </NavLink>

              {ele.children && openDropdown === ele.name && (
                <div className="ml-8 mt-2 flex flex-col space-y-1">
                  {ele.children.map((child, i) => (
                    <NavLink
                      key={i}
                      to={child.url}
                      className={({ isActive }) =>
                        `block p-2 rounded-md text-sm transition ${
                          isActive
                            ? " text-[#E39712] font-semibold"
                            : "text-white  hover:text-[#E39712]"
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

      <main className="flex-1 p-6 bg-black/90 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
