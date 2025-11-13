import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getTodayAttendanceAllEmployeesThunk } from "../../../features/attendance_leave/attendance_leaveThunk";
import { Eye } from "lucide-react";
import { SearchOptions } from "../../components/SortDetails";
import { getTime } from "../../../utils/DateFormate";
import AttendanceStatusDetails from "../../components/Employee/AttendanceStatusDetails";
import EmployeeAttendaceModal from "../../components/modals/Employee/EmployeeAttendanceModal";
import { getWorkingHours } from "../../../utils/attendanceFormates";

const Attendance = () => {
  const dispatch = useAppDispatch();
  const {
    allEmployeeAttendance,
    allEmployeeSummary,
    loading,
    page,
    totalPages,
    todayAttendance,
    hasMore,
    lastFetchedDate,
    employeeAttendance,
    summary,
  } = useAppSelector((state) => state.attendance_leave);

  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    employeeName: "",
    employeeId: "",
  });

  const limit = 10;
  useEffect(() => {
    dispatch(
      getTodayAttendanceAllEmployeesThunk({ limit, search, page: currentPage })
    );
  }, [currentPage, dispatch, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleView = (employeeId: string, employeeName: string) => {
    setViewModal(true);
    setSelectedEmployee({ employeeId, employeeName });
  };
  return (
    <div className="pt-3 lg:p-4 ">
      <div className="flex gap-3 justify-end">
        <SearchOptions
          search={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="mt-4 hidden lg:block">
        <AttendanceStatusDetails summary={allEmployeeSummary ?? undefined} />
      </div>

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Job details...</span>
        </div>
      ) : allEmployeeAttendance.length == 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold ">No Attendance Today</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no attendance today.
          </p>
        </div>
      ) : (
        <div className="h-[calc(90vh-110px)] overflow-x-auto overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden ">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-3 py-4 text-left">No</th>
                  <th className="px-3 py-4 text-left">Employee Id</th>
                  <th className="px-3 py-4 text-left">Employee Name</th>
                  <th className="px-3 py-4 text-left">Designation</th>
                  <th className="px-3 py-4 text-left">Check In</th>
                  <th className="px-3 py-4 text-left">Check Out</th>
                  <th className="px-3 py-4 text-left">Total Hours</th>
                  <th className="px-3 py-4 text-left">Status</th>
                  <th className="px-3 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {allEmployeeAttendance?.map((attendance, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-3 py-4">{index + 1}</td>
                    <td className="px-3 py-4">
                      {attendance?.employee.employeeID}
                    </td>
                    <td className="px-3 py-4 font-semibold">
                      {attendance?.employee.name}
                    </td>
                    <td className="px-3 py-4 font-semibold">
                      {attendance?.employee.designation}
                    </td>
                    <td className="px-3 py-4 font-semibold">
                      {attendance.checkIn ? getTime(attendance?.checkIn) : "--"}
                    </td>
                    <td className="px-3 py-4 font-semibold">
                      {attendance.checkOut
                        ? getTime(attendance?.checkOut)
                        : "--"}
                    </td>
                    <td className="px-3 py-4 font-semibold">
                      {attendance?.checkOut
                        ? `${attendance.totalHours}`
                        : attendance?.checkIn
                        ? `${getWorkingHours(attendance.checkIn)}`
                        : "0 H 0 M"}
                    </td>
                    <td className={`px-4 py-4 font-semibold `}>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium 
                              ${
                                attendance.status === "Present"
                                  ? "bg-green-100 text-green-700 border border-green-400"
                                  : attendance.status === "Absent"
                                  ? "bg-red-100 text-red-700 border border-red-400"
                                  : attendance.status === "On Leave"
                                  ? "bg-sky-100 text-sky-700 border border-sky-400"
                                  : attendance.status === "Late"
                                  ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
                                  : "bg-orange-100 text-orange-700 border border-orange-400"
                              }
                            `}
                      >
                        {attendance?.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 space-x-3 text-center">
                      <button
                        onClick={() =>
                          handleView(
                            attendance?.employee._id as string,
                            attendance.employee.name
                          )
                        }
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
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
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < totalPages ? p + 1 : p))
                }
                disabled={currentPage === totalPages}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {viewModal && (
        <EmployeeAttendaceModal
          onClose={() => setViewModal(false)}
          attendance={todayAttendance ?? undefined}
          loading={loading}
          selectedEmployee={selectedEmployee}
          hasMore={hasMore}
          employeeAttendance={employeeAttendance}
          lastFetchedDate={lastFetchedDate ?? undefined}
          summary={summary ?? undefined}
        />
      )}

      {/* {deleteModal && (
        <DeleteModal
          item="Workshop"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteWorkshopThunk(selectedId));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}

      {editModal && (
        <EditWorkshopModal
          onClose={() => setEditModal(false)}
          workshop={singleWorkshop}
          loading={singleLoading}
        />
      )} */}
    </div>
  );
};

export default Attendance;
