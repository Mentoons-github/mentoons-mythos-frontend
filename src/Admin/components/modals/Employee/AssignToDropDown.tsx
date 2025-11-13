import { useState, useRef, useEffect } from "react";
import { EmployeeTypes } from "../../../../types/employee/employeetypes";

const AssignToDropdown = ({
  employees,
  value,
  onChange,
}: {
  employees: EmployeeTypes[];
  value: string;
  onChange: (val: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.designation.toLowerCase().includes(search.toLowerCase())
  );

  const selectedEmployee = employees.find((emp) => emp._id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch(""); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block mb-1 font-semibold">Assign To</label>

      <input
        type="text"
        value={open ? search : selectedEmployee ? selectedEmployee.name : ""}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        onClick={() => setOpen(!open)}
        placeholder="Select or search employee"
        className="w-full p-2 rounded-lg border h-13 cursor-pointer bg-secondary"
        readOnly={!open && !search}
      />

      {open && (
        <ul className="absolute z-10 bg-secondary border rounded-lg mt-1 max-h-48 overflow-y-auto hide-scrollbar w-full shadow-lg">
          {filtered.length > 0 ? (
            filtered.map((emp) => (
              <li
                key={emp._id}
                onClick={() => {
                  onChange(emp._id as string);
                  setSearch("");
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {emp.name} <span className="text-sm">({emp.designation})</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No employees found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AssignToDropdown;
