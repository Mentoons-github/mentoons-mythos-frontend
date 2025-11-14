import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { applyLeaveThunk } from "../../../features/attendance_leave/attendance_leaveThunk";
import { LeaveTypes } from "../../../types/employee/attendance&leaveTypes";
import { toast } from "sonner";
import { resetAttendanceState } from "../../../features/attendance_leave/attendance_leaveSlice";
import { sendNotification } from "../../../socket/events/notificationEvents";

const LeaveApplicationModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { applyLeaveLoading, applyLeaveSuccess, message, error } =
    useAppSelector((state) => state.attendance_leave);
  const { singleEmployee } = useAppSelector((state) => state.admin);
  const [formData, setFormData] = useState<LeaveTypes>({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  useEffect(() => {
    if (applyLeaveSuccess) {
      toast.success(message);
      dispatch(resetAttendanceState());
      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetAttendanceState());
    }
  }, [applyLeaveSuccess, dispatch, error, message, onClose]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    setFormData((pre) => ({ ...pre, [target.name]: target.value }));
  };

  const handleSubmitLeave = () => {
    const { fromDate, leaveType, reason, toDate } = formData;
    if (!fromDate || !toDate || !reason || !leaveType) {
      toast.error("Please fill in all required fields");
      return;
    }
    dispatch(applyLeaveThunk(formData))
      .unwrap()
      .then((response) => {
        const newLeaveId = response?.leaveData?._id;

        if (newLeaveId) {
          sendNotification(
            "admin",
            "Admin",
            `${singleEmployee?.name} submitted a leave request`,
            "Leave request",
            newLeaveId
          );
        }
      })
      .catch((err) => {
        console.error("Error submitting task:", err);
      });
  };
  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 w-full">
      <div className="bg-secondary rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="p-6 border-b ">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold ">Apply for Leave</h3>
              <p className="text-muted-foreground text-sm">
                Submit your leave request
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl transition-colors"
            >
              <XCircle size={24} className="hover:text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-4">
              Choose Leave Type
            </label>
            <select
              className="w-full p-4 border rounded-xl focus:ring-2 bg-secondary transition-all"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="">Select a leave Type</option>
              <option value="Casual">Casual</option>
              <option value="Medical">Medical</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-3">
                Start Date
              </label>
              <input
                required
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3">
                End Date
              </label>
              <input
                required
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl focus:ring-2  transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold  mb-3">
              Reason for Leave
            </label>
            <textarea
              required
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide a detailed reason for your leave request..."
              rows={4}
              className="w-full p-4 border focus:ring-2 rounded-xl resize-none transition-all"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-2 border-t ">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-muted-foreground text-muted-foreground rounded-xl hover:border-foreground hover:text-foreground transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitLeave}
              className="bg-foreground text-background px-8 py-3 rounded-xl hover:bg-foreground/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {applyLeaveLoading ? (
                <div className="flex items-center gap-2">
                  <span>Submitting...</span>
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default LeaveApplicationModal;
