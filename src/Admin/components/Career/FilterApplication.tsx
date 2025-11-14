// components/Filters/FilterGroup.tsx
import React, { useEffect, useMemo, useState } from "react";

interface FilterApplicationProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (updated: string[]) => void;
}

const FilterApplication: React.FC<FilterApplicationProps> = ({
  title,
  options,
  selected,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [options, debouncedSearch]);

  const toggleOption = (option: string) => {
    if (selectedSet.has(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="bg-transparent border p-4 rounded-lg shadow w-full ">
      <h3 className="text-md font-semibold mb-2 ">{title}</h3>
      {(title === "Gender" || title === "Status") && <hr />}

      {title !== "Gender" && title !== "Status" && (
        <input
          type="text"
          placeholder={`Search ${title}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-3 border  px-2 py-1  rounded-md outline-none"
        />
      )}

      <div
        className={`space-y-2 ${
          title == "Location" || title == "Job Titles"
            ? "max-h-24 mt-0"
            : "max-h-32 mt-5"
        } overflow-y-auto pr-1 hide-scrollbar will-change-scroll transform-gpu`}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((opt, idx) => (
            <label
              key={`${opt}-${idx}`}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSet.has(opt)}
                onChange={() => toggleOption(opt)}
                className="form-checkbox text-blue-500 checked:bg-amber-400"
              />
              <span>{opt}</span>
            </label>
          ))
        ) : (
          <p className="text-sm text-gray-400">No results found</p>
        )}
      </div>
    </div>
  );
};

export default FilterApplication;
