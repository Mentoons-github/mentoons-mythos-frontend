import { Filter, Grid3X3, List, Search } from "lucide-react";

interface ControlsAndFiltersInterface {
  setSearchTerm: (val: string) => void;
  searchTerm: string;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  viewMode: string;
  setViewMode: (val: "grid" | "list") => void;
  categories: string[];
}

const ControlsAndFilters = ({
  setSearchTerm,
  searchTerm,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  categories,
}: ControlsAndFiltersInterface) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-10">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-gray-900/70"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gray-900/50 rounded-2xl p-2 backdrop-blur-sm">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent border-none text-white focus:ring-0 focus:outline-none cursor-pointer"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="bg-gray-900 text-white"
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-900/50 rounded-2xl p-2 backdrop-blur-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Grid3X3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "list"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlsAndFilters;
