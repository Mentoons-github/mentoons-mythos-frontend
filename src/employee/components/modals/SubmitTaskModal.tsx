import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fileUploadThunk } from "../../../features/upload/fileUploadThunk";
import {
  submitTaskThunk,
  updateTaskStatusThunk,
} from "../../../features/employee/employeeThunk";
import { toast } from "sonner";
import { resetEmployeeState } from "../../../features/employee/employeeSlice";
import { sendNotification } from "../../../socket/events/notificationEvents";
import { EmployeeTasksTypes } from "../../../types/employee/employeetypes";

interface SubmitTaskModalProps {
  onClose: () => void;
  task?: EmployeeTasksTypes;
  lateSubmit: boolean;
}

const SubmitTaskModal = ({
  onClose,
  task,
  lateSubmit,
}: SubmitTaskModalProps) => {
  const dispatch = useAppDispatch();
  const { file: uploadedFile } = useAppSelector((state) => state.upload);
  const { submitSuccess, submitLoading, message, error } = useAppSelector(
    (state) => state.employee
  );
  const { singleEmployee } = useAppSelector((state) => state.admin);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    details: "",
    links: "",
  });

  useEffect(() => {
    if (submitSuccess) {
      toast.success(message);
      dispatch(resetEmployeeState());
      dispatch(
        updateTaskStatusThunk({
          taskId: task?._id as string,
          status: lateSubmit ? "Completed Late" : "Completed",
        })
      );
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetEmployeeState());
    }
  }, [dispatch, error, lateSubmit, message, onClose, submitSuccess, task?._id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "file") {
      if (target.files) {
        const selectedFiles = Array.from(target.files);
        setFiles(selectedFiles);
      }
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = uploadedFile;

    if (files.length > 0) {
      try {
        imageUrl = await dispatch(
          fileUploadThunk({ file: files, category: "taskSubmission" })
        ).unwrap();
      } catch (err) {
        alert("File upload failed: " + err);
        return;
      }
    }

    const attachedFilesArray =
      imageUrl != null ? (Array.isArray(imageUrl) ? imageUrl : [imageUrl]) : [];

    const formattedForm = {
      ...form,
      taskId: task?._id,
      attachedFiles: attachedFilesArray as {
        url: string;
        originalName: string;
      }[],
    };

    dispatch(submitTaskThunk(formattedForm))
      .unwrap()
      .then(() => {
        sendNotification(
          "admin",
          "Admin",
          `${singleEmployee?.name} submitted his task: ${task?.title}`,
          "Task submission",
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
          Submit Task
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-1 font-semibold">Details</label>
          <textarea
            rows={4}
            name="details"
            value={form.details}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border"
            placeholder="Enter task details "
            required
          />

          <label className="block mt-4 mb-1 font-semibold">
            Attach Files (Images / PDFs)
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            id="fileUpload"
            onChange={handleChange}
            className="w-full p-2 rounded-lg border h-13"
            multiple
          />

          {/* Preview section */}
          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg p-1 flex flex-col items-center"
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-24 text-sm text-center">
                      📄 {file.name}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-primary text-secondary rounded-full px-2 py-0.5 text-xs hover:bg-muted-foreground"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-800 mt-4 float-end px-6 py-2 rounded font-semibold text-white hover:bg-blue-700"
          >
            {submitLoading ? "Submitting task" : "submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTaskModal;
