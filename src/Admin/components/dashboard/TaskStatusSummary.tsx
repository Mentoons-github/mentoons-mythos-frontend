import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { TaskStatusSummaryType } from "../../../types/employee/employeetypes";

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number; fill: string } }>;
};

const TaskStatusSummary = ({
  summary,
  totalCount,
  loading,
}: {
  summary: TaskStatusSummaryType[];
  totalCount: number;
  loading: boolean;
}) => {
  const COLORS = [
    "#F59E0B", //yellow
    "#4F46E5", // blue
    "#22c52e", // big green
    "#F97316", //orenge
    "#10B981", // green
    "#8B5CF6", // violet
    "#EF4448", // red
  ];

  const chartData = summary.map((item) => ({
    name: item.status,
    value: item.count ?? 0,
  }));

  const total = chartData.reduce((acc, item) => acc + item.value, 0);

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || !payload.length) return null;

    const { name, value, fill } = payload[0].payload;
    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

    return (
      <div className="bg-white dark:bg-gray-700 shadow-lg rounded-md p-3 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: fill }}
          />
          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-200">
          {value} tasks ({percent}%)
        </p>
      </div>
    );
  };



  return (
    <div className="p-3 md:p-6 rounded-xl h-[350px]">
      {loading ? (
        <div className="flex justify-center items-center py-10 h-[300px]">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 ">Loading Task details...</span>
        </div>
      ) : totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center  text-center h-full">
          <div className="w-16 h-16 flex items-center justify-center rounded-full  mb-4">
            📭
          </div>
          <h2 className="text-xl font-semibold">No Task available</h2>
          <p className="text-muted-foreground mt-2">
            "It looks like there are no Tasks."
          </p>
        </div>
      ) : (
        <div className="w-full h-80 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={90}
                paddingAngle={1}
                dataKey="value"
                nameKey="name"
                stroke="none"
                labelLine={false}
              >
                <Label
                  value={totalCount}
                  position="center"
                  className="text-xl font-bold"
                  dy={-10}
                />
                <Label
                  value="Tasks"
                  position="center"
                  className="text-sm"
                  dy={10}
                />
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TaskStatusSummary;
