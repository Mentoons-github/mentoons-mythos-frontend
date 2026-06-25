import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  allBlockedDeatailsThunk,
//   deleteReportsThunk,
//   getReportsThunk,
//   getSingleReportThunk,
} from "../../../features/report-block/report_blockThunk";
// import { Eye, Trash2 } from "lucide-react";
// import ViewReportDetailsModal from "../../components/modals/Report&Block/ViewReportDetailsModal";
// import DeleteModal from "../../components/modals/deleteModal";
// import { toast } from "sonner";
// import { resetReportBlockSlice } from "../../../features/report-block/report_blockSlice";
// import { IoFilter } from "react-icons/io5";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import {
//   SearchOptions,
//   ShowSort,
//   SortButton,
// } from "../../components/SortDetails";

const AdminBlock = () => {
  const dispatch = useAppDispatch();
  const {
    blockedData,
    loading,
    // reportPage,
    // reportTotalPage,
    // singleReport,
    // singleLoading,
    // deleteLoading,
    // deleteMessage,
    // deleteSuccess,
    // error,
  } = useAppSelector((state) => state.report_block);

  //   const [search, setSearch] = useState("");
  //   const [viewModal, setViewModal] = useState(false);
  //   const [deleteModal, setDeleteModal] = useState(false);
  //   const [selectedId, setSelectedId] = useState("");
  const [showTable, setShowTable] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [showFilters, setShowFilters] = useState(false);
  //   const [showSort, setShowSort] = useState(false);
  //   const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  //   const [selectedFilter, setSelectedFilter] = useState<
  //     "All" | "comment" | "blog"
  //   >("All");

  //   const limit = 10;

  //   useEffect(() => {
  //     if (deleteSuccess) {
  //       toast.success(deleteMessage);
  //       dispatch(resetReportBlockSlice());
  //       setDeleteModal(false);
  //     }
  //     if (error) {
  //       toast.error(error);
  //       dispatch(resetReportBlockSlice());
  //     }
  //   }, [deleteMessage, deleteSuccess, dispatch, error]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(allBlockedDeatailsThunk());
    }, 500);

    const timer = setTimeout(() => setShowTable(true), 1000);

    return () => {
      clearTimeout(delayDebounce);
      clearTimeout(timer);
    };
  }, []);

  console.log(blockedData, "jjjj");

  //   const handleView = (reportId: string) => {
  //     dispatch(getSingleReportThunk(reportId));
  //     setViewModal(true);
  //   };

  //   const handleDelete = (reportId: string) => {
  //     setDeleteModal(true);
  //     setSelectedId(reportId);
  //   };

  return (
    <div className="pt-3 lg:p-4 ">
      <div className="flex mb-4 h-11 items-center space-x-1 md:space-x-4 justify-between">
        {/* Filter  */}
        <div className="flex h-full gap-1 md:gap-3">
          {/* <div
            className="md:w-40 h-full px-2 md:px-4 flex items-center justify-between 
               border rounded-lg cursor-pointer 
               shadow-md hover:bg-muted transition-all duration-200"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="flex items-center md:space-x-2">
              <IoFilter size={22} className="text-blue-800" />
              <h3 className="text-[16px] font-medium hidden md:block">
                Filter
              </h3>
            </div>
            <div className="ml-2">
              {showFilters ? (
                <IoIosArrowUp size={20} className="" />
              ) : (
                <IoIosArrowDown size={20} className="" />
              )}
            </div>
          </div>

          {/* Sort  */}
          {/* <SortButton
            onClick={() => setShowSort((prev) => !prev)}
            showSort={showSort}
          /> */}
        </div>
        {/* Search*/}
        {/* <SearchOptions
          search={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        /> */}
      </div>

      {/* {showSort && (
        <ShowSort
          sortOrder={sortOrder}
          onClick={(sort) => {
            setSortOrder(sort as "newest" | "oldest");
            setCurrentPage(1);
          }}
        />
      )} */}

      {/* {showFilters && (
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
                  ? "bg-blue-800  border text-white"
                  : "  border hover:bg-muted"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}{" "}
            </button>
          ))}
        </div>
      )} */}

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading reports...</span>
        </div>
      ) : blockedData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Reports Found</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no reports available.
          </p>
        </div>
      ) : (
        <div className="h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-blue-800 ">
              <tr className="text-white">
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Block Id</th>
                <th className="px-4 py-4 text-left">Blocked By</th>
                <th className="px-4 py-4 text-left">Blocked User</th>
                <th className="px-4 py-4 text-left">Reason</th>
                {/* <th className="px-4 py-4 text-left">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {blockedData?.map((blocked, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 == 0 ? "bg-muted" : ""
                  } border-gray-600`}
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">{blocked?._id}</td>
                  <td className="px-4 py-4 font-semibold">
                    {blocked?.blockedBy?.firstName}{" "}
                    {blocked?.blockedBy?.lastName}
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    {blocked?.blockedUser?.firstName}{" "}
                    {blocked?.blockedUser?.lastName}
                  </td>
                  <td className="px-4 py-4 font-semibold">{blocked?.reason}</td>
                  {/* <td className="px-4 py-4 space-x-3">
                    <button
                      onClick={() => handleView(blocked?._id as string)}
                      className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(blocked._id as string)}
                      className=" font-semibold text-red-600 rounded-md hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* <div className="flex justify-between mt-4 ">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
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
              className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
            >
              Next
            </button>
          </div> */}
        </div>
      )}

      {/* {viewModal && (
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
      )} */}
    </div>
  );
};

export default AdminBlock;
