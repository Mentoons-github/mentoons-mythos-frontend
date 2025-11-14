import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
interface MultiSelectFilterProps {
  label: string;
  options: string[]; // simple string array
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiSelectFilter = ({
  label,
  options,
  selectedValues,
  onChange,
}: MultiSelectFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter((v) => v !== value));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[200px] px-4 py-2 border rounded-lg cursor-pointer transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-wrap gap-1 items-center">
            {selectedValues.length === 0 ? (
              <span className="text-sm">{label}</span>
            ) : (
              <>
                <span className="text-sm mr-1">{label}:</span>
                {selectedValues.map((val, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-800 text-white text-xs rounded-md"
                  >
                    {val}
                    <button
                      onClick={(e) => handleRemove(val, e)}
                      className="hover:bg-black rounded"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </>
            )}
          </div>
          <div className="flex items-center gap-2 ml-2">
            {selectedValues.length > 0 && (
              <button
                onClick={clearAll}
                className="text-muted-foreground hover:text-primary text-xs"
              >
                Clear
              </button>
            )}
            <ChevronDown
              size={16}
              className={`text-muted-foreground transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto hide-scrollbar">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <div
                key={option}
                onClick={() => handleToggle(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-muted-foreground transition-colors flex items-center gap-2 ${
                  selectedValues.includes(option)
                    ? "bg-muted-foreground/70"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => {}}
                  className="w-4 h-4 accent-blue-800 cursor-pointer"
                />
                <span className="text-sm">{option}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;
