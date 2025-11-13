import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { toast } from "sonner";
import { EmployeeTypes } from "../../../../types/employee/employeetypes";
import {
  DEPARTMENTS,
  DESIGNATIONS,
} from "../../../../constants/addEmployeeSelect";
import { addEmployeeThunk } from "../../../../features/admin/adminThunk";
import { resetAdminState } from "../../../../features/admin/adminSlice";

const AddEmployeeModal = ({ onClose }: { onClose: () => void }) => {
  const { message, addSuccess, error, addLoading } = useAppSelector(
    (state) => state.admin
  );
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<
    Omit<EmployeeTypes, "salary"> & { salary: string }
  >({
    name: "",
    email: "",
    jobType: "",
    department: "",
    designation: "",
    gender: "",
    salary: "",
  });

  useEffect(() => {
    if (addSuccess) {
      toast.success(message);
      onClose();
      dispatch(resetAdminState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAdminState());
    }
  }, [addSuccess, dispatch, error, message, onClose]);

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

    const formattedForm: EmployeeTypes = {
      ...form,
      salary: form.salary ? Number(form.salary) : undefined,
    };

    dispatch(addEmployeeThunk(formattedForm));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-secondary rounded-lg shadow-xl p-4 md:p-6 md:px-10 max-w-[350px] md:max-w-2xl lg:max-w-4xl w-full relative hide-scrollbar overflow-y-auto will-change-scroll transform-gpu max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 hover:text-muted-foreground text-lg font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4  border-b pb-2">
          Add New Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border h-13"
                placeholder="Jhone Due"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border h-13"
                placeholder="jhone@gmail.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border h-13 bg-secondary"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Femail</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Job Type</label>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border h-13 bg-secondary"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Freelance">Free Lance</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Job Role</label>
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border h-13 bg-secondary"
                required
              >
                <option value="">Select Job Role</option>
                {DESIGNATIONS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold">Department</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border h-13 bg-secondary"
                required
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">
                Salary{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (monthly)
                </span>
              </label>
              <input
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className="w-full p-2 rounded-lg border h-13"
                placeholder="25000"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-800 px-6 py-2 rounded font-semibold text-white hover:bg-blue-700"
            >
              {addLoading ? "Adding new Employee" : " Save Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
