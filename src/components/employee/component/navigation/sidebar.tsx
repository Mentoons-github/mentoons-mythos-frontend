import {
  Calendar,
  ChevronRight,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
}



const EmployeeSidebar = () => {
  const [activeSidebar, setActiveSidebar] = useState(0);
  const sidebarItems: SidebarItem[] = [
    { icon: Home, label: "Dashboard", href: "/employee" },
    {
      icon: Users,
      label: "Leave Management",
      href: "/employee/leave-management",
    },
    { icon: Calendar, label: "Schedule", href: "/schedule" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black text-white transition-all duration-300 z-40 ${"w-64"}`}
    >
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item, index) => (
          <Link
            onClick={() => setActiveSidebar(index)}
            key={index}
            to={item.href}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              activeSidebar === index
                ? "bg-white text-black"
                : "hover:bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            <item.icon size={20} className="flex-shrink-0" />

            <>
              <span className="font-medium">{item.label}</span>
              {activeSidebar == index && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link
          to="/logout"
          className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default EmployeeSidebar;
