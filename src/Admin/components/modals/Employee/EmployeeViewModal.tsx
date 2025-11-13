import { X } from "lucide-react";
import { formatToRealDate } from "../../../../utils/DateFormate";
import { EmployeeTypes } from "../../../../types/employee/employeetypes";

interface EmployeeViewModalProps {
  onClose: () => void;
  employee?: EmployeeTypes;
  loading: boolean;
}

const EmployeeViewModal = ({
  onClose,
  employee,
  loading,
}: EmployeeViewModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="relative w-full max-w-[350px] md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg p-4 md:p-8 bg-secondary hide-scrollbar">
        <button
          className="absolute top-4 right-4  hover:text-muted-foreground "
          onClick={onClose}
        >
          <X size={22} />
        </button>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 ">Loading employee profile...</span>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center  sm:items-start gap-6 border-b pb-6">
              <div className="w-28 h-28  rounded-full overflow-hidden border-4 border-indigo-500 shadow-md flex-shrink-0">
                <img
                  src={
                    employee?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={employee?.name || "Employee"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left h-28 flex flex-col  justify-center">
                <h2 className="text-2xl font-semibold ">
                  {employee?.name || "Unnamed Employee"}
                </h2>
                <p className="">{employee?.designation || "—"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-base font-medium ">
                  {employee?.email || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Employee ID</p>
                <p className="text-base font-medium ">
                  {employee?.employeeID || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Job Type</p>
                <p className="text-base font-medium ">
                  {employee?.jobType || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="text-base font-medium ">
                  {employee?.department || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="text-base font-medium ">
                  {employee?.gender || "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Salary</p>
                <p className="text-base font-medium ">
                  {employee?.salary
                    ? `₹ ${employee.salary.toLocaleString()}`
                    : "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Date Joined</p>
                <p className="text-base font-medium ">
                  {employee?.createdAt
                    ? formatToRealDate(employee.createdAt)
                    : "—"}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t pt-4 md:flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>ID: {employee?._id || "—"}</span>
              <span className="block md:inline">
                Profile Last Updated: {formatToRealDate(employee?.createdAt)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeViewModal;
