import React from "react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled,
  type = "button",
  form,
  name,
  value,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 bg-[#1A1D3B] text-white rounded-xl transition-all disabled:cursor-not-allowed ${className}`}
      type={type}
      form={form}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
};

export default AuthButton;
