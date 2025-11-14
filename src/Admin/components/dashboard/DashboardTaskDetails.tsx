import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  getAllTasksThunk,
  getEmployeeThunk,
} from "../../../features/admin/adminThunk";

import { formatToRealDate } from "../../../utils/DateFormate";
import { BiTask } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const DashboardTaskDetails = () => {
  const [showTable, setShowTable] = useState<boolean>(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployeeThunk({ page: 1, search: "", limit: 0 }));
  }, [dispatch]);
  const { tasks, allLoading } = useAppSelector((state) => state.admin);

  const limit = 10;
  useEffect(() => {
    dispatch(
      getAllTasksThunk({
        page: 1,
        limit,
        sort: "newest",
        search: "",
      })
    );
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="p-4  bg-secondary rounded-2xl shadow-lg border">
      <div className="flex justify-between items-center">
        <h2 className=" md:text-xl font-bold flex items-center gap-2">
          <BiTask className="text-green-800" size={18} />
          Tasks
        </h2>

        <button
          onClick={() => navigate("/admin/employee/tasks")}
          className="px-3 py-2 bg-green-800 flex items-center gap-2 rounded-md hover:bg-green-700 text-white"
        >
          View All
        </button>
      </div>
      {!showTable || allLoading ? (
        <div className="flex justify-center items-center py-10 h-[300px]">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Task details...</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center h-[300px]">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold">No Task available</h2>
          <p className="text-muted-foreground mt-2">
            "It looks like there are no Tasks yet."
          </p>
        </div>
      ) : (
        <div className=" overflow-y-auto h-[300px] hide-scrollbar will-change-scroll transform-gpu mt-6">
          <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
            <thead className="bg-green-800 ">
              <tr className="text-white">
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">Title</th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                  Assigned To
                </th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                  Priority
                </th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">Status</th>
                <th className="md:px-4 px-2 md:py-4 py-2 text-left">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                <tr
                  key={task._id}
                  className={`border-b ${index % 2 == 0 ? "bg-muted" : ""} `}
                >
                  <td className="md:px-4 px-2 md:py-4 py-2">{task?.title}</td>
                  <td className="md:px-4 px-2 md:py-4 py-2">
                    {task?.employee?.name}
                  </td>
                  <td className={`md:px-4 px-2 md:py-4 py-2 text-white`}>
                    <span
                      className={`px-3 py-1 rounded-md font-medium text-xs  ${
                        task.priority == "Urgent"
                          ? "bg-red-500"
                          : task.priority == "High"
                          ? "bg-orange-500"
                          : task.priority == "Medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {task?.priority}
                    </span>
                  </td>
                  <td className="md:px-4 px-2 md:py-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "Completed" ||
                        task.status === "Completed Late"
                          ? "bg-green-100 text-green-700 border border-green-400"
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-700 border border-blue-400"
                          : task.status === "Overdue"
                          ? "bg-orange-100 text-orange-700 border border-orange-400"
                          : task.status === "Extension Requested"
                          ? "bg-sky-100 text-sky-700 border border-sky-400"
                          : task.status === "Removed"
                          ? "bg-red-100 text-red-700 border border-red-400"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-400"
                      }`}
                    >
                      {task?.status}
                    </span>
                  </td>
                  <td className="md:px-4 px-2 md:py-4 py-2">
                    {formatToRealDate(task?.dueDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardTaskDetails;
