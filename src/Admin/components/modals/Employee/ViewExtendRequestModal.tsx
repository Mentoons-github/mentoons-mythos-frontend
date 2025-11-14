import { X } from "lucide-react";
import {
  EmployeeTasksTypes,
  ExtensionRequestTypes,
} from "../../../../types/employee/employeetypes";
import { formatToRealDate } from "../../../../utils/DateFormate";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { handleTaskExtensionThunk } from "../../../../features/admin/adminThunk";
import { useEffect } from "react";
import { toast } from "sonner";
import { resetAdminState } from "../../../../features/admin/adminSlice";
import { sendNotification } from "../../../../socket/events/notificationEvents";

const ViewExtendRequestModal = ({
  onClose,
  requestDetails,
  dueDate,
  task,
  onViewTaskClose,
}: {
  onClose: () => void;
  requestDetails?: ExtensionRequestTypes;
  dueDate: string;
  task?: EmployeeTasksTypes;
  onViewTaskClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { updateLoading, updateSuccess, message, error } = useAppSelector(
    (state) => state.admin
  );
  console.log(task?.employee?._id);
  useEffect(() => {
    if (updateSuccess) {
      toast.success(message);
      dispatch(resetAdminState());
      onClose();
      onViewTaskClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetAdminState());
    }
  }, [dispatch, error, message, onClose, onViewTaskClose, updateSuccess]);
  const handleExtension = (status: string) => {
    dispatch(
      handleTaskExtensionThunk({
        taskId: task?._id as string,
        status,
        dueDate: requestDetails?.requestedDate as string,
      })
    )
      .unwrap()
      .then(() => {
        sendNotification(
          task?.employee?._id as string,
          "Employee",
          `Admin '${status}' your extension request for task: ${task?.title}`,
          "Task extension",
          task?._id as string
        );
      });
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="relative w-full max-w-[350pc] md:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-4 md:p-6 bg-secondary hide-scrollbar">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 ">
          Extension Request Details
        </h2>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 space-y-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium mb-1">
                Original Due Date
              </span>
              <p className="text-base">
                {dueDate ? formatToRealDate(dueDate) : "—"}
              </p>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium mb-1">
                Requested Extension Date
              </span>
              <p className="text-base">
                {requestDetails?.requestedDate
                  ? formatToRealDate(requestDetails.requestedDate)
                  : "—"}
              </p>
            </div>
          </div>

          {/* Reason for extension */}
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium mb-1">
              Reason
            </span>
            <p className="text-base">{requestDetails?.reason || "—"}</p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              className="px-3 py-2 bg-red-700 rounded-md hover:bg-red-600"
              onClick={() => handleExtension("Rejected")}
            >
              {updateLoading ? "Updating.." : "Reject"}
            </button>
            <button
              className="px-3 py-2 bg-green-700 rounded-md hover:bg-green-600"
              onClick={() => handleExtension("Approved")}
            >
              {updateLoading ? "Updating.." : "Approve"}
            </button>
          </div>

          <div className="border-t pt-4 flex justify-end text-sm text-muted-foreground">
            <span className="">
              Requested Submitted:{" "}
              {requestDetails?.requestedAt
                ? formatToRealDate(requestDetails.requestedAt)
                : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExtendRequestModal;
