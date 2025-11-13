import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  getAllLeaveRequestsThunk,
  getSingleLeaveRequestThunk,
} from "../../../features/attendance_leave/attendance_leaveThunk";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";
import { formatToRealDate } from "../../../utils/DateFormate";
import { Eye } from "lucide-react";
import ViewLeaveRequestModal from "../../components/modals/Employee/ViewLeaveRequestModal";
import { toast } from "sonner";
import { resetAttendanceState } from "../../../features/attendance_leave/attendance_leaveSlice";

type StatusType = "Pending" | "Approved" | "Rejected";

const AdminEmployeeLeaveManagement = () => {
  const dispatch = useAppDispatch();
  const {
    allLeaveRequests,
    allRequestPage,
    allRequestTotalPage,
    allRequestCounts,
    loading,
    singleLeaveRequest,
    singleLoading,
    editLoading,
    editSuccess,
    message,
    error,
  } = useAppSelector((state) => state.attendance_leave);

  const [showTable, setShowTable] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [currentStatus, setCurrentStatus] = useState<StatusType>("Pending");
  const [viewModal, setViewModal] = useState<boolean>(false);

  const limit = 10;

  useEffect(() => {
    dispatch(
      getAllLeaveRequestsThunk({
        page: currentPage,
        limit,
        sort: sortOrder,
        search,
        status: currentStatus,
      })
    );
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, currentStatus, dispatch, search, sortOrder]);

  useEffect(() => {
    if (editSuccess) {
      toast.success(message);
      dispatch(resetAttendanceState());
      setViewModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAttendanceState());
    }
  }, [dispatch, editSuccess, error, message]);

  const handleView = (requestId: string) => {
    setViewModal(true);
    dispatch(getSingleLeaveRequestThunk(requestId));
  };

  return (
    <div className="pt-3 lg:p-4 ">
      <div className="flex flex-col-reverse md:flex-row mb-4 lg:h-11 gap-2 md:gap-0 items-center space-x-4 justify-between">
        <div className="flex flex-row w-full h-full justify-between md:w-auto sm:gap-3 lg:gap-4 items-end">
          {(["Pending", "Approved", "Rejected"] as StatusType[]).map((val) => {
            const isActive = currentStatus === val;
            return (
              <div
                key={val}
                onClick={() => {
                  setCurrentStatus(val);
                  setCurrentPage(1);
                }}
                className={`relative cursor-pointer pb-2 transition-all ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {val} ({allRequestCounts?.[val] ?? 0})
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-md"></span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-row justify-between gap-3 w-full md:w-auto">
          <div className="h-11">
            <SortButton
              onClick={() => setShowSort((prev) => !prev)}
              showSort={showSort}
            />
          </div>
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
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
          <span className="ml-3 ">Loading Employee details...</span>
        </div>
      ) : allLeaveRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold">No Requests available</h2>
        </div>
      ) : (
        <div className="h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Employee Id</th>
                  <th className="px-4 py-4 text-left">Name</th>
                  <th className="px-4 py-4 text-left">From Date</th>
                  <th className="px-4 py-4 text-left">To date</th>
                  <th className="px-4 py-4 text-left">Days</th>
                  <th className="px-4 py-4 text-left">Status</th>
                  <th className="px-4 py-4 text-left">Applied on</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allLeaveRequests?.map((req, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{req?.employee?.employeeID}</td>
                    <td className="px-4 py-4">{req?.employee?.name}</td>
                    <td className="px-4 py-4">
                      {formatToRealDate(req?.fromDate)}
                    </td>
                    <td className="px-4 py-4">
                      {formatToRealDate(req?.toDate)}
                    </td>
                    <td className="px-4 py-4">{req?.totalDays}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                        ${
                          req.status === "Approved"
                            ? "bg-green-100 text-green-700 border border-green-400"
                            : req.status === "Rejected"
                            ? "bg-red-100 text-red-700 border border-red-400"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-400"
                        }
                      `}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {formatToRealDate(req?.createdAt)}
                    </td>
                    <td className="px-4 py-4 space-x-3">
                      <button
                        onClick={() => handleView(req?._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>

              <span>
                Page {allRequestPage} of {allRequestTotalPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < allRequestTotalPage ? p + 1 : p))
                }
                disabled={currentPage === allRequestTotalPage}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {viewModal && (
        <ViewLeaveRequestModal
          onClose={() => setViewModal(false)}
          leaveRequest={singleLeaveRequest ?? undefined}
          singleLoading={singleLoading}
          editLoading={editLoading}
        />
      )}
    </div>
  );
};

export default AdminEmployeeLeaveManagement;
