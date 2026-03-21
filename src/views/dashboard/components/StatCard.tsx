import { Card, Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: ReactNode;
  suffix?: string;
  trend?: number; // phần trăm tăng/giảm
  icon?: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  prefix,
  suffix,
  trend,
  icon,
  color = "#1677ff",
}: StatCardProps) {
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        border: "none",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Statistic
          title={<span style={{ fontSize: 14, color: "#8c8c8c" }}>{title}</span>}
          value={value}
          prefix={prefix}
          suffix={suffix}
          valueStyle={{ fontSize: 28, fontWeight: 700, color }}
        />
        {icon && (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: `${color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {trend !== undefined && (
        <div style={{ marginTop: 8, fontSize: 13, color: isPositive ? "#52c41a" : "#ff4d4f" }}>
          {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{" "}
          {Math.abs(trend)}% so với tháng trước
        </div>
      )}
    </Card>
  );
}
