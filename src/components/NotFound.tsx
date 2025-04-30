import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-evenly h-[93vh] md:h-full">
      <img
        className="w-full h-[40%] md:w-[70%] md:h-[90%] lg:h-[70%]"
        src="/assets/404/404page.png"
        alt="page not found!"
      />
      <div className="absolute bottom-[29%] md:-bottom-4 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">
        <img
          onClick={() => navigate("/")}
          className="w-1/2 lg:w-[70%]"
          src="/assets/404/404pageCTA.png"
          alt="home cta button"
        />
      </div>
    </div>
  );
};

export default NotFound;
