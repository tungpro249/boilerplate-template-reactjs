import { Card } from "antd";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PieDataItem {
  name: string;
  value: number;
}

interface CategoryPieChartProps {
  title?: string;
  data: PieDataItem[];
  colors?: string[];
  height?: number;
}

const DEFAULT_COLORS = ["#1677ff", "#52c41a", "#faad14", "#ff4d4f", "#722ed1", "#13c2c2"];

export default function CategoryPieChart({
  title = "Phân loại",
  data,
  colors = DEFAULT_COLORS,
  height = 350,
}: CategoryPieChartProps) {
  return (
    <Card
      title={<span style={{ fontWeight: 600, fontSize: 16 }}>{title}</span>}
      style={{
        borderRadius: 12,
        border: "none",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={4}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={{ strokeWidth: 1 }}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
        </RePieChart>
      </ResponsiveContainer>
    </Card>
  );
}
