const JobSection = ({
  title,
  jobDescription,
  jobType,
  jobLocation,
  index,
  onViewDetails,
  thumbnail,
}: {
  title: string;
  requirements: string[];
  jobLocation: string;
  jobType: string;
  jobDescription: string;
  thumbnail: string;
  index: number;
  onViewDetails: () => void;
}) => {
  return (
    <div
      className="group mb-2 transform  duration-700 text-white skew-x-[-10deg] sm:skew-x-[-20deg] lg:skew-x-[-40deg] bg-gradient-to-t from-[#141414] to-[#4a4a4b] p- sm:p-5 relative w-full rounded-lg shadow-[3px_3px_6px_0px_#141414,3px_3px_6px_0px_#36B3DAAD] overflow-hidden hover:scale-105 transition-transform "
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div
        className="relative overflow-hidden rounded-2xl  cursor-pointer flex gap-4 md:gap-6 items-center skew-x-[10deg] sm:skew-x-[20deg] lg:skew-x-[40deg]"
        onClick={onViewDetails}
      >
        <div className="flex-shrink-0 ">
          <img
            src={thumbnail}
            alt={title}
            className="max-w-40 max-h-24 object-cover rounded-xl z-50"
          />
        </div>

        {/* Job details */}
        <div className="flex flex-col justify-between">
          <h2 className="md:text-2xl text-lg font-bold md:font-extrabold md:text-center">{title}</h2>
          <p className="md:text-lg mt-2 line-clamp-1 tracking-wide ">{jobDescription}</p>
          <div className="mt-3 text-sm text-gray-200">
            {jobLocation} · {jobType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
