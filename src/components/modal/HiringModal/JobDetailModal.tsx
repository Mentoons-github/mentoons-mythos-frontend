import { X } from "lucide-react";
import { IJobs } from "../../../types/redux/careerInterface";

const JobDetailsModal = ({
  job,
  onClose,
  onApply,
}: {
  job: IJobs;
  onClose: () => void;
  onApply: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex justify-center items-center z-50 ">
      <div className=" l shadow-lg p-8  bg-secondary bg-center w-full max-w-4xl max-h-[90vh] rounded-sm relative hide-scrollbar overflow-y-auto">
        {/* Close button */}
        <button className="absolute top-4 right-4 " onClick={onClose}>
          <X size={20} />
        </button>

        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">
            {job.jobTitle}
          </h1>
          <div className="flex flex-wrap justify-center gap-2 mt-3 md:gap-4 md:justify-start">
            <span className="px-3 py-1 text-xs  rounded-full bg-foreground/20 md:text-sm">
              {job.jobType}
            </span>
            <span className="px-3 py-1 text-xs e rounded-full bg-foreground/20 md:text-sm">
              {job.jobLocation}
            </span>
          </div>
        </div>
        <div className="mt-2 space-y-2 text-sm md:text-base lg:text-[17px]">
          {job?.jobDescription?.split("\n").map((line, i) => (
            <p key={i} className="mt-4">
              {line.split(/(\*[^*]+\*)/g).map((part, j) =>
                part.startsWith("*") && part.endsWith("*") ? (
                  <span key={j} className="font-bold">
                    {part.slice(1, -1)}{" "}
                  </span>
                ) : (
                  part
                )
              )}
            </p>
          ))}
        </div>

        <div className="mt-6 ">
          <h2 className="text-base font-bold md:text-lg ">
            Your responsibilities will inclued:
          </h2>
          <ul className="list-disc pl-10 mt-2">
            {job?.responsibilities?.map((respo: string, index: number) => (
              <li
                key={index}
                className=" text-sm md:text-base lg:text-[17px] py-1.5 rounded-lg"
              >
                {respo}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 ">
          <h2 className="text-base font-bold md:text-lg ">
            To be successful in this role, you'll need:
          </h2>
          <ul className="list-disc pl-10 mt-2">
            {job?.requirements?.map((respo: string, index: number) => (
              <li
                key={index}
                className=" text-sm md:text-base lg:text-[17px] py-1.5 rounded-lg"
              >
                {respo}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 space-y-2 text-sm md:text-base lg:text-[17px]">
          {job?.endDescription?.split("\n").map((line, i) => (
            <p key={i} className="mt-4">
              {line.split(/(\*[^*]+\*)/g).map((part, j) =>
                part.startsWith("*") && part.endsWith("*") ? (
                  <span key={j} className="font-bold">
                    {part.slice(1, -1)}{" "}
                  </span>
                ) : (
                  part
                )
              )}
            </p>
          ))}
        </div>

        <div className="mt-6 ">
          <h2 className="text-base font-bold md:text-lg ">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.skillsRequired.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-foreground/20 px-3 py-1.5 rounded-lg text-xs md:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onApply}
            className="bg-foreground text-background font-semibold hover:bg-foreground/80 px-6 py-2 rounded-lg transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
