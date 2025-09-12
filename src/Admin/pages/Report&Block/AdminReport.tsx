import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteReportsThunk,
  getReportsThunk,
  getSingleReportThunk,
} from "../../../features/report-block/report_blockThunk";
import { Eye, Search, Trash2 } from "lucide-react";
import ViewReportDetailsModal from "../../components/modals/Report&Block/ViewReportDetailsModal";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetReportBlockSlice } from "../../../features/report-block/report_blockSlice";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSort } from "react-icons/bi";

const AdminReport = () => {
  const dispatch = useAppDispatch();
  const {
    reports,
    reportsLoading,
    reportPage,
    reportTotalPage,
    singleReport,
    singleLoading,
    deleteLoading,
    deleteMessage,
    deleteSuccess,
    error,
  } = useAppSelector((state) => state.report_block);

  const [search, setSearch] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "comment" | "blog"
  >("All");

  const limit = 10;

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(deleteMessage);
      dispatch(resetReportBlockSlice());
      setDeleteModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetReportBlockSlice());
    }
  }, [deleteMessage, deleteSuccess, dispatch, error]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(
        getReportsThunk({
          page: currentPage,
          limit,
          filter: selectedFilter,
          sort: sortOrder,
          search,
        })
      );
    }, 500); // wait 0.5s after typing before API call

    const timer = setTimeout(() => setShowTable(true), 1000);

    return () => {
      clearTimeout(delayDebounce);
      clearTimeout(timer);
    };
  }, [search, currentPage, dispatch, selectedFilter, sortOrder]);

  const handleView = (reportId: string) => {
    dispatch(getSingleReportThunk(reportId));
    setViewModal(true);
  };

  const handleDelete = (reportId: string) => {
    setDeleteModal(true);
    setSelectedId(reportId);
  };

  return (
    <div className="text-white p-4 ">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold mb-4">All Reports</h1>
      </div>

      <div className="flex mb-4 h-11 items-center space-x-4 justify-between">
        {/* Filter  */}
        <div className="flex h-full gap-3">
          <div
            className="w-40 h-full px-4 flex items-center justify-between 
               border text-white rounded-lg cursor-pointer 
               shadow-md hover:bg-black/80 transition-all duration-200"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="flex items-center space-x-2">
              <IoFilter size={22} className="text-[#E39712]" />
              <h3 className="text-[16px] font-medium">Filter</h3>
            </div>
            <div className="ml-2">
              {showFilters ? (
                <IoIosArrowUp size={20} className="text-gray-300" />
              ) : (
                <IoIosArrowDown size={20} className="text-gray-300" />
              )}
            </div>
          </div>

          {/* Sort  */}
          <div
            className="w-40 h-full px-4 flex items-center justify-between 
               border text-white rounded-lg cursor-pointer 
               shadow-md hover:bg-black/80 transition-all duration-200"
            onClick={() => setShowSort((prev) => !prev)}
          >
            <div className="flex items-center space-x-2">
              <BiSort size={22} className="text-[#E39712]" />
              <h3 className="text-[16px] font-medium">Sort By</h3>
            </div>
            <div className="ml-2">
              {showSort ? (
                <IoIosArrowUp size={20} className="text-gray-300" />
              ) : (
                <IoIosArrowDown size={20} className="text-gray-300" />
              )}
            </div>
          </div>
        </div>
        {/* Search*/}
        <div className="relative">
          <Search
            size={15}
            className="absolute top-3.5 left-2 text-gray-400 "
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search reports..."
            className="w-64 px-4 py-2 rounded-lg border border-gray-600 pl-7
             bg-black/40 text-white placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-[#E39712]"
          />
        </div>
      </div>

      {showSort && (
        <div className="flex gap-3">
          {["newest", "oldest"].map((sort) => (
            <button
              key={sort}
              onClick={() => {
                setSortOrder(sort as "newest" | "oldest");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                sortOrder === sort
                  ? "bg-[#E39712] text-white border-[#E39712]"
                  : "bg-black/40 text-gray-300 border-gray-600 hover:bg-black/70"
              }`}
            >
              {sort === "newest" ? "Newest → Oldest" : "Oldest → Newest"}
            </button>
          ))}
        </div>
      )}

      {showFilters && (
        <div className="flex gap-4 mb-4">
          {["All", "comment", "blog"].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter as "All" | "comment" | "blog");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedFilter === filter
                  ? "bg-[#E39712] text-white border-[#E39712]"
                  : "bg-black/40 text-gray-300 border-gray-600 hover:bg-black/70"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}{" "}
            </button>
          ))}
        </div>
      )}

      {!showTable || reportsLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-400">Loading reports...</span>
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold text-white">No Reports Found</h2>
          <p className="text-gray-400 mt-2">
            It looks like there are no reports available.
          </p>
        </div>
      ) : (
        <div className="h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-[#E39712] text-white">
              <tr>
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Report ID</th>
                <th className="px-4 py-4 text-left">Reporter</th>
                <th className="px-4 py-4 text-left">Reported User</th>
                <th className="px-4 py-4 text-left">Reported From</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports?.map((report, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-black/60" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{report?._id}</td>
                  <td className="px-4 py-4 font-semibold">
                    {report?.reportedBy?.firstName}{" "}
                    {report?.reportedBy?.lastName}
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    {report?.userId?.firstName} {report.userId?.lastName}
                  </td>
                  <td className="px-4 py-4 font-semibold">{report?.from}</td>
                  <td className="px-4 py-4 space-x-3">
                    <button
                      onClick={() => handleView(report?._id as string)}
                      className="text-white rounded-md hover:text-[#c68310]"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(report._id as string)}
                      className="text-white rounded-md hover:text-[#d32a08]"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4 ">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {reportPage} of {reportTotalPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => (p < reportTotalPage ? p + 1 : p))
              }
              disabled={currentPage === reportTotalPage}
              className="px-5 py-2 bg-white border-2 border-black text-black rounded-2xl disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {viewModal && (
        <ViewReportDetailsModal
          loading={singleLoading}
          onClose={() => setViewModal(false)}
          report={singleReport ?? undefined}
        />
      )}
      {deleteModal && (
        <DeleteModal
          onClose={() => setDeleteModal(false)}
          item="Report"
          onConfirm={() => dispatch(deleteReportsThunk(selectedId))}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default AdminReport;
