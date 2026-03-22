import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

// key = đường dẫn route (VD: key "dashboard" → navigate("/dashboard"))
const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "table",
    icon: <AppstoreOutlined />,
    label: "Bảng",
  },
  {
    key: "management",
    icon: <AppstoreOutlined />,
    label: "Quản lý",
    children: [
      { key: "users", icon: <UserOutlined />, label: "Người dùng" },
      { key: "products", label: "Sản phẩm" },
    ],
  },
  {
    key: "components",
    icon: <BuildOutlined />,
    label: "Components",
  },
  {
    key: "settings",
    icon: <SettingOutlined />,
    label: "Cài đặt",
  },
];

export default menuItems;
