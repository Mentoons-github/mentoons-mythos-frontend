import { SummaryTypes } from "../../../types/employee/attendance&leaveTypes";

const DashboardTodayAttendance = ({ summary }: { summary?: SummaryTypes }) => {
  const total = summary?.totalEmployees || 1;

  const stats = [
    {
      label: "Present",
      value: summary?.presentDays ?? 0,
      color: "bg-green-500/15 text-green-600 border border-green-500",
    },
    {
      label: "Absent",
      value: summary?.absentDays ?? 0,
      color: "bg-red-500/15 text-red-600 border border-red-500",
    },
    {
      label: "Late",
      value: summary?.lateDays ?? 0,
      color: "bg-yellow-500/15 text-yellow-600 border border-yellow-500",
    },
    {
      label: "Half Day",
      value: summary?.halfDays ?? 0,
      color: "bg-orange-500/15 text-orange-600 border border-orange-500",
    },
    {
      label: "On Leave",
      value: summary?.onLeaveDays ?? 0,
      color: "bg-blue-500/15 text-blue-600 border border-blue-500",
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-[17px] font-bold mb-4">Today's Attendance</h3>

      <div className="grid grid-cols-3 gap-3">
        {stats.slice(0, 3).map((item) => {
          const percent = ((item.value / total) * 100).toFixed(1);

          return (
            <div
              key={item.label}
              className={`p-3 rounded-xl flex flex-col justify-center items-center gap-1 ${item.color}`}
            >
              <span className="text-xl font-bold">{item.value}</span>
              <span className="text-xs">{item.label}</span>
              <span className="text-sm font-semibold">{percent}%</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        {stats.slice(3).map((item) => {
          const percent = ((item.value / total) * 100).toFixed(1);

          return (
            <div
              key={item.label}
              className={`p-3 rounded-xl flex flex-col justify-center items-center gap-1 ${item.color}`}
            >
              <span className="text-xl font-bold">{item.value}</span>
              <span className="text-xs">{item.label}</span>
              <span className="text-sm font-semibold">{percent}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTodayAttendance;
