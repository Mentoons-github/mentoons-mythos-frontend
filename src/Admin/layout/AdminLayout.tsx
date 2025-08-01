import { Outlet, NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

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
];

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <aside className="w-64 bg-black/90 text-white p-4 border-r-4 border-green-400">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2 flex flex-col">
          {SIDEBARDATA.map((ele, ind) => (
            <div className="flex items-center " key={ind}>
              <NavLink
                to={ele.url}
                
                className={({ isActive }) =>
                  `text-lg p-3 rounded-lg w-full flex items-center gap-2 transition ${
                    isActive
                      ? "bg-white/20 text-[#E39712] font-semibold  border-green-400 border-l-3"
                      : "text-white hover:bg-white/20 hover:text-[#E39712] hover:border-green-400 hover:border-l-3"
                  }`
                }
              >
                {ele.icon}
                {ele.name}
              </NavLink>
            </div>
          ))}
          {/* <NavLink to="dashboard">Dashboard</NavLink>
          <NavLink to="users">Users</NavLink>
          <NavLink to="orders">Orders</NavLink>
          <NavLink to="products">Products</NavLink> */}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-black/90">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
