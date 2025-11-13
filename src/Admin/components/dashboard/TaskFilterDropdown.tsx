import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterOptions = ["This Week", "This Month", "All"] as const;
type FilterType = typeof filterOptions[number];

export default function TaskFilterDropdown({
  onChange,
}: {
  onChange: (filter: FilterType) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<FilterType>("This Week");

  const handleSelect = (value: FilterType) => {
    setSelected(value);
    setIsOpen(false);
    onChange(value); 
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-foreground text-sm md:text-base text-background px-3 py-1.5 rounded-md font-medium shadow-sm transition hover:bg-primary/90"
      >
        {selected}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-32 bg-secondary shadow-lg border rounded-md z-20">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-muted-foreground 
              ${selected === option ? "font-semibold" : ""}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
