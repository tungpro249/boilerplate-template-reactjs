import { Row, Col } from "antd";
import {
  DollarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import StatCard from "./components/StatCard";
import RevenueLineChart from "./components/RevenueLineChart";
import CategoryPieChart from "./components/CategoryPieChart";
import ReportTable from "./components/ReportTable";

// ── Mock data ──────────────────────────────────────────

const revenueData = [
  { name: "T1", revenue: 32, orders: 18 },
  { name: "T2", revenue: 40, orders: 24 },
  { name: "T3", revenue: 35, orders: 22 },
  { name: "T4", revenue: 50, orders: 30 },
  { name: "T5", revenue: 48, orders: 28 },
  { name: "T6", revenue: 60, orders: 38 },
  { name: "T7", revenue: 55, orders: 35 },
  { name: "T8", revenue: 72, orders: 42 },
  { name: "T9", revenue: 68, orders: 40 },
  { name: "T10", revenue: 80, orders: 48 },
  { name: "T11", revenue: 75, orders: 45 },
  { name: "T12", revenue: 90, orders: 52 },
];

const categoryData = [
  { name: "Điện tử", value: 4500 },
  { name: "Thời trang", value: 3200 },
  { name: "Thực phẩm", value: 2800 },
  { name: "Nội thất", value: 2100 },
  { name: "Khác", value: 1400 },
];

const reportData = [
  { key: "1", name: "Đơn hàng #12345", amount: 2500000, status: "success" as const, date: "2026-03-17" },
  { key: "2", name: "Đơn hàng #12346", amount: 1800000, status: "processing" as const, date: "2026-03-16" },
  { key: "3", name: "Đơn hàng #12347", amount: 3200000, status: "pending" as const, date: "2026-03-16" },
  { key: "4", name: "Đơn hàng #12348", amount: 950000, status: "error" as const, date: "2026-03-15" },
  { key: "5", name: "Đơn hàng #12349", amount: 4100000, status: "success" as const, date: "2026-03-15" },
  { key: "6", name: "Đơn hàng #12350", amount: 1250000, status: "success" as const, date: "2026-03-14" },
  { key: "7", name: "Đơn hàng #12351", amount: 760000, status: "processing" as const, date: "2026-03-14" },
  { key: "8", name: "Đơn hàng #12352", amount: 5400000, status: "success" as const, date: "2026-03-13" },
];

// ── Component ──────────────────────────────────────────

const Dashboard = () => {
  return (
    <div>
      {/* Stat Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Doanh thu"
            value="128.5M"
            suffix="₫"
            trend={12.5}
            icon={<DollarOutlined />}
            color="#1677ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Đơn hàng"
            value={1284}
            trend={8.2}
            icon={<ShoppingCartOutlined />}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Khách hàng"
            value={5630}
            trend={-2.4}
            icon={<UserOutlined />}
            color="#faad14"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Tăng trưởng"
            value="15.3"
            suffix="%"
            trend={5.1}
            icon={<RiseOutlined />}
            color="#722ed1"
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <RevenueLineChart
            title="Biểu đồ doanh thu & đơn hàng"
            data={revenueData}
            lines={[
              { dataKey: "revenue", color: "#1677ff", name: "Doanh thu (triệu)" },
              { dataKey: "orders", color: "#52c41a", name: "Đơn hàng" },
            ]}
          />
        </Col>
        <Col xs={24} lg={8}>
          <CategoryPieChart
            title="Doanh thu theo danh mục"
            data={categoryData}
          />
        </Col>
      </Row>

      {/* Report Table */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <ReportTable data={reportData} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
