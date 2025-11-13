import { LeaveTypes } from "../../../types/employee/attendance&leaveTypes";
import { Loader2 } from "lucide-react";
import { formatToRealDate } from "../../../utils/DateFormate";
import ReactDOM from "react-dom";

interface LeaveRequestModalProps {
  onClose: () => void;
  leaveRequest?: LeaveTypes;
  singleLoading: boolean;
}

const ViewSingleLeaveRequestModal = ({
  onClose,
  leaveRequest,
  singleLoading,
}: LeaveRequestModalProps) => {
  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[350px] md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
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
              <div className="bg-muted p-4 rounded-lg border">
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
          </>
        )}
      </div>
    </div>
  );
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ViewSingleLeaveRequestModal;
