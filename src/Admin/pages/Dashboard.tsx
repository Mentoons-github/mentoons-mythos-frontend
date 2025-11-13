import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllUserCountThunk } from "../../features/user/userThunk";
import { fetcheBlogCountThunk } from "../../features/blog/blogThunk";
import {
  fetchJobApplicationCountThunk,
  fetchJobsCountThunk,
  getAllApplicationsThunk,
} from "../../features/career/careerThunk";
import { Users, Briefcase, ClipboardList, Calendar } from "lucide-react";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import {
  fetchEnquiryCountThunk,
  fetchWorkshopCountThunk,
} from "../../features/workshop/workshopThunk";
import {
  getLastFiveDaysAttendanceSummaryThunk,
  getTodayAttendanceAllEmployeesThunk,
} from "../../features/attendance_leave/attendance_leaveThunk";
import JobDistributionChart from "../components/dashboard/JboDistributionChart";
import {
  getEmployeeJobDistributionsThunk,
  taskStatusSummaryThunk,
} from "../../features/admin/adminThunk";
import AttendanceBarChart from "../components/dashboard/AttendanceBarChart";
import DashboardLeaveRequests from "../components/dashboard/DashobordLeaveRequests";
import DashboardTodayAttendance from "../components/dashboard/DashboardTodayAttendance";
import LatestJobApplications from "../components/dashboard/LatestJobApplications";
import DashboardTaskDetails from "../components/dashboard/DashboardTaskDetails";
import TaskStatusSummary from "../components/dashboard/TaskStatusSummary";
import TaskFilterDropdown from "../components/dashboard/TaskFilterDropdown";

const Dashboard = () => {
  const [taskFilter, setTaskFilter] = useState<"week" | "month" | "all">(
    "week"
  );

  const dispatch = useAppDispatch();
  const { userCount } = useAppSelector((state) => state.user);
  const { jobCount, jobApplicationCount } = useAppSelector(
    (state) => state.career
  );
  const { allEmployeeSummary, lastFiveDaySummary } = useAppSelector(
    (state) => state.attendance_leave
  );
  const {
    jobDistribution,
    totalEmployee,
    taskStatusSummary,
    totalTaskCount,
    loading: adminLoading,
  } = useAppSelector((state) => state.admin);
  const { applications } = useAppSelector((state) => state.career);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUserCountThunk());
    dispatch(fetcheBlogCountThunk());
    dispatch(fetchJobsCountThunk());
    dispatch(fetchJobApplicationCountThunk());
    dispatch(fetchEnquiryCountThunk());
    dispatch(fetchWorkshopCountThunk());
    dispatch(getEmployeeJobDistributionsThunk());
    dispatch(getLastFiveDaysAttendanceSummaryThunk());
    dispatch(taskStatusSummaryThunk({ filter: taskFilter }));
    dispatch(
      getAllApplicationsThunk({ limit: 5, page: 1, sort: "newest", search: "" })
    );
    dispatch(getTodayAttendanceAllEmployeesThunk({ limit: 10, page: 10 }));
  }, [dispatch, taskFilter]);

  const stats = [
    {
      label: "Total Users",
      value: userCount,
      icon: <Users className="w-8 h-8" />,
      iconBg: "#2563eb", // Blue-600
      navigate: "/admin/users",
    },
    {
      label: "Active Jobs",
      value: jobCount,
      icon: <Briefcase className="w-8 h-8" />,
      iconBg: "#ea580c", // Orange-600
      navigate: "/admin/career/jobs",
    },
    {
      label: "Job Applications",
      value: jobApplicationCount,
      icon: <ClipboardList className="w-8 h-8" />,
      iconBg: "#16a34a", // Green-600
      navigate: "/admin/career/applications",
    },
    {
      label: "Total Employees",
      value: totalEmployee,
      icon: <Users className="w-8 h-8" />,
      iconBg: "#7c3aed", // Violet-600
      navigate: "/admin/employee/all-employees",
    },
  ];

  const handleFilterChange = (filter: string) => {
    const formatted =
      filter === "This Week"
        ? "week"
        : filter === "This Month"
        ? "month"
        : "all";

    setTaskFilter(formatted as "week" | "month" | "all");
  };

  return (
    <div className="pt-3  md:p-6 ">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white dark:bg-secondary shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-6 group"
            onClick={() => navigate(stat.navigate)}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="h-14 w-14 rounded-xl flex items-center justify-center shadow-inner
                     group-hover:scale-105 transition-transform"
                style={{
                  background: `linear-gradient(135deg, ${stat.iconBg}, ${stat.iconBg}cc)`,
                }}
              >
                <span className="text-white">{stat.icon}</span>
              </div>

              <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                <CountUp
                  start={0}
                  end={stat.value || 0}
                  duration={2}
                  separator=","
                />
              </span>
            </div>

            <h2 className="text-[15px] font-semibold text-gray-500 dark:text-gray-300 tracking-wide">
              {stat.label}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 mt-6 gap-6 ">
        <div className="col-span-3 xl:col-span-2 space-y-10  ">
          <div className="h-[380px]">
            <DashboardLeaveRequests />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <JobDistributionChart distribution={jobDistribution ?? undefined} />
            <LatestJobApplications applications={applications} />
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1 bg-secondary rounded-2xl shadow-lg border">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="text-green-800" size={18} />
              Attendance overview
            </h2>
          </div>
          <div className="">
            <DashboardTodayAttendance
              summary={allEmployeeSummary ?? undefined}
            />
            <AttendanceBarChart summary={lastFiveDaySummary} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-6 gap-6">
        <div className="col-span-3 xl:col-span-2">
          <DashboardTaskDetails />
        </div>
        <div className="col-span-3 xl:col-span-1 bg-secondary rounded-xl shadow-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Task Status Summary</h2>
            <TaskFilterDropdown onChange={handleFilterChange} />
          </div>

          <TaskStatusSummary
            summary={taskStatusSummary}
            totalCount={totalTaskCount}
            loading={adminLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
