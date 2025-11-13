import { SummaryTypes } from "../../../types/employee/attendance&leaveTypes";
import {
  Users,
  CheckCircle,
  Clock,
  UserMinus,
  UserCheck,
  Briefcase,
} from "lucide-react";

const AttendanceStatusDetails = ({ summary }: { summary?: SummaryTypes }) => {
  const stats = [
    {
      label: "Total Employees",
      value: summary?.totalEmployees || 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Present",
      value: summary?.presentDays || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Half Day",
      value: summary?.halfDays || 0,
      icon: Briefcase,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Late",
      value: summary?.lateDays || 0,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "On Leave",
      value: summary?.onLeaveDays || 0,
      icon: UserCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Absent",
      value: summary?.absentDays || 0,
      icon: UserMinus,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className={`flex items-center justify-between p-4 rounded-2xl shadow-sm border ${bg}`}
        >
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
          </div>
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${color} bg-white shadow-inner`}
          >
            <Icon size={24} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStatusDetails;
