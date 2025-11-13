import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import {
  deleteJobThunk,
  getJobsThunk,
  getSingleJobThunk,
} from "../../../features/career/careerThunk";
import ViewJob from "../../components/modals/Career/ViewJobModal";
import CareerLayout from "../../components/Career/CareerLayout";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetCareerSlice } from "../../../features/career/careerSlice";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import EditJobModal from "../../components/modals/Career/EditJobModal";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";

const AdminJobs = () => {
  const [showTable, setShowTable] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");

  const limit = 10;
  const dispatch = useAppDispatch();
  const {
    jobs,
    loading,
    singleJob,
    singleLoding,
    deleteLoading,
    deleteSuccess,
    message,
    error,
    jobPage,
    jobTotalPage,
  } = useAppSelector((state) => state.career);

  useEffect(() => {
    dispatch(
      getJobsThunk({ page: currentPage, limit, sort: sortOrder, search })
    );

    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, dispatch, search, sortOrder]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message);
      dispatch(resetCareerSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetCareerSlice());
    }
  }, [deleteSuccess, dispatch, error, message]);

  const handleEdit = (jobId: string) => {
    setSelectedJobId(jobId);
    setEditModal(true);
  };

  const handleDelete = (jobId: string) => {
    setDeleteModal(true);
    console.log(jobId);
    setSelectedJobId(jobId);
  };

  const handleView = (jobId: string) => {
    setSelectedJobId(jobId);
    setViewModal(true);
  };

  useEffect(() => {
    if (selectedJobId && (viewModal || editModal)) {
      dispatch(getSingleJobThunk(selectedJobId));
    }
  }, [selectedJobId, viewModal, editModal, dispatch]);

  return (
    <div className="pt-3 lg:p-4 ">
      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        <SortButton
          onClick={() => setShowSort((prev) => !prev)}
          showSort={showSort}
        />

        <div className="flex gap-2">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <CareerLayout />
        </div>
      </div>
      {showSort && (
        <ShowSort
          sortOrder={sortOrder}
          onClick={(sort) => {
            setSortOrder(sort as "newest" | "oldest");
            setCurrentPage(1);
          }}
        />
      )}

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Job details...</span>
        </div>
      ) : jobs.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Jobs</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no jobs yet.
          </p>
        </div>
      ) : (
        <div className="h-[calc(90vh-110px)] overflow-x-auto overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
              <thead className="bg-blue-800">
                <tr className="text-white">
                  <th className="md:px-4 px-2 py-4 text-left">No</th>
                  <th className="md:px-4 px-2 py-4 text-left">
                    Job Id
                  </th>
                  <th className="md:px-4 px-2 py-4 text-left">
                    Job Title
                  </th>
                  <th className="md:px-4 px-2 py-4 text-left">
                    Status
                  </th>
                  <th className="md:px-4 px-2 py-4 text-left">
                    Applications
                  </th>
                  <th className="md:px-4 px-2 py-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {jobs?.map((job, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="md:px-4 px-2 py-4">{index + 1}</td>
                    <td className="md:px-4 px-2 py-4">{job?._id}</td>
                    <td className="md:px-4 px-2 py-4 font-semibold">
                      {job?.jobTitle}
                    </td>
                    <td className="md:px-4 px-2 py-4  font-semibold">
                      {job?.status}
                    </td>
                    <td className="md:px-4 px-2 py-4  font-semibold">
                      {job?.applications?.length}
                    </td>

                    <td className="md:px-4 px-2 py-4  space-x-3 flex md:block ">
                      <button
                        onClick={() => handleView(job?._id as string)}
                        className="text-blue-800 rounded-md hover:text-blue-700"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(job._id as string)}
                        className="text-blue-800 rounded-md hover:text-blue-700"
                      >
                        <PenSquare size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(job._id as string)}
                        className="  text-red-600 rounded-md hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-between mt-4 ">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>

              <span>
                Page {jobPage} of {jobTotalPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < jobTotalPage ? p + 1 : p))
                }
                disabled={currentPage === jobTotalPage}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {viewModal && (
        <ViewJob
          loading={singleLoding}
          job={singleJob ?? undefined}
          onClose={() => setViewModal(false)}
        />
      )}
      {editModal && (
        <EditJobModal
          loading={singleLoding}
          job={singleJob}
          onClose={() => setEditModal(false)}
        />
      )}
      {deleteModal && (
        <DeleteModal
          item="Job"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteJobThunk(selectedJobId ?? ""));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default AdminJobs;
