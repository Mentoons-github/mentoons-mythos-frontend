import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieScoreChartProps {
  scoreData: { name: string; value: number }[];
  width?: string | number;
  height?: string | number;
}

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#FF6F61",
  "#6A5ACD",
];

const PieScoreChart: React.FC<PieScoreChartProps> = ({
  scoreData,
  width = "100%",
  height = 300,
}) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div style={{ width, height }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={scoreData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {scoreData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieScoreChart;
