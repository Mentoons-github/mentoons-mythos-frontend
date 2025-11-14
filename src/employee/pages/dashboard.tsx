import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  checkInThunk,
  checkOutThunk,
  getSingleLeaveRequestThunk,
  getThisWeekAttendanceThunk,
  getTodayAttendaceThunk,
} from "../../features/attendance_leave/attendance_leaveThunk";
import { toast } from "sonner";
import { resetAttendanceState } from "../../features/attendance_leave/attendance_leaveSlice";
import AttendanceStats from "../components/AttendanceStatus";
import {
  getEmployeePerformanceThunk,
  getEmployeeTasksThunk,
  taskStatusSummaryEmployeeThunk,
} from "../../features/employee/employeeThunk";
import DashboardTop from "../components/dashboard/DashboardTop";
import DashboardStatsCards from "../components/dashboard/DashboardStatsCards";
import DashboardTodayAttendance from "../components/dashboard/DashboardTodayAttendance";
import DashboardTasks from "../components/dashboard/DashboardTasks";
import ViewTaskDetailsModal from "../components/modals/ViewTaskDetailsModal";
import {
  getSingleTaskDetailsThunk,
  taskStatusSummaryThunk,
} from "../../features/admin/adminThunk";
import { getFirst3NotificationThunk } from "../../features/notification/notificationThunk";
import ViewSingleLeaveRequestModal from "../components/modals/ViewSingleLeaveRequestModal";
import DashboardRecentActivity from "../components/dashboard/DashboardRecentActivity";
import TaskStatusSummary from "../../Admin/components/dashboard/TaskStatusSummary";
import TaskFilterDropdown from "../../Admin/components/dashboard/TaskFilterDropdown";

const EmployeeDashboard = () => {
  const dispatch = useAppDispatch();
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [viewLeaveRequestModal, setViewLeaveRequestmodal] = useState(false);
  const [taskFilter, setTaskFilter] = useState<"week" | "month" | "all">(
    "week"
  );
  const {
    todayAttendance,
    error,
    checkLoading,
    checkSuccess,
    message,
    weekSummary,
    loading,
    singleLeaveRequest,
    singleLoading: leaveLoading,
  } = useAppSelector((state) => state.attendance_leave);
  const {
    singleEmployee,
    singleTask,
    singleLoading,
    taskStatusSummary: taskStatusNumber,
    totalTaskCount,
    loading: statusLoading,
  } = useAppSelector((state) => state.admin);
  const {
    taskStatusTotalCount,
    taskStatusSummary,
    activeTasks,
    tasks,
    performanceScore,
  } = useAppSelector((state) => state.employee);

  const { first3Notifications: notifications } = useAppSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(getThisWeekAttendanceThunk());
    dispatch(taskStatusSummaryEmployeeThunk());
    dispatch(getTodayAttendaceThunk());
    dispatch(getEmployeeTasksThunk({ limit: 5 }));
    dispatch(getFirst3NotificationThunk());
    dispatch(taskStatusSummaryThunk({ filter: taskFilter, from: true }));
    dispatch(getEmployeePerformanceThunk());
  }, [dispatch, taskFilter]);

  useEffect(() => {
    if (checkSuccess) {
      toast.success(message);
      dispatch(resetAttendanceState());
      dispatch(getTodayAttendaceThunk());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAttendanceState());
    }
  }, [checkSuccess, dispatch, error, message]);

  const handleCheckIn = () => {
    dispatch(checkInThunk()).then(() => {
      dispatch(getThisWeekAttendanceThunk());
    });
  };

  const handleCheckOut = () => {
    dispatch(checkOutThunk()).then(() => {
      dispatch(getThisWeekAttendanceThunk());
    });
  };

  const handleNotificationClick = async (notificationId: string) => {
    const notification = notifications.find((n) => n._id === notificationId);
    if (!notification) return;

    const notificationFrom = notification.type;

    if (
      notificationFrom === "Task assign" ||
      notificationFrom === "Task extension"
    ) {
      setViewModal(true);
      dispatch(getSingleTaskDetailsThunk(notification.relatedId));
    } else if (notificationFrom === "Leave request") {
      setViewLeaveRequestmodal(true);
      dispatch(getSingleLeaveRequestThunk(notification.relatedId));
    }
  };

  const handleFilterChange = (filter: string) => {
    const formatted =
      filter === "This Week"
        ? "week"
        : filter === "This Month"
        ? "month"
        : "all";

    setTaskFilter(formatted as "week" | "month" | "all");
  };

  const inProgressCount = activeTasks.filter(
    (ele) => ele.status == "In Progress"
  ).length;

  const handleViewDetails = async (taskId: string) => {
    await dispatch(getSingleTaskDetailsThunk(taskId));
    setViewModal(true);
  };

  return (
    <div className="min-h-screen ">
      <main className=" md:p-3 lg:p-6 space-y-6">
        <DashboardTop
          checkLoading={checkLoading}
          handleCheckIn={handleCheckIn}
          handleCheckOut={handleCheckOut}
          singleEmployee={singleEmployee ?? undefined}
          todayAttendance={todayAttendance ?? undefined}
        />

        <DashboardStatsCards
          performanceScore={performanceScore ?? undefined}
          activeTasks={activeTasks}
          inProgressCount={inProgressCount}
          taskStatusSummary={taskStatusSummary}
          taskStatusTotalCount={taskStatusTotalCount}
          todayAttendance={todayAttendance ?? undefined}
          weekSummary={weekSummary ?? undefined}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Card */}
          <DashboardTodayAttendance
            todayAttendance={todayAttendance ?? undefined}
          />
          {/* Weekly Stats Chart */}
          <div className=" rounded-2xl shadow-lg border  overflow-hidden">
            <AttendanceStats
              from={"employee dashboard"}
              summary={weekSummary ?? undefined}
              loading={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks Section */}
          <div className="lg:col-span-2 space-y-6">
            <DashboardTasks tasks={tasks} viewDetails={handleViewDetails} />


          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}

            <div className="col-span-1 bg-secondary rounded-xl shadow-lg border p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Task Status Summary</h2>
                <TaskFilterDropdown onChange={handleFilterChange} />
              </div>

              <TaskStatusSummary
                summary={taskStatusNumber}
                totalCount={totalTaskCount}
                loading={statusLoading}
              />
            </div>

            {/* Recent Activity */}
            <DashboardRecentActivity
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          </div>
        </div>
      </main>
      {viewModal && (
        <ViewTaskDetailsModal
          onClose={() => setViewModal(false)}
          loading={singleLoading}
          task={singleTask ?? undefined}
        />
      )}

      {viewLeaveRequestModal && (
        <ViewSingleLeaveRequestModal
          onClose={() => setViewLeaveRequestmodal(false)}
          singleLoading={leaveLoading}
          leaveRequest={singleLeaveRequest ?? undefined}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
