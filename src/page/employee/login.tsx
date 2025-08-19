import { useState } from "react";

// Define types for form data and focused state
interface FormData {
  employeeId: string;
  password: string;
}

interface FocusedState {
  employeeId: boolean;
  password: boolean;
}

const EmployeeLogin = () => {
  const [formData, setFormData] = useState<FormData>({
    employeeId: "",
    password: "",
  });

  const [focused, setFocused] = useState<FocusedState>({
    employeeId: false,
    password: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (field: "employeeId" | "password") => {
    setFocused((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleBlur = (field: "employeeId" | "password") => {
    setFocused((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
                 45deg,
                 transparent,
                 transparent 35px,
                 rgba(255,255,255,0.1) 35px,
                 rgba(255,255,255,0.1) 36px
               )`,
          }}
        ></div>
      </div>

      <div className="relative z-10 p-10 max-w-md w-full mx-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:bg-white/15">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-white mb-2 tracking-wide">
              Employee
            </h1>
            <p className="text-gray-300 text-sm font-light">
              Access your dashboard
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label
                htmlFor="employeeId"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focused.employeeId || formData.employeeId
                    ? "-top-2 text-xs bg-black px-2 text-gray-300"
                    : "top-4 text-gray-400"
                }`}
              >
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                id="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                onFocus={() => handleFocus("employeeId")}
                onBlur={() => handleBlur("employeeId")}
                className="w-full h-14 px-4 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300 hover:border-gray-400"
                placeholder="Enter your employee ID"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focused.password || formData.password
                    ? "-top-2 text-xs bg-black px-2 text-gray-300"
                    : "top-4 text-gray-400"
                }`}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                className="w-full h-14 px-4 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300 hover:border-gray-400"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full h-14 bg-white text-black font-medium rounded-lg transition-all duration-300 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-white/30 active:scale-95 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Sign In</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-gray-600 bg-black/50"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-xs">
              Secure employee access portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
