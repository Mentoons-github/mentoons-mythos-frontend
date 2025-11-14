import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  className = "",
  error,
  name,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className={`mb-4 ${className}`}> 
      <label className="block mb-1 text-sm font-bold text-primary">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-2 border-2 border-border rounded-xl ${
          error ? "border-red-500" : ""
        } placeholder-muted-foreground`} 
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;