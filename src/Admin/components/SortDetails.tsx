import { Search } from "lucide-react";
import { BiSort } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const SortButton = ({
  onClick,
  showSort,
}: {
  onClick: () => void;
  showSort: boolean;
}) => {
  return (
    <div
      className="md:w-40 h-11 px-2 md:px-4 flex items-center justify-between 
                           border rounded-lg cursor-pointer 
                           shadow-md hover:bg-muted transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <BiSort size={22} className="text-blue-800" />
        <h3 className="text-[16px] font-medium hidden md:block">Sort By</h3>
      </div>
      <div className="md:ml-2 ">
        {showSort ? (
          <IoIosArrowUp size={20} className="" />
        ) : (
          <IoIosArrowDown size={20} className="" />
        )}
      </div>
    </div>
  );
};

export const ShowSort = ({
  sortOrder,
  onClick,
}: {
  sortOrder: string;
  onClick: (sort: string) => void;
}) => {
  return (
    <div className="flex gap-3 mb-2">
      {["newest", "oldest"].map((sort) => (
        <button
          key={sort}
          onClick={() => onClick(sort)}
          className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
            sortOrder === sort
              ? "bg-blue-800  border text-white"
              : "  border hover:bg-muted"
          }`}
        >
          {sort === "newest" ? "Newest → Oldest" : "Oldest → Newest"}
        </button>
      ))}
    </div>
  );
};

export const SearchOptions = ({
  placeholder,
  search,
  onChange,
}: {
  placeholder?: string;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="relative ">
      <Search size={15} className="absolute top-3.5 left-2 text-primary" />
      <input
        type="text"
        value={search}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Search "}
        className="w-52 md:w-64 px-4 py-2 rounded-lg border border-border bg-muted pl-7   
             focus:outline-none focus:ring focus:ring-blue-800"
      />
    </div>
  );
};
