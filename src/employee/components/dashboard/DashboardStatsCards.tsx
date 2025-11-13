import { Award, Clock, Target, Users } from "lucide-react";
import {
  EmployeePerformanceTypes,
  EmployeeTasksTypes,
  TaskStatusSummaryType,
} from "../../../types/employee/employeetypes";
import {
  AttendanceTypes,
  SummaryTypes,
} from "../../../types/employee/attendance&leaveTypes";
import {
  formatHours,
  liveWorkingHours,
} from "../../../utils/attendanceFormates";
import { getTime } from "../../../utils/DateFormate";

interface DashboardStatsCardsProps {
  performanceScore?:EmployeePerformanceTypes
  taskStatusSummary: TaskStatusSummaryType[];
  taskStatusTotalCount: number;
  weekSummary?: SummaryTypes;
  todayAttendance?: AttendanceTypes;
  activeTasks: EmployeeTasksTypes[];
  inProgressCount: number;
}

const DashboardStatsCards = ({
  taskStatusSummary,
  taskStatusTotalCount,
  weekSummary,
  todayAttendance,
  activeTasks,
  inProgressCount,
  performanceScore
}: DashboardStatsCardsProps) => {
  const statusCounts = taskStatusSummary.reduce((acc, item) => {
    acc[item.status] = item.count;
    return acc;
  }, {} as Record<string, number>);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-secondary p-3 md:p-6 rounded-2xl shadow-lg  hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
            <Target className="text-white" size={24} />
          </div>
          <span className="text-sm text-green-600 font-semibold bg-background px-3 py-1 rounded-full">
            {statusCounts.Completed && taskStatusTotalCount
              ? (
                  (statusCounts.Completed / taskStatusTotalCount) *
                  100
                ).toFixed() + "%"
              : "0%"}
          </span>
        </div>
        <h3 className="text-3xl font-bold  mb-1">
          {statusCounts.Completed ? statusCounts.Completed : "0"}{" "}
        </h3>
        <p className="text-muted-foreground text-sm font-medium">
          Tasks Completed
        </p>
        <div className="mt-3 pt-3 border-t ">
          <p className="text-xs text-muted-foreground">This week</p>
        </div>
      </div>

      <div className="bg-secondary p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <Clock className="text-white" size={24} />
          </div>
          <span className="text-sm text-blue-600 font-semibold bg-background px-3 py-1 rounded-full">
            {weekSummary?.avgHours} h
          </span>
        </div>
        <h3 className="text-3xl font-bold  mb-1">
          {todayAttendance?.checkOut
            ? formatHours(todayAttendance.totalHours)
            : todayAttendance?.checkIn
            ? liveWorkingHours(todayAttendance.checkIn)
            : "-- : --"}
        </h3>
        <p className="text-muted-foreground text-sm font-medium">Hours Today</p>
        <div className="mt-3 pt-3 border-t ">
          <p className="text-xs text-muted-foreground">
            {todayAttendance?.checkIn
              ? `Since ${getTime(todayAttendance.checkIn)}`
              : "Not checked in"}
          </p>
        </div>
      </div>

      <div className="bg-secondary p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <Award className="text-white" size={24} />
          </div>
          <span className="text-sm text-purple-600 font-semibold bg-background px-3 py-1 rounded-full">
            {performanceScore?.FinalPercentage}%
          </span>
        </div>
        <h3 className="text-3xl font-bold mb-1">{performanceScore?.FinalRating}</h3>
        <p className="text-muted-foreground text-sm font-medium">
          Performance Score
        </p>
        <div className="mt-3 pt-3 border-t ">
          <p className="text-xs text-muted-foreground">{performanceScore?.PerformanceLabel} rating</p>
        </div>
      </div>

      <div className="bg-secondary p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
            <Users className="text-white" size={24} />
          </div>
          <span className="text-sm text-orange-600 font-semibold bg-background px-3 py-1 rounded-full">
            {activeTasks.length}
          </span>
        </div>
        <h3 className="text-3xl font-bold  mb-1">{inProgressCount}</h3>
        <p className="text-muted-foreground text-sm font-medium">
          Active Projects
        </p>
        <div className="mt-3 pt-3 border-t ">
          <p className="text-xs text-muted-foreground">In progress</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatsCards;
