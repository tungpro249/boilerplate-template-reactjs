import { Card } from "antd";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface LineConfig {
  dataKey: string;
  color: string;
  name?: string;
}

interface RevenueLineChartProps {
  title?: string;
  data: DataPoint[];
  lines: LineConfig[];
  height?: number;
}

export default function RevenueLineChart({
  title = "Doanh thu",
  data,
  lines,
  height = 350,
}: RevenueLineChartProps) {
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
        <ReLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#8c8c8c" }} />
          <YAxis tick={{ fontSize: 12, fill: "#8c8c8c" }} />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              name={line.name || line.dataKey}
              strokeWidth={2.5}
              dot={{ r: 4, fill: line.color }}
              activeDot={{ r: 6 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </Card>
  );
}
