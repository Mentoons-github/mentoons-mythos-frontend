import { useEffect, useState } from "react";
import EmployeeButton from "../../components/Employee/AddEmployee";
import {
  SearchOptions,
  ShowSort,
  SortButton,
} from "../../components/SortDetails";
import AssignTaskModal from "../../components/modals/Employee/AssignTaskModal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  deleteTaskThunk,
  getAllTasksThunk,
  getEmployeeThunk,
  getSingleTaskDetailsThunk,
} from "../../../features/admin/adminThunk";
import { IoFilter } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MultiSelectFilter from "../../components/Employee/EmployeeFilter";
import { formatToRealDate } from "../../../utils/DateFormate";
import { Edit, Eye, Trash2 } from "lucide-react";
import { FilterOptions } from "../../../constants/admin/filterOptions";
import TaskViewModal from "../../components/modals/Employee/TaskViewModal";
import EditTaskModal from "../../components/modals/Employee/EditTaskModal";
import DeleteModal from "../../components/modals/deleteModal";
import { toast } from "sonner";
import { resetAdminState } from "../../../features/admin/adminSlice";

const TaskAssignemnts = () => {
  const [assigntTaskModal, setAssignTaskModal] = useState(false);
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [showTable, setShowTable] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getEmployeeThunk({ page: 1, search: "", limit: 0 }));
  }, [dispatch]);
  const {
    tasks,
    allLoading,
    taskPage,
    taskTotalPage,
    singleTask,
    singleLoading,
    deleteLoading,
    deleteSuccess,
    message,
    error,
  } = useAppSelector((state) => state.admin);
  const [filters, setFilters] = useState({
    designation: [] as string[],
    priority: [] as string[],
    department: [] as string[],
    status: [] as string[],
  });
  const limit = 10;
  useEffect(() => {
    dispatch(
      getAllTasksThunk({
        page: currentPage,
        limit,
        sort: sortOrder,
        search,
        filters,
      })
    );
    const timer = setTimeout(() => {
      setShowTable(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, dispatch, filters, search, sortOrder]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success(message);
      dispatch(resetAdminState());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAdminState());
    }
  }, [deleteSuccess, dispatch, error, message]);

  const handleFilterChange = (
    filterType: keyof typeof filters,
    values: string[]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      designation: [],
      priority: [],
      department: [],
      status: [],
    });
    setCurrentPage(1);
  };

  const handleView = (taskId: string) => {
    setViewModal(true);
    dispatch(getSingleTaskDetailsThunk(taskId));
  };

  const handleEdit = (taskId: string) => {
    setEditModal(true);
    dispatch(getSingleTaskDetailsThunk(taskId));
  };

  const handleDelete = (taskId: string) => {
    setSelectedId(taskId);
    setDeleteModal(true);
  };

  const hasActiveFilters = Object.values(filters).some((f) => f.length > 0);
  return (
    <div className="pt-3 lg:p-4 ">
      <div className="lg:flex mb-4 h-11 items-center space-x-1 md:space-x-4 justify-between space-y-3">
        <div className="flex h-full gap-10 lg:gap-3">
          <div
            className={` md:w-40 h-full px-2 md:px-4 flex items-center justify-between 
                                     border  rounded-lg cursor-pointer 
                                     shadow-md hover:bg-muted transition-all duration-200`}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <div className="flex items-center md:space-x-2">
              <IoFilter size={22} className="text-blue-800" />
              <h3 className="text-[16px] font-medium hidden md:block">
                Filter
              </h3>
            </div>
            <div className="ml-2 flex">
              {showFilters ? (
                <IoIosArrowUp size={20} className="" />
              ) : (
                <IoIosArrowDown size={20} className="" />
              )}
              {hasActiveFilters && (
                <span className="bg-primary text-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {Object.values(filters).reduce((acc, f) => acc + f.length, 0)}
                </span>
              )}
            </div>
          </div>
          <SortButton
            onClick={() => setShowSort((prev) => !prev)}
            showSort={showSort}
          />
        </div>

        <div className="flex gap-3 justify-between">
          <SearchOptions
            search={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <EmployeeButton
            text="Create Task"
            onClick={() => setAssignTaskModal(true)}
          />
        </div>
      </div>

      {showSort && (
        <div className="mt-17 md:mt-0">
          <ShowSort
            sortOrder={sortOrder}
            onClick={(sort) => {
              setSortOrder(sort as "newest" | "oldest");
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {showFilters && (
        <div className="mb-4 p-4 mt-15 md:mt-0 rounded-lg border ">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold ">Filter Employees</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-800 hover:text-blue-700 underline"
              >
                Clear All Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <MultiSelectFilter
              label="Designation"
              options={FilterOptions.designation}
              selectedValues={filters.designation}
              onChange={(values) => handleFilterChange("designation", values)}
            />
            <MultiSelectFilter
              label="Priority"
              options={FilterOptions.priority}
              selectedValues={filters.priority}
              onChange={(values) => handleFilterChange("priority", values)}
            />
            <MultiSelectFilter
              label="Department"
              options={FilterOptions.department}
              selectedValues={filters.department}
              onChange={(values) => handleFilterChange("department", values)}
            />
            <MultiSelectFilter
              label="Status"
              options={FilterOptions.status}
              selectedValues={filters.status}
              onChange={(values) => handleFilterChange("status", values)}
            />
          </div>
        </div>
      )}

      {!showTable || allLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Task details...</span>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center ">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold">No Task available</h2>
          <p className="text-muted-foreground mt-2">
            {hasActiveFilters
              ? "No Task match your current filters. Try adjusting your filters."
              : "It looks like there are no Tasks yet."}
          </p>
        </div>
      ) : (
        <div
          className={`h-[calc(94vh-110px)] overflow-y-auto hide-scrollbar will-change-scroll transform-gpu ${
            showFilters || showSort ? "mt-5" : "mt-17 lg:mt-5"
          }`}
        >
          <div className="inline-block min-w-full">
            <table className="min-w-full table-auto border-collapse rounded-md overflow-hidden">
              <thead className="bg-blue-800 ">
                <tr className="text-white">
                  <th className="px-4 py-4 text-left">No</th>
                  <th className="px-4 py-4 text-left">Task Title</th>
                  <th className="px-4 py-4 text-left">Assigned To</th>
                  <th className="px-4 py-4 text-left">Designation</th>
                  <th className="px-4 py-4 text-left">Priority</th>
                  <th className="px-4 py-4 text-left">Status</th>
                  <th className="px-4 py-4 text-left">Due Date</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task, index) => (
                  <tr
                    key={task._id}
                    className={`border-b ${
                      index % 2 == 0 ? "bg-muted" : ""
                    } border-gray-600`}
                  >
                    <td className="px-4 py-4">{index + 1}</td>
                    <td className="px-4 py-4">{task?.title}</td>
                    <td className="px-4 py-4">{task?.employee?.name}</td>
                    <td className="px-4 py-4">{task?.employee?.designation}</td>
                    <td className={`px-4 py-4 text-white`}>
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
                    <td className="px-4 py-4">
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
                    <td className="px-4 py-4">
                      {formatToRealDate(task?.dueDate)}
                    </td>
                    <td className="px-4 py-4 flex space-x-3">
                      <button
                        onClick={() => handleView(task?._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() => handleEdit(task._id as string)}
                        className=" font-semibold text-blue-800 rounded-md hover:text-blue-600"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        className=" font-semibold text-red-600 rounded-md hover:text-red-700"
                        onClick={() => handleDelete(task?._id as string)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Prev
              </button>

              <span>
                Page {taskPage} of {taskTotalPage}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) => (p < taskTotalPage ? p + 1 : p))
                }
                disabled={currentPage === taskTotalPage}
                className="px-5 py-2 hover:bg-border border-2 rounded-2xl disabled:bg-foreground/40 text-muted-foreground"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {viewModal && (
        <TaskViewModal
          onClose={() => setViewModal(false)}
          loading={singleLoading}
          task={singleTask ?? undefined}
        />
      )}

      {editModal && (
        <EditTaskModal
          loading={singleLoading}
          task={singleTask}
          onClose={() => setEditModal(false)}
          employees={employees}
        />
      )}

      {assigntTaskModal && (
        <AssignTaskModal
          onClose={() => setAssignTaskModal(false)}
          employees={employees}
        />
      )}

      {deleteModal && (
        <DeleteModal
          item="Job"
          onClose={() => setDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteTaskThunk(selectedId ?? ""));
            setDeleteModal(false);
          }}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default TaskAssignemnts;
