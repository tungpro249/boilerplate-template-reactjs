import { Tag, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import CustomTable from "../../../shared/components/Table";

interface ReportItem {
  key: string;
  name: string;
  amount: number;
  status: "success" | "processing" | "pending" | "error";
  date: string;
}

const statusMap: Record<string, { color: string; label: string }> = {
  success: { color: "green", label: "Hoàn thành" },
  processing: { color: "blue", label: "Đang xử lý" },
  pending: { color: "orange", label: "Chờ duyệt" },
  error: { color: "red", label: "Thất bại" },
};

const columns: ColumnsType<ReportItem> = [
  {
    title: "Tên giao dịch",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
    key: "amount",
    render: (val: number) =>
      val.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const s = statusMap[status] || { color: "default", label: status };
      return <Tag color={s.color}>{s.label}</Tag>;
    },
    filters: Object.entries(statusMap).map(([value, { label }]) => ({ text: label, value })),
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "Ngày",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
];

interface ReportTableProps {
  title?: string;
  data: ReportItem[];
}

export default function ReportTable({ title = "Báo cáo giao dịch gần đây", data }: ReportTableProps) {
  return (
    <CustomTable<ReportItem>
      title={title}
      columns={columns}
      dataSource={data}
      searchable
      searchPlaceholder="Tìm giao dịch..."
      showRefresh
      onRefresh={() => console.log("Refresh data")}
      onSearch={(v) => console.log("Search:", v)}
      striped
      headerActions={
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm mới
        </Button>
      }
      pagination={{ pageSize: 5 }}
      scroll={{ x: 600 }}
    />
  );
}
