import { Outlet } from "react-router-dom";
import "./styles.css";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-brand-panel">
        <div className="auth-brand-logo">🚀</div>
        <div className="auth-brand-title">My App</div>
        <div className="auth-brand-subtitle">
          Hệ thống quản lý thông minh, giúp bạn tối ưu hiệu suất công việc mỗi ngày.
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
