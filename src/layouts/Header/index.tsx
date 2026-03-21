import { Input, Badge, Avatar, Dropdown } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  SunOutlined,
  MoonOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDarkMode } from "../../shared/hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import "./styles.css";

export default function Header() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Tài khoản",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Cài đặt",
      onClick: () => navigate("/settings"),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
      onClick: () => navigate("/login"),
    },
  ];

  return (
    <header className="app-header">
      {/* ── Search ── */}
      <div className="header-search">
        <Input
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          placeholder="Tìm kiếm..."
          allowClear
          variant="filled"
        />
      </div>

      {/* ── Right Actions ── */}
      <div className="header-actions">
        {/* Dark Mode Toggle */}
        <button
          className="header-icon-btn dark-mode-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDark ? <SunOutlined /> : <MoonOutlined />}
        </button>

        {/* Notification Bell */}
        <Badge count={5} size="small" className="header-noti-badge">
          <button className="header-icon-btn" aria-label="Notifications">
            <BellOutlined />
          </button>
        </Badge>

        {/* User Avatar + Dropdown */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={["click"]}>
          <div className="header-user">
            <Avatar
              size={36}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                cursor: "pointer",
              }}
            >
              TT
            </Avatar>
            <div>
              <div className="header-user-name">Thanh Tùng</div>
              <div className="header-user-role">Admin</div>
            </div>
          </div>
        </Dropdown>
      </div>
    </header>
  );
}
