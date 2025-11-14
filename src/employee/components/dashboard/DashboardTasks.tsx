import { ChevronRight, Clock, Zap } from "lucide-react";
import { EmployeeTasksTypes } from "../../../types/employee/employeetypes";
import { formatToRealDate } from "../../../utils/DateFormate";
import { useNavigate } from "react-router-dom";

interface DashboardTasskProps {
  tasks: EmployeeTasksTypes[];
  viewDetails: (taskId: string) => void;
}

type TaskStatus =
  | "Completed"
  | "Completed Late"
  | "In Progress"
  | "Overdue"
  | "Extension Requested"
  | "Removed"
  | "Pending";

type TaskPriority = "Urgent" | "High" | "Medium" | "Low";

const getStatusStyles = (status: TaskStatus) => {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Completed Late": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    Overdue: "bg-red-50 text-red-700 border-red-200",
    "Extension Requested": "bg-sky-50 text-sky-700 border-sky-200",
    Removed: "bg-gray-50 text-gray-700 border-gray-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
};

const getPriorityStyles = (priority: TaskPriority) => {
  const styles = {
    Urgent: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm",
    High: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-sm",
    Medium:
      "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-sm",
    Low: "bg-gradient-to-r from-green-400 to-green-500 text-gray-900 shadow-sm",
  };
  return styles[priority] || "bg-gray-400 text-white";
};

const DashboardTasks = ({ tasks, viewDetails }: DashboardTasskProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-6xl mx-auto ">
      <div className="bg-secondary rounded-3xl shadow-xl border overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-100">
              <Zap size={24} className="text-blue-700" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                Recent Tasks
              </h3>
              <p className="text-sm text-muted-foreground">
                Stay on top of your priorities
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/employee/tasks")}
            className="bg-blue-600 text-white w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          >
            View All
          </button>
        </div>

        <div className="p-3 sm:p-6 md:p-8 space-y-4">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-8 text-sm sm:text-base">
              No tasks available.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="group bg-background border-2 border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-start">
                  {/* Left Side */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base sm:text-lg md:text-xl mb-3 break-words">
                      {task.title}
                    </h4>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span
                        className={`text-xs sm:text-sm px-3 py-1.5 rounded-full font-bold ${getPriorityStyles(
                          (task.priority ?? "Low") as TaskPriority
                        )}`}
                      >
                        {task.priority}
                      </span>

                      <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 border px-3 py-1.5 rounded-full">
                        <Clock size={14} className="text-gray-500 shrink-0" />
                        <span className="truncate">
                          Due in {formatToRealDate(task.dueDate)}
                        </span>
                      </span>

                      <span
                        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${getStatusStyles(
                          (task.status ?? "Pending") as TaskStatus
                        )}`}
                      >
                        {task.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => viewDetails(task._id as string)}
                      className="flex items-center justify-center border-2 border-blue-600 text-blue-700 px-4 sm:px-5 py-2 rounded-xl font-semibold hover:bg-blue-50 hover:shadow-md transition-all duration-200 text-sm sm:text-base"
                    >
                      View Details
                      <ChevronRight
                        size={16}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTasks;
