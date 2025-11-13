import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { EmployeeTasksTypes } from "../../../types/employee/employeetypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  singleSubmissionThunk,
  updateTaskStatusThunk,
} from "../../../features/employee/employeeThunk";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { resetEmployeeState } from "../../../features/employee/employeeSlice";
import SubmitTaskModal from "./SubmitTaskModal";
import ViewSubmitDetailsModal from "./ViewSubmitDetailsModal";
import {
  formatDueDateWithStatus,
  formatToRealDate,
} from "../../../utils/DateFormate";
import ExtentionModal from "./ExtentionModal";

interface EmployeeViewModalProps {
  onClose: () => void;
  task?: EmployeeTasksTypes;
  loading: boolean;
}

const ViewTaskDetailsModal = ({
  onClose,
  task,
  loading,
}: EmployeeViewModalProps) => {
  const dispatch = useAppDispatch();
  const {
    message,
    updateSuccess,
    updateLoading,
    error,
    submission,
    submitLoading,
  } = useAppSelector((state) => state.employee);
  const [submitModal, setSubmitModal] = useState(false);
  const [viewSubmitDetails, setViewSubmitDetails] = useState(false);
  const [exttentionModal, setExtentionModal] = useState(false);
  const handleUpdateStatus = (status: string) => {
    dispatch(updateTaskStatusThunk({ taskId: task?._id as string, status }));
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success(message);
      dispatch(resetEmployeeState());
      setTimeout(() => {
        onClose();
      }, 500);
    }
    if (error) {
      toast.error(error);
      dispatch(resetEmployeeState());
    }
  }, [dispatch, error, message, onClose, updateSuccess]);

  const lateSubmit =
    task?.extensionRequest?.status === "Approved" ||
    task?.extensionRequest?.status === "Rejected";

  const handleSubmit = () => {
    setSubmitModal(true);
  };

  const handleViewSubmission = () => {
    dispatch(singleSubmissionThunk(task?._id as string));
    setViewSubmitDetails(true);
  };

  const handleExtention = () => {
    setExtentionModal(true);
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[350px] md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4  border-b pb-2">
          Task Details
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3">Loading task details...</span>
          </div>
        ) : (
          task && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {task.description || "No description provided"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-md ${
                      task.priority === "Urgent"
                        ? "bg-red-500 text-white"
                        : task.priority === "High"
                        ? "bg-orange-500 text-white"
                        : task.priority === "Medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-400 text-black"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span
                    className={`${
                      task.status === "Completed" ||
                      task.status === "Completed Late"
                        ? " text-green-600"
                        : task.status === "In Progress"
                        ? " text-blue-600"
                        : task.status === "Overdue"
                        ? " text-orange-600"
                        : task.status === "Extension Requested"
                        ? " text-sky-600"
                        : task.status === "Removed"
                        ? " text-red-600"
                        : " text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">
                    {formatToRealDate(task.startDate)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">
                    {formatDueDateWithStatus(task.dueDate, task.status)}
                  </p>
                </div>
              </div>

              {task.attachments?.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Attachments
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {task.attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm underline break-all hover:opacity-80"
                      >
                        {file.split("/").pop()}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between text-sm text-muted-foreground">
                <span>
                  Assigned:{" "}
                  {task.createdAt ? formatToRealDate(task.createdAt) : "—"}
                </span>
                <div>
                  {task.status === "Pending" && (
                    <button
                      className="px-3 py-2 rounded-md text-white font-semibold text-base bg-blue-800 hover:bg-blue-700"
                      onClick={() => handleUpdateStatus("In Progress")}
                      disabled={updateLoading}
                    >
                      {updateLoading ? "Updating task status..." : "Start Task"}
                    </button>
                  )}

                  {task.status === "In Progress" && (
                    <button
                      className="px-3 py-2 rounded-md text-white font-semibold text-base bg-green-700 hover:bg-green-600"
                      onClick={handleSubmit}
                      disabled={updateLoading}
                    >
                      {updateLoading ? "Submitting task..." : "Submit Task"}
                    </button>
                  )}

                  {task.status === "Overdue" && (
                    <button
                      className="px-3 py-2 rounded-md text-white font-semibold text-base bg-yellow-600 hover:bg-yellow-500"
                      onClick={handleExtention}
                    >
                      Ask Extension
                    </button>
                  )}

                  {task.status === "Extension Requested" && (
                    <p className="text-blue-700 border border-blue-400 p-2 rounded-md text-center">
                      Please wait until the admin approves your extension
                      request.
                    </p>
                  )}

                  {(task.status === "Completed" ||
                    task.status === "Completed Late") && (
                    <button
                      className="px-3 py-2 rounded-md w-40 text-white font-semibold text-base bg-indigo-700 hover:bg-indigo-600"
                      onClick={handleViewSubmission}
                    >
                      View Submission
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {submitModal && (
        <SubmitTaskModal
          onClose={() => setSubmitModal(false)}
          task={task ?? undefined}
          lateSubmit={lateSubmit}
        />
      )}
      {viewSubmitDetails && (
        <ViewSubmitDetailsModal
          onClose={() => setViewSubmitDetails(false)}
          submission={submission ?? undefined}
          submitLoading={submitLoading}
        />
      )}
      {exttentionModal && (
        <ExtentionModal
          onCloseViewModal={onClose}
          onClose={() => setExtentionModal(false)}
          task={task ?? undefined}
        />
      )}
    </div>
  );
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ViewTaskDetailsModal;
