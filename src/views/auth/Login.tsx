import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // TODO: Gọi API login thực tế ở đây
    console.warn("Login values:", values);
    message.success("Đăng nhập thành công!");
    navigate("/");
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Đăng nhập</h2>
        <p>Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.</p>
      </div>

      <Form
        name="login"
        className="auth-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <a href="#" style={{ color: "#667eea", fontWeight: 500 }}>
              Quên mật khẩu?
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <div className="auth-form-footer">
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
      </div>
    </>
  );
}
