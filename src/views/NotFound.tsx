import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          fontWeight: 800,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        404
      </div>

      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          color: "#1a1a2e",
          marginBottom: "0.75rem",
        }}
      >
        Trang không tồn tại
      </h2>

      <p
        style={{
          fontSize: "1rem",
          color: "#6b7280",
          maxWidth: "400px",
          marginBottom: "2rem",
          lineHeight: 1.6,
        }}
      >
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#fff",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 6px 20px rgba(102, 126, 234, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 15px rgba(102, 126, 234, 0.4)";
        }}
      >
        ← Quay về trang chủ
      </button>
    </div>
  );
};

export default NotFound;
