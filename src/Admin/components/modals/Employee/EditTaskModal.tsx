import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { toast } from "sonner";
import {
  EmployeeTasksTypes,
  EmployeeTypes,
} from "../../../../types/employee/employeetypes";
import { resetAdminState } from "../../../../features/admin/adminSlice";
import AssignToDropdown from "./AssignToDropDown";
import { editTaskDetailsThunk } from "../../../../features/admin/adminThunk";

const EditTaskModal = ({
  onClose,
  task,
  loading,
  employees,
}: {
  onClose: () => void;
  task: EmployeeTasksTypes | null;
  loading: boolean;
  employees: EmployeeTypes[];
}) => {
  const { updateLoading, updateSuccess, message, error } = useAppSelector(
    (state) => state.admin
  );
  const dispatch = useAppDispatch();
  const [attachmentInput, setAttachmentInput] = useState("");
  const [form, setForm] = useState<EmployeeTasksTypes>({
    title: "",
    description: "",
    assignedTo: "",
    attachments: [],
    startDate: "",
    dueDate: "",
    priority: "Low",
    status: "",
  });

  const [initialForm, setInitialForm] = useState<EmployeeTasksTypes>({
    title: "",
    description: "",
    assignedTo: "",
    attachments: [],
    startDate: "",
    dueDate: "",
    priority: "Low",
    status: "",
  });

  useEffect(() => {
    if (task) {
      const formattedTask = {
        title: task.title,
        description: task.description,
        assignedTo: task.employee?._id || "",
        attachments: task.attachments || [],
        startDate: task.startDate?.slice(0, 10) || "",
        dueDate: task.dueDate?.slice(0, 10) || "",
        priority: task.priority,
        status: task.status,
      };
      setForm(formattedTask);
      setInitialForm(formattedTask);
    }
  }, [task]);

  const isFormChanged = () => {
    return JSON.stringify(form) !== JSON.stringify(initialForm);
  };

  useEffect(() => {
    if (updateSuccess) {
      toast.success(message);
      dispatch(resetAdminState());
      onClose();
    }
    if (error) {
      toast.error(error);
      dispatch(resetAdminState());
    }
  }, [dispatch, error, message, onClose, updateSuccess]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleAttachments = () => {
    if (attachmentInput.trim()) {
      setForm((prev) => ({
        ...prev,
        attachments: [...prev.attachments, attachmentInput.trim()],
      }));
      setAttachmentInput("");
    }
  };

  const handleRemoveAttachments = (index: number) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      editTaskDetailsThunk({
        taskId: task?._id as string,
        data: form,
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-secondary rounded-lg shadow-xl p-4 md:p-6 md:px-10 max-w-[350px] md:max-w-2xl lg:max-w-4xl w-full relative hide-scrollbar overflow-y-auto will-change-scroll transform-gpu max-h-[95vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2  hover:text-muted-foreground text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl md:text-2xl font-semibold mb-4 border-b pb-2">
          Update Job
        </h2>

        {loading || !task ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3">Loading Job details...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border h-13"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <AssignToDropdown
                employees={employees}
                value={form.assignedTo}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, assignedTo: val }))
                }
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                rows={4}
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border "
                placeholder="Enter task description"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border h-13 bg-secondary"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Completed Late">Completed Late</option>
                  <option value="Extension Requested">
                    Extension Requested
                  </option>
                  <option value="Removed">Removed</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  Task Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border h-13 bg-secondary"
                  required
                >
                  <option value="">Select Task Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border h-13"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border h-13"
                  placeholder="25000"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Attachments</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={attachmentInput}
                    onChange={(e) => setAttachmentInput(e.target.value)}
                    className="w-full p-2 rounded-lg border h-13"
                    placeholder="Enter Activities"
                  />
                  <button
                    type="button"
                    onClick={handleAttachments}
                    className="bg-foreground px-4 rounded-lg text-background hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {form.attachments?.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center bg-foreground text-background border rounded-lg px-3 py-2 gap-2"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachments(i)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormChanged() || updateLoading}
              className={`px-6 py-2 rounded font-semibold float-end text-white ${
                !isFormChanged() || updateLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-700"
              }`}
            >
              {updateLoading ? "Updating Task" : "Update Task"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditTaskModal;
