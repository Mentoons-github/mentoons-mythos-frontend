import { Calendar, CheckCircle, Clock, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { EmployeeTypes } from "../../../types/employee/employeetypes";
import { AttendanceTypes } from "../../../types/employee/attendance&leaveTypes";

interface DashboardTopProps {
  singleEmployee?: EmployeeTypes;
  todayAttendance?: AttendanceTypes;
  handleCheckIn: () => void;
  handleCheckOut: () => void;
  checkLoading: boolean;
}

const DashboardTop = ({
  singleEmployee,
  todayAttendance,
  handleCheckIn,
  checkLoading,
  handleCheckOut,
}: DashboardTopProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-secondary rounded-2xl shadow-lg p-3 md:p-5 lg:p-8 ">
      <div className="md:flex items-center justify-between space-y-4">
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold flex items-center gap-3">
            {getGreeting()}, {singleEmployee?.name}! 👋
          </h1>
          <div className="flex items-center text-xs md:text-base gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          {!todayAttendance?.checkIn && (
            <button
              onClick={handleCheckIn}
              disabled={checkLoading}
              className="bg-blue-800 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 font-semibold shadow-lg disabled:opacity-50"
            >
              <LogIn size={20} />
              {checkLoading ? "Checking In..." : "Check In"}
            </button>
          )}
          {todayAttendance?.checkIn && !todayAttendance?.checkOut && (
            <button
              onClick={handleCheckOut}
              disabled={checkLoading}
              className="bg-red-800 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all flex items-center gap-2 font-semibold shadow-lg disabled:opacity-50"
            >
              <LogOut size={20} />
              {checkLoading ? "Checking Out..." : "Check Out"}
            </button>
          )}
          {todayAttendance?.checkOut && (
            <div className="bg-green-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold">
              <CheckCircle size={20} />
              Day Completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTop;
