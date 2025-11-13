import { ResponsiveBar } from "@nivo/bar";
import { LastFiveDaysSummary } from "../../../types/employee/attendance&leaveTypes";

const AttendanceNivoChart = ({
  summary,
}: {
  summary: LastFiveDaysSummary[];
}) => {
  const chartData = summary.map((item) => ({
    day: item.day,
    present: item.present || 0,
    late: item.late || 0,
    halfday: item.halfday || 0,
    leave: item.leave || 0,
    absent: item.absent || 0,
  }));

  type ColorMapType = {
    present: string;
    absent: string;
    late: string;
    halfday: string;
    leave: string;
  };

  const colorMap: ColorMapType = {
    present: "#22c55e",
    absent: "#ef4444",
    late: "#eab308",
    halfday: "#fb923c",
    leave: "#38bdf8",
  };

  return (
    <div className="w-full min-h-[400px] bg-secondary p-4 ">
      <h2 className="text-[17px] font-bold mb-4">Last 5 Days Attendance</h2>

      <ResponsiveBar
        data={chartData}
        keys={["present", "late", "halfday", "leave", "absent"]}
        indexBy="day"
        margin={{ top: 50, right: 20, bottom: 70, left: 40 }}
        padding={0.4}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={({ id }) => {
          return colorMap[id as keyof ColorMapType];
        }}
        borderWidth={1}
        borderColor="#fff"
        axisTop={null}
        axisRight={null}
        enableLabel={false}
        tooltip={({ id, value, indexValue, color }) => (
          <div className="bg-white p-2 rounded-lg shadow border flex items-center gap-2">
            <span
              style={{
                background: color,
                width: 12,
                height: 12,
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            <span className="whitespace-nowrap text-xs">
              <strong>{indexValue}</strong> — {id.toString().toUpperCase()}:{" "}
              <strong>{Math.round(value)}</strong>
            </span>
          </div>
        )}
        legends={[
          {
            data: [
              { id: "present", label: "Present", color: "#22c55e" },
              { id: "late", label: "Late", color: "#eab308" },
              { id: "halfday", label: "Half Day", color: "#fb923c" },
            ],
            anchor: "top",
            direction: "row",
            translateY: -50,
            itemWidth: 80,
            itemHeight: 20,
            symbolShape: "circle",
            symbolSize: 14,
            dataFrom: "keys",
          },
          {
            data: [
              { id: "leave", label: "On Leave", color: "#38bdf8" },
              { id: "absent", label: "Absent", color: "#ef4444" },
            ],
            anchor: "top",
            direction: "row",
            translateY: -30,
            itemWidth: 80,
            itemHeight: 20,
            symbolShape: "circle",
            symbolSize: 14,
            dataFrom: "keys",
          },
        ]}
        theme={{
          tooltip: { container: { fontSize: "14px", borderRadius: "6px" } },
          legends: { text: { fontSize: 13 } },
        }}
      />
    </div>
  );
};

export default AttendanceNivoChart;
