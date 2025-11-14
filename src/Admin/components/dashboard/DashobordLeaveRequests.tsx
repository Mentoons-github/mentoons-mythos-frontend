import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  getAllLeaveRequestsThunk,
  getSingleLeaveRequestThunk,
} from "../../../features/attendance_leave/attendance_leaveThunk";
import { formatToRealDate } from "../../../utils/DateFormate";
import { Eye, NotebookPen } from "lucide-react";
import ViewLeaveRequestModal from "../modals/Employee/ViewLeaveRequestModal";
import { toast } from "sonner";
import { resetAttendanceState } from "../../../features/attendance_leave/attendance_leaveSlice";
import { useNavigate } from "react-router-dom";

const DashboardLeaveRequests = () => {
  const dispatch = useAppDispatch();
  const {
    allLeaveRequests,
    loading,
    singleLeaveRequest,
    singleLoading,
    editLoading,
    editSuccess,
    message,
    error,
  } = useAppSelector((state) => state.attendance_leave);
  const navigate = useNavigate()

  const [showTable, setShowTable] = useState<boolean>(false);

  const [viewModal, setViewModal] = useState<boolean>(false);

  const limit = 10;

  useEffect(() => {
    dispatch(
      getAllLeaveRequestsThunk({
        limit,
      })
    );
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

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
    <div className="p-4  bg-secondary rounded-2xl shadow-lg border">
      <div className="flex justify-between items-center">
        <h2 className="md:text-xl font-bold flex items-center gap-2">
          <NotebookPen className="text-green-800" size={18} />
          Latest Leave Requests
        </h2>

        <button onClick={()=>navigate("/admin/employee/leave-management")} className="md:px-3 p-1 md:py-2 bg-green-800 flex items-center gap-2 rounded-md hover:bg-green-700 text-white">
          View All
        </button>
      </div>

      {!showTable || loading ? (
        <div className="flex justify-center items-center py-10  h-[300px]">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Employee details...</span>
        </div>
      ) : allLeaveRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center h-[300px]">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold">No Requests available</h2>
        </div>
      ) : (
        <div className=" overflow-y-auto h-[300px] hide-scrollbar will-change-scroll transform-gpu mt-6">
          <table className="min-w-full table-auto border-collapse  rounded-md hide-scrollbar">
            <thead className="bg-green-800 ">
              <tr className="text-white">
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">Name</th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">From Date</th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">Days</th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">Status</th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">Applied on</th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allLeaveRequests?.map((req, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 == 0 ? "bg-muted" : ""
                  } `}
                >
                  <td className="md:px-4 px-2 md:py-4 py-2">{req?.employee?.name}</td>
                  <td className="md:px-4 px-2 md:py-4 py-2">
                    {formatToRealDate(req?.fromDate)}
                  </td>
                  <td className="md:px-4 px-2 md:py-4 py-2">{req?.totalDays}</td>
                  <td className="md:px-4 px-2 md:py-4 py-2">
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
                  <td className="md:px-4 px-2 md:py-4 py-2">
                    {formatToRealDate(req?.createdAt)}
                  </td>
                  <td className="md:px-4 px-2 md:py-4 py-2 space-x-3">
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

export default DashboardLeaveRequests;
