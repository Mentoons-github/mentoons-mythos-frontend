import { X } from "lucide-react";
import {
  formatDueDateWithStatus,
  formatToRealDate,
} from "../../../../utils/DateFormate";
import { EmployeeTasksTypes } from "../../../../types/employee/employeetypes";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useState } from "react";
import { singleSubmissionThunk } from "../../../../features/employee/employeeThunk";
import ViewSubmitDetailsModal from "../../../../employee/components/modals/ViewSubmitDetailsModal";
import ViewExtendRequestModal from "./ViewExtendRequestModal";

interface EmployeeViewModalProps {
  onClose: () => void;
  task?: EmployeeTasksTypes;
  loading: boolean;
}

const TaskViewModal = ({ onClose, task, loading }: EmployeeViewModalProps) => {
  const [viewSubmitDetails, setViewSubmitDetails] = useState(false);
  const [viewRequestModal, setViewRequestModal] = useState(false);
  const dispatch = useAppDispatch();
  const { submission, submitLoading } = useAppSelector(
    (state) => state.employee
  );

  const handleViewSubmission = () => {
    dispatch(singleSubmissionThunk(task?._id as string));
    setViewSubmitDetails(true);
  };
  const handleViewRequest = () => {
    setViewRequestModal(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[350px] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
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
                <p className="text-sm  mt-1">
                  {task.description || "No description provided"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Assigned To</p>
                  <p className="font-medium">{task.employee?.name || "—"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{task.employee?.email || "—"}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">
                    {task.employee?.department || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Designation</p>
                  <p className="font-medium">
                    {task.employee?.designation || "—"}
                  </p>
                </div>

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
                    {formatDueDateWithStatus(task.dueDate)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 ">
                <div>
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
                            className="text-sm underline break-all hover:opacity-80 "
                          >
                            {file.split("/").pop()}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  {(task.status === "Completed" ||
                    task.status === "Completed Late") && (
                    <button
                      className="px-3 py-2 rounded-md w-40 text-white font-semibold text-base bg-blue-800 hover:bg-blue-700"
                      onClick={handleViewSubmission}
                    >
                      View Submission
                    </button>
                  )}
                  {task.status === "Extension Requested" && (
                    <button
                      className="px-3 py-2 rounded-md w-40 text-white font-semibold text-base bg-blue-800 hover:bg-blue-700"
                      onClick={handleViewRequest}
                    >
                      View Request
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 md:flex justify-between text-sm text-muted-foreground">
                <span>ID: {task._id || "—"}</span>
                <span className="block md:inline">
                  Created:{" "}
                  {task.createdAt ? formatToRealDate(task.createdAt) : "—"}
                </span>
              </div>
            </div>
          )
        )}
      </div>

      {viewSubmitDetails && (
        <ViewSubmitDetailsModal
          onClose={() => setViewSubmitDetails(false)}
          submission={submission ?? undefined}
          submitLoading={submitLoading}
        />
      )}

      {viewRequestModal && (
        <ViewExtendRequestModal
          onClose={() => setViewRequestModal(false)}
          requestDetails={task?.extensionRequest ?? undefined}
          dueDate={task?.dueDate as string}
          task={task ?? undefined}
          onViewTaskClose={onClose}
        />
      )}
    </div>
  );
};

export default TaskViewModal;
