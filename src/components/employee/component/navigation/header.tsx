import { Bell, Menu, Search, User, X } from "lucide-react";

interface Header {
  setSidebarOpen: (val: boolean) => void;
  sidebarOpen: boolean;
}

const EmployeeHeader = ({ setSidebarOpen, sidebarOpen }: Header) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white h-16 flex items-center justify-between px-6 z-50 shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">EP</span>
          </div>
          <h1 className="text-xl font-semibold">Employee Panel</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Devan PS</p>
            <p className="text-xs text-gray-400">Web Developer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmployeeHeader;
