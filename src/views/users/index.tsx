import { useState, useMemo } from "react";
import {
  Row,
  Col,
  Avatar,
  Tag,
  Space,
  Dropdown,
  message,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  StopOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  MailOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import CustomTable from "../../shared/components/Table";
import CustomButton from "../../shared/components/Button";
import CustomModal from "../../shared/components/Modal";
import CustomInput from "../../shared/components/Input";
import CustomSelect from "../../shared/components/Select";
import type { ColumnsType } from "antd/es/table";
import "./styles.css";

// ── Types ──────────────────────────────────────────

interface User {
  key: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive" | "banned";
  gender: "male" | "female";
  department: string;
  joinDate: string;
}

// ── Mock Data ──────────────────────────────────────

const mockUsers: User[] = [
  {
    key: "1", id: 1, name: "Nguyễn Văn An", email: "an.nguyen@email.com", phone: "0901234567",
    avatar: "", role: "admin", status: "active", gender: "male", department: "Kỹ thuật", joinDate: "2024-01-15",
  },
  {
    key: "2", id: 2, name: "Trần Thị Bình", email: "binh.tran@email.com", phone: "0912345678",
    avatar: "", role: "editor", status: "active", gender: "female", department: "Marketing", joinDate: "2024-03-20",
  },
  {
    key: "3", id: 3, name: "Lê Hoàng Cường", email: "cuong.le@email.com", phone: "0923456789",
    avatar: "", role: "viewer", status: "inactive", gender: "male", department: "Kinh doanh", joinDate: "2024-05-10",
  },
  {
    key: "4", id: 4, name: "Phạm Minh Duy", email: "duy.pham@email.com", phone: "0934567890",
    avatar: "", role: "editor", status: "active", gender: "male", department: "Kỹ thuật", joinDate: "2024-02-28",
  },
  {
    key: "5", id: 5, name: "Hoàng Thị Oanh", email: "oanh.hoang@email.com", phone: "0945678901",
    avatar: "", role: "admin", status: "active", gender: "female", department: "Nhân sự", joinDate: "2023-11-05",
  },
  {
    key: "6", id: 6, name: "Võ Đức Hải", email: "hai.vo@email.com", phone: "0956789012",
    avatar: "", role: "viewer", status: "banned", gender: "male", department: "Kinh doanh", joinDate: "2024-07-01",
  },
  {
    key: "7", id: 7, name: "Đỗ Thị Lan", email: "lan.do@email.com", phone: "0967890123",
    avatar: "", role: "editor", status: "active", gender: "female", department: "Marketing", joinDate: "2024-04-12",
  },
  {
    key: "8", id: 8, name: "Bùi Quang Minh", email: "minh.bui@email.com", phone: "0978901234",
    avatar: "", role: "viewer", status: "active", gender: "male", department: "Kỹ thuật", joinDate: "2024-06-18",
  },
  {
    key: "9", id: 9, name: "Ngô Thanh Nhã", email: "nha.ngo@email.com", phone: "0989012345",
    avatar: "", role: "editor", status: "inactive", gender: "female", department: "Thiết kế", joinDate: "2024-08-22",
  },
  {
    key: "10", id: 10, name: "Đinh Công Phát", email: "phat.dinh@email.com", phone: "0990123456",
    avatar: "", role: "viewer", status: "active", gender: "male", department: "Hỗ trợ", joinDate: "2025-01-10",
  },
];

// ── Configs ────────────────────────────────────────

const roleConfig = {
  admin: { color: "purple", label: "Admin", icon: <SafetyCertificateOutlined /> },
  editor: { color: "blue", label: "Editor", icon: <EditOutlined /> },
  viewer: { color: "default", label: "Viewer", icon: <UserOutlined /> },
};

const statusConfig = {
  active: { color: "success", label: "Hoạt động" },
  inactive: { color: "warning", label: "Tạm khóa" },
  banned: { color: "error", label: "Cấm" },
};

const avatarColors = [
  "#1677ff", "#52c41a", "#faad14", "#ff4d4f", "#722ed1",
  "#13c2c2", "#eb2f96", "#fa8c16", "#2f54eb", "#a0d911",
];

// ── Component ──────────────────────────────────────

export default function Users() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  // Filter
  const filteredUsers = useMemo(() => {
    let result = [...mockUsers];

    if (search.trim()) {
      const keyword = search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(keyword) ||
          u.email.toLowerCase().includes(keyword) ||
          u.phone.includes(keyword),
      );
    }

    if (roleFilter !== "all") {
      result = result.filter((u) => u.role === roleFilter);
    }

    if (statusFilter !== "all") {
      result = result.filter((u) => u.status === statusFilter);
    }

    return result;
  }, [search, roleFilter, statusFilter]);

  // Stats
  const stats = useMemo(() => ({
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "active").length,
    admin: mockUsers.filter((u) => u.role === "admin").length,
    banned: mockUsers.filter((u) => u.status === "banned").length,
  }), []);

  // Columns
  const columns: ColumnsType<User> = [
    {
      title: "Người dùng",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div className="user-cell">
          <Avatar
            size={40}
            style={{ background: avatarColors[record.id % avatarColors.length], flexShrink: 0 }}
          >
            {record.name.charAt(0)}
          </Avatar>
          <div className="user-cell-info">
            <div className="user-cell-name">
              {record.name}
              {record.gender === "male"
                ? <ManOutlined style={{ color: "#1677ff", marginLeft: 4, fontSize: 12 }} />
                : <WomanOutlined style={{ color: "#eb2f96", marginLeft: 4, fontSize: 12 }} />
              }
            </div>
            <div className="user-cell-email">
              <MailOutlined style={{ marginRight: 4 }} />
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 140,
      render: (phone: string) => (
        <span className="user-phone">
          <PhoneOutlined style={{ marginRight: 4 }} />
          {phone}
        </span>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      width: 130,
      filters: [
        { text: "Kỹ thuật", value: "Kỹ thuật" },
        { text: "Marketing", value: "Marketing" },
        { text: "Kinh doanh", value: "Kinh doanh" },
        { text: "Nhân sự", value: "Nhân sự" },
        { text: "Thiết kế", value: "Thiết kế" },
        { text: "Hỗ trợ", value: "Hỗ trợ" },
      ],
      onFilter: (value, record) => record.department === value,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 120,
      align: "center",
      render: (role: User["role"]) => {
        const cfg = roleConfig[role];
        return (
          <Tag color={cfg.color} icon={cfg.icon}>
            {cfg.label}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status: User["status"]) => {
        const cfg = statusConfig[status];
        return <Tag color={cfg.color}>{cfg.label}</Tag>;
      },
    },
    {
      title: "Ngày tham gia",
      dataIndex: "joinDate",
      key: "joinDate",
      width: 130,
      sorter: (a, b) => a.joinDate.localeCompare(b.joinDate),
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "",
      key: "actions",
      width: 50,
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              { key: "edit", icon: <EditOutlined />, label: "Chỉnh sửa" },
              { key: "delete", icon: <DeleteOutlined />, label: "Xóa", danger: true,
                onClick: () => message.info(`Xóa: ${record.name}`) },
            ],
          }}
          trigger={["click"]}
        >
          <Tooltip title="Thao tác">
            <button className="user-action-btn">
              <MoreOutlined />
            </button>
          </Tooltip>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="users-page">
      {/* Page header */}
      <div className="users-page-header">
        <div>
          <h1 className="users-page-title">Người dùng</h1>
          <p className="users-page-desc">Quản lý thông tin và phân quyền người dùng hệ thống</p>
        </div>
        <CustomButton variant="solid" size="md" icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
          Thêm người dùng
        </CustomButton>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[
          { label: "Tổng người dùng", value: stats.total, icon: <TeamOutlined />, color: "#1677ff", bg: "#e6f4ff" },
          { label: "Đang hoạt động", value: stats.active, icon: <UserOutlined />, color: "#52c41a", bg: "#f6ffed" },
          { label: "Quản trị viên", value: stats.admin, icon: <SafetyCertificateOutlined />, color: "#722ed1", bg: "#f9f0ff" },
          { label: "Bị cấm", value: stats.banned, icon: <StopOutlined />, color: "#ff4d4f", bg: "#fff1f0" },
        ].map((stat) => (
          <Col xs={12} sm={6} key={stat.label}>
            <div className="user-stat-card">
              <div className="user-stat-icon" style={{ color: stat.color, background: stat.bg }}>
                {stat.icon}
              </div>
              <div>
                <div className="user-stat-value">{stat.value}</div>
                <div className="user-stat-label">{stat.label}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Filters */}
      <div className="users-filter-bar">
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} sm={10} md={8}>
            <CustomInput
              size="md"
              placeholder="Tìm tên, email, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              rounded
            />
          </Col>
          <Col xs={12} sm={7} md={4}>
            <CustomSelect
              size="md"
              value={roleFilter}
              onChange={setRoleFilter}
              options={[
                { value: "all", label: "Tất cả vai trò" },
                { value: "admin", label: "Admin" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
            />
          </Col>
          <Col xs={12} sm={7} md={4}>
            <CustomSelect
              size="md"
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "active", label: "Hoạt động" },
                { value: "inactive", label: "Tạm khóa" },
                { value: "banned", label: "Bị cấm" },
              ]}
            />
          </Col>
        </Row>
      </div>

      {/* Table */}
      <CustomTable<User>
        columns={columns}
        dataSource={filteredUsers}
        striped
        pagination={{ pageSize: 10 }}
      />

      {/* Add User Modal (placeholder) */}
      <CustomModal
        title="Thêm người dùng mới"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => {
          message.success("Đã thêm người dùng!");
          setModalOpen(false);
        }}
        okText="Thêm"
        cancelText="Hủy"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "8px 0" }}>
          <CustomInput label="Họ và tên" placeholder="Nhập họ tên..." />
          <CustomInput label="Email" placeholder="Nhập email..." />
          <CustomInput label="Số điện thoại" placeholder="Nhập SĐT..." />
          <CustomSelect
            label="Vai trò"
            placeholder="Chọn vai trò"
            options={[
              { value: "admin", label: "Admin" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Viewer" },
            ]}
          />
          <CustomSelect
            label="Phòng ban"
            placeholder="Chọn phòng ban"
            options={[
              { value: "Kỹ thuật", label: "Kỹ thuật" },
              { value: "Marketing", label: "Marketing" },
              { value: "Kinh doanh", label: "Kinh doanh" },
              { value: "Nhân sự", label: "Nhân sự" },
              { value: "Thiết kế", label: "Thiết kế" },
              { value: "Hỗ trợ", label: "Hỗ trợ" },
            ]}
          />
        </div>
      </CustomModal>
    </div>
  );
}
