import { Activity, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { AttendanceTypes } from "../../../types/employee/attendance&leaveTypes";
import { getWorkingHours } from "../../../utils/attendanceFormates";
import { getTime } from "../../../utils/DateFormate";
interface DashboardTodayAttendanceProps {
  todayAttendance?:AttendanceTypes
}
const DashboardTodayAttendance = ({todayAttendance}:DashboardTodayAttendanceProps) => {
  return (
    <div className=" rounded-2xl shadow-lg border p-3 md:p-6 bg-secondary">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold  flex items-center gap-2">
          <Activity className="text-blue-600" size={20} />
          Today's Attendance
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
            todayAttendance?.status === "Present"
              ? "bg-green-400"
              : todayAttendance?.status === "Absent"
              ? "bg-red-400"
              : todayAttendance?.status === "On Leave"
              ? "bg-sky-400"
              : todayAttendance?.status === "Late"
              ? "bg-yellow-400"
              : "bg-orange-400"
          }`}
        >
          {todayAttendance?.status || "Not Checked In"}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 font-medium mb-1">
              Check-In Time
            </p>
            <p className="text-2xl font-bold text-blue-700">
              {todayAttendance?.checkIn
                ? getTime(todayAttendance.checkIn)
                : "--:--"}
            </p>
          </div>
          <div className="bg-background p-4 rounded-xl border border-red-200">
            <p className="text-sm text-red-600 font-medium mb-1">
              Check-Out Time
            </p>
            <p className="text-2xl font-bold text-red-700">
              {todayAttendance?.checkOut
                ? getTime(todayAttendance.checkOut)
                : "--:--"}
            </p>
          </div>
        </div>

        <div className="bg-background p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium mb-1">
                Total Work Hours
              </p>
              <p className="text-3xl font-bold text-purple-700">
                {todayAttendance?.checkOut
                  ? `${todayAttendance.totalHours}`
                  : todayAttendance?.checkIn
                  ? `${getWorkingHours(todayAttendance.checkIn)}`
                  : "0 H"}
              </p>
            </div>
            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center">
              <Clock className="text-purple-700" size={32} />
            </div>
          </div>
        </div>

        {todayAttendance?.checkOut && (
          <div className="bg-background rounded-xl p-4 flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-green-700">Great work today!</p>
              <p className="text-sm text-green-600">
                You've completed your work hours
              </p>
            </div>
          </div>
        )}

        {!todayAttendance?.checkIn && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="text-yellow-600" size={24} />
            <div>
              <p className="font-semibold text-yellow-700">
                Don't forget to check in!
              </p>
              <p className="text-sm text-yellow-600">
                Start your day by checking in
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTodayAttendance;
