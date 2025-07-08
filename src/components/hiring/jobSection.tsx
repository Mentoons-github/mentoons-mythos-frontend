import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Clock,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";

const JobSection = ({
  title,
  requirements,
  isOpen,
  onToggle,
  icon: Icon,
  gradient,
  index,
}: {
  title: string;
  requirements: Record<string, string>;
  isOpen: boolean;
  onToggle: () => void;
  icon: any;
  gradient: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  const renderRequirementList = (requirements: Record<string, string>) => {
    return Object.entries(requirements).map(([key, value], reqIndex) => (
      <div
        key={key}
        className={`group relative overflow-hidden rounded-xl p-4 md:p-5 transition-all duration-500 hover:scale-[1.02] cursor-pointer ${
          reqIndex % 2 === 0
            ? "bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white"
            : "bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50"
        }`}
        style={{
          animationDelay: `${reqIndex * 100}ms`,
          transform: isOpen ? "translateY(0)" : "translateY(20px)",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-black via-gray-800 to-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        {/* Requirement content */}
        <div className="relative flex items-start space-x-3 md:space-x-4">
          <div className="flex-shrink-0 relative">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-black to-gray-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
            </div>
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-black opacity-20 animate-ping group-hover:animate-pulse" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <h4 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-black transition-colors duration-300">
                {key}
              </h4>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
              {value}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      className={`group mb-8 md:mb-12 transform transition-all duration-700 ${
        animateIn ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-700 hover:shadow-xl md:hover:shadow-2xl border border-gray-200 ${
          isOpen
            ? "shadow-xl md:shadow-2xl scale-[1.01] md:scale-[1.02]"
            : "shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl hover:scale-[1.005] md:hover:scale-[1.01]"
        }`}
        onClick={onToggle}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 ${gradient} opacity-5 transition-opacity duration-500 ${
            isHovered ? "opacity-10" : "opacity-5"
          }`}
        />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-20 transition-all duration-1000 ${
                isHovered ? "animate-bounce" : ""
              }`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative bg-black backdrop-blur-sm p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6">
              {/* Enhanced icon */}
              <div
                className={`relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isHovered
                    ? "bg-white shadow-md md:shadow-lg scale-105 md:scale-110"
                    : "bg-white shadow-sm md:shadow-md"
                }`}
              >
                <Icon
                  className={`w-5 h-5 md:w-8 md:h-8 text-black transition-all duration-500 ${
                    isHovered ? "scale-105 md:scale-110" : ""
                  }`}
                />
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-xl md:rounded-2xl bg-white opacity-20 blur-md transition-all duration-500 ${
                    isHovered ? "scale-125 md:scale-150" : "scale-100"
                  }`}
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <h2 className="text-white text-xl md:text-3xl font-bold tracking-tight">
                  {title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Award className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm">
                      {Object.keys(requirements).length} requirements
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm">Remote & On-site</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 md:w-4 md:w-4" />
                    <span className="text-xs md:text-sm">Full-time</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end space-x-4">
              <div
                className={`text-white text-xs md:text-sm font-medium transition-all duration-300 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-70 translate-x-2"
                }`}
              >
                {isOpen ? "Hide Details" : "Show Details"}
              </div>
              <button
                className={`flex justify-center items-center w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl transition-all duration-500 ${
                  isHovered
                    ? "bg-white shadow-lg md:shadow-xl scale-105 md:scale-110"
                    : "bg-white shadow-md md:shadow-lg"
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 md:w-5 md:h-5 text-black transition-transform duration-700 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable content with enhanced animations */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-gradient-to-b from-gray-50 to-white p-4 md:p-8 border-t border-gray-200">
            <div className="space-y-3 md:space-y-4">
              {renderRequirementList(requirements)}
            </div>

            {/* Apply button */}
            <div className="mt-6 md:mt-8 text-center">
              <button className="group relative overflow-hidden bg-black text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl hover:scale-[1.03] md:hover:scale-105">
                <span className="relative z-10 flex items-center space-x-2">
                  <span className="text-sm md:text-base">
                    Apply for {title}
                  </span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
