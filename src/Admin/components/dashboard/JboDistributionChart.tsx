import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { EmployeeJobDistribution } from "../../../types/employee/employeetypes";

// Define the data type
type ChartData = {
  name: string;
  value: number | undefined;
};

// Define payload type
type PayloadItem = {
  name: string;
  value: number;
  payload: ChartData;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: PayloadItem[];
};

const JobDistributionChart = ({distribution}:{distribution?:EmployeeJobDistribution}) => {
  const data: ChartData[] = [
    { name: "Full-Time", value: distribution?.fullTime },
    { name: "Freelance", value: distribution?.freelance },
    { name: "Intern", value: distribution?.intern },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

  const total = data.reduce((acc, item) => acc + (item.value ?? 0), 0);

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percent = ((value / total) * 100).toFixed(1);

      return (
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-md p-3 border border-gray-200 dark:border-gray-600">
          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-200">
            {value} employees ({percent}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const legendFormatter = (value: string) => {
    const match = data.find((item) => item.name === value);
    return `${value} (${match?.value ?? 0})`;
  };

  return (
    <div className="bg-secondary p-6 rounded-xl shadow-lg border ">
      <h2 className="text-xl font-bold mb-4 ">
        Job Distribution
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={legendFormatter} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobDistributionChart;