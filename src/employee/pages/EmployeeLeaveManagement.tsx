import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import LeaveApplicationModal from "../components/modals/LeaveApplicationModal";

import { IoFilter } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../Admin/components/SortDetails";
import {
  getEmployeeLeaveRequestsThunk,
  getSingleLeaveRequestThunk,
} from "../../features/attendance_leave/attendance_leaveThunk";
import { formatToRealDate } from "../../utils/DateFormate";
import EmployeeButton from "../../Admin/components/Employee/AddEmployee";
import ViewSingleLeaveRequestModal from "../components/modals/ViewSingleLeaveRequestModal";

const LeaveManagement: React.FC = () => {
  const [showNewLeaveForm, setShowNewLeaveForm] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    employeeRequestPage,
    employeeRequestTotalPages,
    employeeLeaveRequests,
    loading,
    singleLeaveRequest,
    singleLoading,
  } = useAppSelector((state) => state.attendance_leave);

  const [currentPage, setCurrentPage] = useState(1);
  const [showTable, setShowTable] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [viewSingleRequest, setViewSingleRequest] = useState(false);

  const limit = 10;

  useEffect(() => {
    dispatch(
      getEmployeeLeaveRequestsThunk({
        page: currentPage,
        limit,
        status: filterValue,
        sort: sortOrder,
        search,
      })
    );
    const timer = setTimeout(() => setShowTable(true), 1000);
    return () => clearTimeout(timer);
  }, [currentPage, dispatch, filterValue, search, sortOrder]);

  const handleView = (requestId: string) => {
    setViewSingleRequest(true);
    dispatch(getSingleLeaveRequestThunk(requestId));
  };

  return (
    <div className="md:px-4">
      <div className="flex flex-col md:flex-row mb-4  md:items-center space-x-4 space-y-2 justify-between">
        <div className="flex h-full gap-3">
          <div
            className="md:w-40 h-11  px-2 md:px-4 flex items-center justify-between 
                   border  rounded-lg cursor-pointer 
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

          <SortButton
            onClick={() => setShowSort((prev) => !prev)}
            showSort={showSort}
          />
        </div>

        <div className="flex gap-2 justify-between">
          <SearchOptions
            placeholder="(YYYY-MM-DD) or search"
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <EmployeeButton
            text="Apply Leave"
            onClick={() => setShowNewLeaveForm(true)}
          />
        </div>
      </div>

      {showFilters && (
        <div className="flex gap-3 mb-2">
          {["All", "Pending", "Approved", "Rejected"].map((val) => {
            const selectedValue = val === "All" ? "" : val;
            return (
              <button
                key={val}
                onClick={() => {
                  setFilterValue(selectedValue);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                  filterValue === selectedValue
                    ? "bg-blue-800 text-white"
                    : "hover:bg-muted"
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>
      )}

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
      ) : employeeLeaveRequests?.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Leave requests</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no leave requests yet.
          </p>
        </div>
      ) : (
        <div className="h-[calc(90vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Applied Date</th>
                  <th className="px-4 py-4 text-left">From Date</th>
                  <th className="px-4 py-4 text-left">To Date</th>
                  <th className="px-4 py-4 text-left">Total Days</th>
                  <th className="px-4 py-4 text-left">Status</th>
                  <th className="px-4 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeLeaveRequests?.map((requests, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">
                      {formatToRealDate(requests?.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      {formatToRealDate(requests?.fromDate)}
                    </td>
                    <td className="px-4 py-4">
                      {formatToRealDate(requests?.toDate)}
                    </td>
                    <td className="px-4 py-4">{requests?.totalDays}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                        ${
                          requests.status === "Approved"
                            ? "bg-green-100 text-green-700 border border-green-400"
                            : requests.status === "Rejected"
                            ? "bg-red-100 text-red-700 border border-red-400"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-400"
                        }
                      `}
                      >
                        {requests.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 space-x-3">
                      <button
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                        onClick={() => handleView(requests?._id as string)}
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>

              <span>
                Page {employeeRequestPage} of {employeeRequestTotalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    p < employeeRequestTotalPages ? p + 1 : p
                  )
                }
                disabled={currentPage === employeeRequestTotalPages}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {showNewLeaveForm && (
        <LeaveApplicationModal onClose={() => setShowNewLeaveForm(false)} />
      )}
      {viewSingleRequest && (
        <ViewSingleLeaveRequestModal
          onClose={() => setViewSingleRequest(false)}
          singleLoading={singleLoading}
          leaveRequest={singleLeaveRequest ?? undefined}
        />
      )}
    </div>
  );
};

export default LeaveManagement;
