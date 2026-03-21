import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppBreadcrumb from "../../shared/components/Breadcrumb";
import Sidebar from "../Sidebar";
import Header from "../Header";
import menuItems from "../../routes/menuItems";
import type { MenuProps } from "antd";
import "./styles.css";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy phần path hiện tại để highlight menu item tương ứng
  const currentPath = location.pathname.replace("/", "") || "home";

  const handleSelect: MenuProps["onSelect"] = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <div className="main-layout">
      <Sidebar
        items={menuItems}
        header={
          <span className="sidebar-brand">🚀 My App</span>
        }
        defaultCollapsed={false}
        theme="dark"
        selectedKeys={[currentPath]}
        onSelect={handleSelect}
      />

      <div className="main-right">
        <Header />
        <main className="main-content">
          <AppBreadcrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

