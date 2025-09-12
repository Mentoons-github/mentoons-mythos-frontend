import { useEffect, useState } from "react";
import JobSection from "./jobSection";
import HiringModal from "../modal/HiringModal/HiringModal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getJobsThunk } from "../../features/career/careerThunk";
import JobDetailsModal from "../modal/HiringModal/JobDetailModal";
import { IJobs } from "../../types/redux/careerInterface";

const Jobs = () => {
  const dispatch = useAppDispatch();
  const { jobs, jobTotalPage } = useAppSelector((state) => state.career);
  const [selectedJob, setSelectedJob] = useState<IJobs | null>(null);
  const [applyJob, setApplyJob] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  console.log(jobs,'jobsss')

  useEffect(() => {
    dispatch(getJobsThunk({ page: currentPage, limit, sort: "newest", search:"" }));
  }, [currentPage, dispatch]);

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br  from-gray-50 to-gray-100"
      // style={{ fontFamily: "Futura Std, serif" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-24 left-12 w-64 h-64 bg-gray-400 rounded-full opacity-35"></div>
        <div className="absolute top-80 right-16 w-48 h-48 bg-gray-500 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-1/3 w-56 h-56 bg-gray-300 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-52 h-52 bg-gray-400 rounded-full opacity-25"></div>

        <div className="absolute top-32 left-16 w-32 h-32 bg-gray-500 rounded-full opacity-45"></div>
        <div className="absolute top-52 left-32 w-36 h-36 bg-gray-400 rounded-full opacity-40"></div>
        <div className="absolute top-72 left-44 w-34 h-34 bg-gray-300 rounded-full opacity-50"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gray-500 rounded-full opacity-45"></div>
        <div className="absolute top-60 right-1/4 w-40 h-40 bg-gray-400 rounded-full opacity-35"></div>
        <div className="absolute top-80 right-32 w-28 h-28 bg-gray-300 rounded-full opacity-55"></div>
        <div className="absolute bottom-32 right-12 w-38 h-38 bg-gray-500 rounded-full opacity-40"></div>
        <div className="absolute top-1/4 left-1/3 w-30 h-30 bg-gray-400 rounded-full opacity-45"></div>
        <div className="absolute bottom-1/4 right-1/2 w-32 h-32 bg-gray-300 rounded-full opacity-50"></div>

        <div className="absolute top-80 left-1/3 w-20 h-20 bg-gray-600 rounded-full opacity-60"></div>
        <div className="absolute bottom-28 left-1/2 w-24 h-24 bg-gray-500 rounded-full opacity-55"></div>
        <div className="absolute bottom-48 left-1/4 w-22 h-22 bg-gray-400 rounded-full opacity-65"></div>
        <div className="absolute top-1/2 right-48 w-18 h-18 bg-gray-600 rounded-full opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/3 w-26 h-26 bg-gray-500 rounded-full opacity-60"></div>
        <div className="absolute top-96 left-8 w-20 h-20 bg-gray-400 rounded-full opacity-65"></div>
        <div className="absolute bottom-80 left-20 w-16 h-16 bg-gray-600 rounded-full opacity-75"></div>
        <div className="absolute top-1/3 right-2/3 w-18 h-18 bg-gray-500 rounded-full opacity-70"></div>
        <div className="absolute bottom-60 left-1/6 w-22 h-22 bg-gray-400 rounded-full opacity-65"></div>

        <div className="absolute top-16 left-1/2 w-12 h-12 bg-gray-600 rounded-full opacity-80"></div>
        <div className="absolute top-36 left-2/3 w-10 h-10 bg-gray-500 rounded-full opacity-85"></div>
        <div className="absolute bottom-12 left-60 w-14 h-14 bg-gray-400 rounded-full opacity-70"></div>
        <div className="absolute top-2/3 right-40 w-8 h-8 bg-gray-600 rounded-full opacity-90"></div>
        <div className="absolute top-44 left-6 w-10 h-10 bg-gray-500 rounded-full opacity-75"></div>
        <div className="absolute bottom-96 left-1/4 w-12 h-12 bg-gray-400 rounded-full opacity-70"></div>
        <div className="absolute top-1/4 left-3 w-8 h-8 bg-gray-600 rounded-full opacity-85"></div>
        <div className="absolute bottom-2/3 right-8 w-10 h-10 bg-gray-500 rounded-full opacity-80"></div>
        <div className="absolute top-3/4 right-56 w-6 h-6 bg-gray-600 rounded-full opacity-90"></div>
        <div className="absolute bottom-24 right-2/3 w-8 h-8 bg-gray-400 rounded-full opacity-80"></div>
        <div className="absolute top-1/3 left-1/2 w-14 h-14 bg-gray-500 rounded-full opacity-65"></div>
        <div className="absolute bottom-1/4 left-16 w-6 h-6 bg-gray-600 rounded-full opacity-85"></div>
        <div className="absolute top-1/6 right-1/3 w-10 h-10 bg-gray-400 rounded-full opacity-75"></div>
        <div className="absolute bottom-1/6 right-1/4 w-8 h-8 bg-gray-500 rounded-full opacity-80"></div>
        <div className="absolute top-5/6 left-1/3 w-6 h-6 bg-gray-600 rounded-full opacity-85"></div>
      </div>

      <div className="bg-white shadow-sm border-b border-gray-200 relative z-10 ">
        <div className="max-w-6xl mx-auto px-8 py-8 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            WHO WE'RE LOOKING FOR
          </h1>
          <p className=" text-gray-600 max-w-lg text-start text-xl mx-auto">
            Join us! Whether you're experienced or just starting, bring your
            passion and make an impact.
          </p>
        </div>
      </div>

      <div className="relative py-16 z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-20">
        {[...jobs]
          .sort((a, b) => a.jobTitle.localeCompare(b.jobTitle))
          .map((section, index) => (
            <JobSection
              index={index}
              key={section._id}
              title={section.jobTitle}
              requirements={section.skillsRequired}
              jobLocation={section.jobLocation}
              jobType={section.jobType}
              jobDescription={section.jobDescription}
              thumbnail={section.thumbnail}
              onViewDetails={() => setSelectedJob(section)}
            />
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-2 pb-10">
        {/* Prev Button */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-2 bg-white border-2 border-gray-500 rounded-2xl  disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(jobTotalPage)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={` rounded-full h-10 w-10 ${
                currentPage === pageNum
                  ? "bg-black text-white"
                  : "bg-white border-2 border-black hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((p) => (p < jobTotalPage ? p + 1 : p))}
          disabled={currentPage === jobTotalPage}
          className="px-5 py-2 bg-white border-2 border-gray-500 rounded-2xl  disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={() => {
            setApplyJob(selectedJob.jobTitle);
          }}
        />
      )}

      {applyJob && (
        <HiringModal
          setModalOpen={() => {
            setApplyJob(null);
            setSelectedJob(null);
          }}
          title={applyJob}
          jobId={selectedJob?._id ?? ""}
        />
      )}
    </div>
  );
};

export default Jobs;
