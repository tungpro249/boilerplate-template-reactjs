import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // TODO: Gọi API register thực tế ở đây
    console.warn("Register values:", values);
    message.success("Đăng ký thành công!");
    navigate("/login");
  };

  return (
    <>
      <div className="auth-form-header">
        <h2>Đăng ký</h2>
        <p>Tạo tài khoản mới để bắt đầu sử dụng hệ thống.</p>
      </div>

      <Form
        name="register"
        className="auth-form"
        onFinish={onFinish}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="fullName"
          rules={[
            { required: true, message: "Vui lòng nhập họ tên!" },
            { min: 2, message: "Họ tên ít nhất 2 ký tự!" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Họ và tên"
            autoComplete="name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
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
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Xác nhận mật khẩu"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <div className="auth-form-footer">
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </div>
    </>
  );
}
