import { useState } from "react";
import { LeaveTypes } from "../../../../types/employee/attendance&leaveTypes";
import { formatToRealDate } from "../../../../utils/DateFormate";
import { Loader2 } from "lucide-react";
import RejectReasonModal from "./RejectReasonModal";
import { updateLeaveRequestStatusThunk } from "../../../../features/attendance_leave/attendance_leaveThunk";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { sendNotification } from "../../../../socket/events/notificationEvents";

interface LeaveRequestModalProps {
  onClose: () => void;
  leaveRequest?: LeaveTypes;
  singleLoading: boolean;
  editLoading: boolean;
}

const ViewLeaveRequestModal = ({
  onClose,
  leaveRequest,
  singleLoading,
  editLoading,
}: LeaveRequestModalProps) => {
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [reason, setReason] = useState("");
  const dispatch = useAppDispatch();

  const handleEdit = (
    requestId: string,
    status: string,
    rejectReason?: string
  ) => {
    dispatch(
      updateLeaveRequestStatusThunk({
        requestId,
        data: { status, rejectReason },
      })
    )
      .unwrap()
      .then(() => {
        sendNotification(
          leaveRequest?.employee?._id as string,
          "Employee",
          `Your leave request have been ${status}`,
          "Leave request",
          leaveRequest?._id as string
        );
      })
      .catch((err) => {
        console.error("Error assigning task:", err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-secondary  w-full max-w-[350px] md:max-w-2xl lg:max-w-4xl rounded-xl shadow-lg p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3  hover:text-muted-foreground text-lg font-bold"
        >
          ✕
        </button>

        <h1 className="text-xl md:text-2xl font-semibold mb-6 border-b pb-3">
          Leave Request Details
        </h1>

        {singleLoading || !leaveRequest ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                  Employee Info
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {leaveRequest?.employee?.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {leaveRequest?.employee?.email}
                  </p>
                  <p>
                    <span className="font-medium">Designation:</span>{" "}
                    {leaveRequest?.employee?.designation}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {leaveRequest?.employee?.department}
                  </p>
                  <p>
                    <span className="font-medium">Employee ID:</span>{" "}
                    {leaveRequest?.employee?.employeeID}
                  </p>
                </div>
              </div>

              {/* Leave Details */}
              <div className="bg-muted p-4 rounded-lg border">
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                  Leave Info
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Leave Type:</span>{" "}
                    {leaveRequest.leaveType}
                  </p>
                  <p>
                    <span className="font-medium">From:</span>{" "}
                    {formatToRealDate(leaveRequest.fromDate)}
                  </p>
                  <p>
                    <span className="font-medium">To:</span>{" "}
                    {formatToRealDate(leaveRequest.toDate)}
                  </p>
                  <p>
                    <span className="font-medium">Days:</span>{" "}
                    {leaveRequest.totalDays}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                        ${
                          leaveRequest.status === "Approved"
                            ? "bg-green-100 text-green-700 border border-green-400"
                            : leaveRequest.status === "Rejected"
                            ? "bg-red-100 text-red-700 border border-red-400"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-400"
                        }
                      `}
                    >
                      {leaveRequest.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Applied On:</span>{" "}
                    {formatToRealDate(leaveRequest.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-muted p-4 rounded-lg border">
                <h3 className="font-semibold mb-2 text-base">Leave Reason</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {leaveRequest.reason}
                </p>
              </div>

              {leaveRequest.status === "Rejected" && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-300">
                  <h3 className="font-semibold mb-2 text-red-600 text-base">
                    Rejection Reason
                  </h3>
                  <p className="text-sm text-red-700 leading-relaxed">
                    {leaveRequest.rejectReason}
                  </p>
                </div>
              )}
            </div>

            {leaveRequest.status === "Pending" && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
                >
                  Reject
                </button>
                <button
                  disabled={editLoading}
                  onClick={() =>
                    handleEdit(leaveRequest._id as string, "Approved")
                  }
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                >
                  {editLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Approve
                </button>
              </div>
            )}
          </>
        )}
        {showRejectModal && (
          <RejectReasonModal
            onClose={() => setShowRejectModal(false)}
            onSubmit={() => {
              handleEdit(leaveRequest?._id as string, "Rejected", reason);
              setReason("");
            }}
            reason={reason}
            setReason={setReason}
            editLoading={editLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ViewLeaveRequestModal;
