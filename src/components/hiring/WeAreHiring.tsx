// import { Hiring } from "@/types";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hiring } from "../../types/hiringTypes";
// import ResumeSubmissionModal from "../common/modal/jobApplyModel";

export type Position = {
  position: string;
  _id: string;
};

const WeAreHiring = ({ hiring }: { hiring: Hiring[] }) => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex flex-col items-center w-1/3 gap-4 px-2 md:gap-6 md:px-0 py-6">
      {hiring.map((job, index) => (
        <div
          key={index}
          //   onClick={() => handleClick(job)}
          className="w-full p-3  shadow-xl md:p-5 rounded-xl font-akshar border border-muted-foreground"
        >
          <h1 className="text-2xl font-semibold text-left md:text-3xl lg:text-4xl">
            We are hiring <span className="text-muted-foreground">{job.job}</span>
          </h1>
          <p className="text-left mt-1 md:mt-2 font-inter tracking-[0.35px] text-xs md:text-sm ">
            {job.description}
          </p>
          <img
            src={job.image}
            alt={job.job}
            className="w-32 h-auto mx-auto mt-2 md:w-40 lg:w-48 md:mt-3"
          />
          <div className="flex justify-center mt-3 md:mt-4">
            <button
              className="px-4 md:px-6 py-1 md:py-2 bg-foreground text-background rounded-full shadow-md border  font-roboto text-sm md:text-base font-extrabold"
              onClick={() => navigate("/career")}
            >
              APPLY HERE
            </button>
          </div>
        </div>
      ))}
      {/* {isOpen && position && (
        <ResumeSubmissionModal setIsOpen={setIsOpen} position={position} />
      )} */}
    </div>
  );
};

export default WeAreHiring;
