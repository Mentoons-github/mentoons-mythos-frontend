import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { SummaryTypes } from "../../types/employee/attendance&leaveTypes";
import { Calendar } from "lucide-react";

const COLORS = ["#4ade80", "#facc15", "#fb923c", "#f87171", "#60a5fa"];

interface AttendanceStatsProps {
  summary?: SummaryTypes;
  loading: boolean;
  from?: string;
}

const AttendanceStats = ({ summary, loading, from }: AttendanceStatsProps) => {
  const [chartData, setChartData] = useState<
    { name: string; value: number; index: number }[]
  >([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (summary) {
      const counts = {
        Present: summary.presentDays || 0,
        Late: summary.lateDays || 0,
        "Half Day": summary.halfDays || 0,
        Absent: summary.absentDays || 0,
        "On Leave": summary.onLeaveDays || 0,
      };

      const formattedData = Object.entries(counts).map(
        ([name, value], index) => ({
          name,
          value,
          index,
        })
      );
      setChartData(formattedData);
      setTotal(formattedData.reduce((sum, d) => sum + d.value, 0));
    } else {
      setChartData([]);
      setTotal(0);
    }
  }, [summary]);

  return (
    <div
      className={`${
        from ? "mt-0" : "mt-5"
      } bg-secondary rounded-xl shadow-sm p-4 sm:p-6`}
    >
      {from && (
        <div className="pb-3">
          <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Calendar className="text-blue-600" size={20} />
            {from === "admin dashboard"
              ? "Today Attendance Details"
              : "This Week Attendance"}
          </h2>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3">Loading attendance details...</span>
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full mb-3 text-3xl">
            📭
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">
            No attendance records
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            It looks like there are no attendance records available.
          </p>
        </div>
      ) : (
        <div
          className={`flex flex-col ${
            from ? "md:flex-col" : "md:flex-row"
          } items-center justify-center gap-6 lg:gap-10 w-full`}
        >
          {/* CHART */}
          <div className="relative w-full sm:w-[80%] md:w-2/3 h-[260px] sm:h-[320px] md:h-[380px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={from === "admin dashboard" ? 50 : 60}
                  outerRadius={from === "admin dashboard" ? 90 : 120}
                  isAnimationActive
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload?.length) return null;
                    const { name, value } = payload[0];
                    const percentage =
                      total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                    const index = chartData.findIndex(
                      (item) => item.name === name
                    );
                    return (
                      <div className="bg-white border border-gray-300 rounded-lg px-3 py-1 shadow-md text-sm relative">
                        <span
                          className="absolute left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></span>
                        <p className="font-semibold text-gray-800 pl-4">
                          {name}
                        </p>
                        <p className="text-gray-600 pl-4">
                          {value}{" "}
                          {from === "admin dashboard" ? "Employees" : "Days"} (
                          {percentage}%)
                        </p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {total}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {from === "admin dashboard" ? "Employees" : "Days"}
              </p>
            </div>
          </div>

          {/* LEGEND */}
          <div
            className={`flex ${
              from
                ? "flex-row flex-wrap justify-center gap-4"
                : "flex-col gap-3 md:w-1/3 w-full text-center md:text-left"
            }`}
          >
            {chartData.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-center sm:justify-start gap-2`}
              >
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  {entry.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({entry.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceStats;
