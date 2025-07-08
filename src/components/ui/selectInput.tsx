import React from "react";

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: string[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  error,
  className = "",
  options,
  value,
  ...rest
}) => {
  const isDefault = value === "";

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm text-[#3B3D41] font-bold">{label}</label>
      <select
        {...rest}
        value={value}
        className={`w-full p-2 border-2 border-gray-300 rounded-xl ${
          error ? "border-red-500" : ""
        } ${isDefault ? "text-gray-400" : "text-black"} ${className}`}
      >
        <option value="" disabled>Select a country</option>
        {options.map((country) => (
          <option key={country} value={country} className="text-black">
            {country}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
