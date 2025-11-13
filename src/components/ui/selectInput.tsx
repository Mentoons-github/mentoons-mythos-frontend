import Select, {
  DropdownIndicatorProps,
  SingleValue,
  components,
} from "react-select";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

interface SelectInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  options: CountryOption[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  options,
}) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const selectedOption = options.find((opt) => opt.label === value) || null;

  const handleChange = (option: SingleValue<CountryOption>) => {
    onChange({ target: { name, value: option?.label || "" } });
    setIsSelectFocused(false);
  };

  const handleFocus = () => setIsSelectFocused(true);
  const handleBlur = () => {
    setIsSelectFocused(false);
    const fakeEvent = {
      target: { name },
    } as unknown as React.FocusEvent<HTMLInputElement>;
    onBlur(fakeEvent);
  };

  const DropdownIndicator = (
    props: DropdownIndicatorProps<CountryOption, false>
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        {props.selectProps.menuIsOpen ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="mb-4 ">
      {label && (
        <label className="block mb-1 text-sm font-bold text-foreground mt-3 md:mt-0">
          {label}
        </label>
      )}

      <Select
        inputId={name}
        name={name}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search and select a country"
        isSearchable
        isClearable={false}
        filterOption={(option, inputValue) =>
          !inputValue ||
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        }
        components={{ DropdownIndicator }}
        formatOptionLabel={(option) => (
          <div className="flex items-center gap-2">
            <img
              src={option.flag}
              alt={option.label}
              className="w-5 h-5 rounded-sm"
            />
            <span>{option.label}</span>
          </div>
        )}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "var(--background)",
            borderColor: error ? "#EF4444" : "var(--border)",
            borderRadius: "0.75rem",
            padding: "0.25rem",
            boxShadow: "none",
            "&:hover": {
              borderColor: error ? "#EF4444" : "var(--muted-foreground)",
            },
          }),
          singleValue: (base) => ({
            ...base,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--foreground)",
            opacity: isSelectFocused ? 0 : 1,
            transition: "opacity 0.2s ease",
          }),
          input: (base) => ({ 
            ...base, 
            color: "var(--foreground)" 
          }),
          placeholder: (base) => ({
            ...base,
            color: "var(--muted-foreground)",
            opacity: isSelectFocused || !selectedOption ? 1 : 0,
            transition: "opacity 0.2s ease",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--card)",
            borderRadius: "0.75rem",
            marginTop: "0.25rem",
            zIndex: 9999,
            border: "1px solid var(--border)",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "var(--accent)"
              : state.isFocused
              ? "var(--muted)"
              : "var(--card)",
            color: "var(--foreground)",
            padding: "0.75rem",
            "&:hover": {
              backgroundColor: "var(--muted)",
            },
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "var(--muted-foreground)",
            "&:hover": {
              color: "var(--foreground)",
            },
          }),
          indicatorSeparator: () => ({ display: "none" }),
        }}
      />

      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;