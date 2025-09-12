import { X } from "lucide-react";
import { IJobs } from "../../../../types/redux/careerInterface";

const ViewJob = ({
  job,
  onClose,
  loading,
}: {
  job?: IJobs;
  onClose: () => void;
  loading: boolean;
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-60 flex justify-center items-center z-50 text-white ">
      <div className=" l shadow-lg p-8  bg-gradient-to-t from-[#141414] to-[#4a4a4b]  bg-center w-full max-w-4xl max-h-[90vh] rounded-sm relative hide-scrollbar overflow-y-auto will-change-scroll transform-gpu">
        {/* Close button */}
        <button className="absolute top-4 right-4 " onClick={onClose}>
          <X size={20} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading Job details...</span>
          </div>
        ) : (
          <div>
            <div className="text-center md:text-left">
              <h1 className="text-xl font-bold text-white md:text-3xl lg:text-4xl">
                {job?.jobTitle}
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mt-3 md:gap-4 md:justify-start">
                <span className="px-3 py-1 text-xs text-white rounded-full bg-white/20 md:text-sm">
                  {job?.jobType}
                </span>
                <span className="px-3 py-1 text-xs text-white rounded-full bg-white/20 md:text-sm">
                  {job?.jobLocation}
                </span>
              </div>
            </div>
            <div className="mt-6 text-white">
              <h2 className="text-base font-bold md:text-lg lg:text-xl">
                Description
              </h2>
              <div className="mt-2 space-y-2 text-sm md:text-base lg:text-lg">
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
            </div>

            <div className="mt-6 text-white">
              <h2 className="text-base font-bold md:text-lg lg:text-xl">
                Your responsibilities will inclued:
              </h2>
              <ul className="list-disc pl-10 mt-2">
                {job?.responsibilities?.map((respo: string, index: number) => (
                  <li
                    key={index}
                    className=" text-sm md:text-base lg:text-lg py-1.5 rounded-lg"
                  >
                    {respo}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-white">
              <h2 className="text-base font-bold md:text-lg lg:text-xl">
                To be successful in this role, you'll need:
              </h2>
              <ul className="list-disc pl-10 mt-2">
                {job?.requirements?.map((respo: string, index: number) => (
                  <li
                    key={index}
                    className=" text-sm md:text-base lg:text-lg py-1.5 rounded-lg"
                  >
                    {respo}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 space-y-2 text-sm md:text-base lg:text-lg">
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

            <div className="mt-6 text-white">
              <h2 className="text-base font-bold md:text-lg lg:text-xl">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {job?.skillsRequired.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-white/10 px-3 py-1.5 rounded-lg text-xs md:text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5 text-xl flex gap-2">
              <h2 className="">Total Applications: </h2>
              <p>{job?.applications?.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJob;
