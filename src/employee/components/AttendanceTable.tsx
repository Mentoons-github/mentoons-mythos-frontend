import { formatToRealDate, getDay, getTime } from "../../utils/DateFormate";
import { AttendanceTypes } from "../../types/employee/attendance&leaveTypes";
import {
  convertToInputTime,
  convertToISODate,
  formatHours,
  liveWorkingHours,
} from "../../utils/attendanceFormates";
import { Check, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { editAttendanceDetailsThunk } from "../../features/attendance_leave/attendance_leaveThunk";
import { toast } from "sonner";
import { resetAttendanceState } from "../../features/attendance_leave/attendance_leaveSlice";

interface AttendanceTableProps {
  showTable: boolean;
  loading: boolean;
  employeeAttendance: AttendanceTypes[];
  hasMore: boolean;
  loadMore: () => void;
  from?: boolean;
}

const AttendanceTable = ({
  employeeAttendance,
  hasMore,
  loadMore,
  loading,
  showTable,
  from,
}: AttendanceTableProps) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { editLoading, editSuccess, message, error } = useAppSelector(
    (state) => state.attendance_leave
  );
  const [editValues, setEditValues] = useState({
    checkIn: "",
    checkOut: "",
    status: "",
  });

  const handleEdit = (attendance: AttendanceTypes) => {
    setEditRowId(attendance._id as string);
    setEditValues({
      checkIn: convertToInputTime(attendance.checkIn) || "",
      checkOut: convertToInputTime(attendance.checkOut) || "",
      status: attendance.status,
    });
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success(message);
      dispatch(resetAttendanceState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAttendanceState());
    }
  });

  const confirmEdit = () => {
    const row = employeeAttendance.find((a) => a._id === editRowId);
    if (!row) return;

    const payload = {
      checkIn: editValues.checkIn
        ? convertToISODate(editValues.checkIn, row.date)
        : null,
      checkOut: editValues.checkOut
        ? convertToISODate(editValues.checkOut, row.date)
        : null,
      status: editValues.status,
    };

    dispatch(
      editAttendanceDetailsThunk({
        attendanceId: editRowId as string,
        details: payload,
      })
    );

    setEditRowId(null);
  };

  return (
    <div>
      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3">Loading attendance details...</span>
        </div>
      ) : employeeAttendance.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold">No attendance records</h2>
          <p className="text-muted-foreground mt-2">
            It looks like there are no attendance records available.
          </p>
        </div>
      ) : (
        <div className="mt-5">
          <div className="h-[calc(90vh-110px)] overflow-x-auto overflow-y-auto hide-scrollbar will-change-scroll transform-gpu mt-5">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Date</th>
                  <th className="px-4 py-4 text-left">Day</th>
                  <th className="px-4 py-4 text-left">Check In</th>
                  <th className="px-4 py-4 text-left">Check Out</th>
                  <th className="px-4 py-4 text-left">Total Hours</th>
                  <th className="px-4 py-4 text-left">Status</th>
                  {from && <th className="px-4 py-4 text-left">Action</th>}
                </tr>
              </thead>
              <tbody>
                {employeeAttendance.map((attendance, index) => (
                  <tr
                    key={attendance._id || index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4 font-medium">
                      {formatToRealDate(attendance?.date)}
                    </td>
                    <td className="px-4 py-4 font-medium">
                      {getDay(attendance?.date)}
                    </td>
                    <td className="px-4 py-4">
                      {editRowId === attendance._id ? (
                        <input
                          type="time"
                          className="border px-2 py-1 rounded"
                          value={editValues.checkIn}
                          disabled={
                            editValues.status === "Absent" ||
                            editValues.status === "On Leave"
                          }
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              checkIn: e.target.value,
                            })
                          }
                        />
                      ) : attendance.checkIn ? (
                        getTime(attendance.checkIn)
                      ) : (
                        "-- : --"
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {editRowId === attendance._id ? (
                        <input
                          type="time"
                          className="border px-2 py-1 rounded"
                          value={editValues.checkOut}
                          disabled={
                            editValues.status === "Absent" ||
                            editValues.status === "On Leave"
                          }
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              checkOut: e.target.value,
                            })
                          }
                        />
                      ) : attendance.checkOut ? (
                        getTime(attendance.checkOut)
                      ) : (
                        "-- : --"
                      )}
                    </td>

                    <td className="px-4 py-4">
                      {attendance?.checkOut
                        ? formatHours(attendance.totalHours) // ✅ stored numeric value
                        : attendance?.checkIn
                        ? liveWorkingHours(attendance.checkIn) // ✅ dynamic tracking
                        : "-- : --"}
                    </td>
                    <td className="px-4 py-4 font-semibold">
                      {editRowId === attendance._id ? (
                        <select
                          value={editValues.status}
                          onChange={(e) => {
                            const newStatus = e.target.value;

                            setEditValues((prev) => ({
                              ...prev,
                              status: newStatus,
                              checkIn:
                                newStatus === "Absent" ||
                                newStatus === "On Leave"
                                  ? ""
                                  : prev.checkIn,
                              checkOut:
                                newStatus === "Absent" ||
                                newStatus === "On Leave"
                                  ? ""
                                  : prev.checkOut,
                            }));
                          }}
                          className={`border px-2 py-1 rounded font-semibold
                              ${
                                editValues.status === "Present"
                                  ? "text-green-400"
                                  : editValues.status === "Absent"
                                  ? "text-red-400"
                                  : editValues.status === "On Leave"
                                  ? "text-sky-400"
                                  : editValues.status === "Late"
                                  ? "text-yellow-400"
                                  : "text-orange-400"
                              }
                            `}
                        >
                          <option className="text-green-400" value="Present">
                            Present
                          </option>
                          <option className="text-red-400" value="Absent">
                            Absent
                          </option>
                          <option className="text-sky-400" value="On Leave">
                            On Leave
                          </option>
                          <option className="text-yellow-400" value="Late">
                            Late
                          </option>
                          <option className="text-orange-400" value="Half Day">
                            Half Day
                          </option>
                        </select>
                      ) : (
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
                          {attendance.status}
                        </span>
                      )}
                    </td>

                    {from && (
                      <td className="px-3 py-4 text-center">
                        {editRowId === attendance._id ? (
                          <div className="space-x-3">
                            <button
                              className="text-green-600 font-semibold "
                              onClick={confirmEdit}
                            >
                              <Check size={20} />
                            </button>
                            <button
                              onClick={() => setEditRowId(null)}
                              className="text-red-600 font-semibold"
                            >
                              <CgClose size={20} />
                            </button>
                          </div>
                        ) : editRowId === attendance._id && editLoading ? (
                          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <button
                            onClick={() => handleEdit(attendance)}
                            className="font-semibold text-blue-800 hover:text-blue-600"
                          >
                            <Edit size={20} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {hasMore && (
              <div className="flex justify-center mt-4 ">
                <button
                  onClick={loadMore}
                  className=" text-blue-800 font-semibold hover:text-blue-700"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
