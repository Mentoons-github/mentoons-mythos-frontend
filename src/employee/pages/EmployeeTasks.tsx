import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getEmployeeTasksThunk } from "../../features/employee/employeeThunk";
import { ClipboardList, Calendar, Flag, Loader2 } from "lucide-react";
import { formatToRealDate } from "../../utils/DateFormate";
import { getSingleTaskDetailsThunk } from "../../features/admin/adminThunk";
import ViewTaskDetailsModal from "../components/modals/ViewTaskDetailsModal";
import { SearchOptions } from "../../Admin/components/SortDetails";

const status = [
  "All",
  "Pending",
  "In Progress",
  "Completed",
  "Overdue",
  "Completed Late",
  "Extension Requested",
  "Removed",
];

const EmployeeTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, hasMore } = useAppSelector((state) => state.employee);
  const { singleTask, singleLoading } = useAppSelector((state) => state.admin);
  const [viewModal, setViewModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | "">("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  const limit = 12;

  useEffect(() => {
    dispatch(
      getEmployeeTasksThunk({
        limit,
        filter: selectedStatus === "All" ? "" : selectedStatus,
        search,
      })
    );
  }, [dispatch, search, selectedStatus]);

  const handleClick = (taskId: string) => {
    dispatch(getSingleTaskDetailsThunk(taskId));
    setViewModal(true);
  };

  const handleLoadMore = () => {
    const lastTask = tasks[tasks.length - 1];
    dispatch(
      getEmployeeTasksThunk({
        limit: limit,
        lastDate: lastTask?.createdAt,
        filter: selectedStatus === "All" ? "" : selectedStatus,
        search,
      })
    );
  };

  const visibleCount = 4; // how many filters to show in collapsed mode
  return (
    <div className="md:px-4">
      <div className="md:flex items-center justify-between gap-4 mb-4 space-y-2 md:space-y-0">
        <div className="flex gap-1 md:gap-3 flex-wrap md:w-1/2">
          {(expanded ? status : status.slice(0, visibleCount)).map(
            (ele, ind) => (
              <button
                key={ind}
                onClick={() => {
                  const newStatus = ele === "All" ? "" : ele;
                  setSelectedStatus(ele);
                  dispatch(
                    getEmployeeTasksThunk({
                      limit,
                      filter: newStatus,
                      search,
                    })
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm border transition ${
                  ele === selectedStatus
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-white text-gray-700 hover:border-blue-800"
                }`}
              >
                {ele}
              </button>
            )
          )}
          {status.length > visibleCount && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1 rounded-full text-sm border bg-white text-gray-700 hover:border-blue-800"
            >
              {expanded ? "Hide" : `+${status.length - visibleCount}`}
            </button>
          )}
        </div>

        <div className="flex justify-end">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="animate-spin text-muted-foreground" size={28} />
          <p className="ml-3 text-muted-foreground">Loading tasks...</p>
        </div>
      ) : tasks?.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          <ClipboardList className="mx-auto mb-2" size={32} />
          <p>No tasks assigned yet</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              onClick={() => handleClick(task._id as string)}
              key={task._id}
              className="bg-secondary rounded-xl shadow-sm border border-border hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {task.description}
                </p>

                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <Flag size={15} /> <span>Priority:</span>{" "}
                    <span className="font-medium">{task.priority}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar size={15} /> <span>Due:</span>{" "}
                    <span className="font-medium">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center border-t pt-3 text-sm">
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
                  {task.status}
                </span>

                <span className="text-xs text-muted-foreground">
                  {formatToRealDate(task.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {hasMore && (
        <div className="flex justify-center mt-3 text-blue-800 font-bold hover:text-blue-700">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLoadMore();
            }}
          >
            Load More
          </button>
        </div>
      )}
      {viewModal && (
        <ViewTaskDetailsModal
          onClose={() => setViewModal(false)}
          loading={singleLoading}
          task={singleTask ?? undefined}
        />
      )}
    </div>
  );
};

export default EmployeeTasks;
