import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { requestExtensionThunk } from "../../../features/employee/employeeThunk";
import { toast } from "sonner";
import { resetEmployeeState } from "../../../features/employee/employeeSlice";
import { sendNotification } from "../../../socket/events/notificationEvents";
import { EmployeeTasksTypes } from "../../../types/employee/employeetypes";

const ExtentionModal = ({
  onCloseViewModal,
  onClose,
  task,
}: {
  onCloseViewModal: () => void;
  onClose: () => void;
  task?: EmployeeTasksTypes;
}) => {
  const dispatch = useAppDispatch();
  const { submitLoading, submitSuccess, message, error } = useAppSelector(
    (state) => state.employee
  );
  const { singleEmployee } = useAppSelector((state) => state.admin);
  const [form, setForm] = useState({
    reason: "",
    requestedDate: "",
  });

  useEffect(() => {
    if (submitSuccess) {
      toast.success(message);
      dispatch(resetEmployeeState());
      onClose();
      onCloseViewModal();
    }
    if (error) {
      toast.error(error);
      dispatch(resetEmployeeState());
    }
  }, [dispatch, error, message, onClose, onCloseViewModal, submitSuccess]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      requestExtensionThunk({ taskId: task?._id as string, details: form })
    )
      .unwrap()
      .then(() => {
        sendNotification(
          "admin",
          "Admin",
          `${singleEmployee?.name} need an extension for his task: ${task?.title}`,
          "Task extension",
          task?._id as string
        );
      })
      .catch((err) => {
        console.error("Error submitting task:", err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[350px] md:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
        <button
          className="absolute top-4 right-4 hover:text-muted-foreground"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b pb-2">
          Ask extension
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label className="block mb-1 font-semibold">Reason</label>
            <textarea
              rows={4}
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border "
              placeholder="Enter reason of overdue"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Requesting date</label>
            <input
              type="date"
              name="requestedDate"
              value={form.requestedDate}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border h-13"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-800 px-6 py-2 rounded font-semibold text-white hover:bg-blue-700 float-end"
          >
            {submitLoading ? "Requesting" : "Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExtentionModal;
