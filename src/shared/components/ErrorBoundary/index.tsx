import { Component, type ErrorInfo, type ReactNode } from "react";
import { Result, Button, Typography } from "antd";

const { Paragraph, Text } = Typography;

interface ErrorBoundaryProps {
  /** Custom fallback UI khi có lỗi */
  fallback?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Allow custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            background: "#f5f5f5",
          }}
        >
          <Result
            status="error"
            title="Đã xảy ra lỗi"
            subTitle="Ứng dụng gặp sự cố không mong muốn. Vui lòng thử lại."
            extra={[
              <Button type="primary" key="retry" onClick={this.handleReset}>
                Thử lại
              </Button>,
              <Button key="reload" onClick={this.handleReload}>
                Tải lại trang
              </Button>,
            ]}
          >
            {import.meta.env.DEV && this.state.error && (
              <div style={{ textAlign: "left" }}>
                <Paragraph>
                  <Text strong style={{ fontSize: 16, color: "#cf1322" }}>
                    {this.state.error.toString()}
                  </Text>
                </Paragraph>
                {this.state.errorInfo && (
                  <Paragraph>
                    <pre
                      style={{
                        fontSize: 12,
                        maxHeight: 300,
                        overflow: "auto",
                        background: "#fff",
                        padding: 12,
                        borderRadius: 6,
                        border: "1px solid #d9d9d9",
                      }}
                    >
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </Paragraph>
                )}
              </div>
            )}
          </Result>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
