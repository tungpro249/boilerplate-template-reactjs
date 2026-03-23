# 🚀 React Admin Boilerplate

Boilerplate dành cho các dự án **Admin Dashboard** sử dụng React 19 + TypeScript + Vite, tích hợp sẵn Ant Design 6, hệ thống theme Dark/Light mode, layout Sidebar/Header, routing, HTTP client, và bộ shared components có thể tái sử dụng.

---

## 📸 Giao diện tổng quan

### Layout chính (`MainLayout`)

```
┌──────────────────────────────────────────────────┐
│  Sidebar (collapsible)  │       Header           │
│  ┌──────────────────┐   │  ┌──────────────────┐  │
│  │ 🚀 My App        │   │  │ 🔍 Search        │  │
│  │ ☰ Toggle         │   │  │ 🌙/☀ Dark Mode   │  │
│  ├──────────────────┤   │  │ 🔔 Notifications │  │
│  │ Dashboard        │   │  │ 👤 User Dropdown  │  │
│  │ Bảng             │   │  └──────────────────┘  │
│  │ ▸ Quản lý        │   ├───────────────────────┤
│  │   └ Người dùng   │   │                       │
│  │   └ Sản phẩm     │   │    📍 Breadcrumb      │
│  │ Components       │   │    ─────────────────   │
│  │ Cài đặt          │   │                       │
│  └──────────────────┘   │    Main Content Area   │
│                         │    (React Router       │
│                         │     Outlet)            │
│                         │                       │
└──────────────────────────────────────────────────┘
```

### Layout xác thực (`AuthLayout`)

```
┌──────────────────────────────────────────────┐
│  Brand Panel          │    Form Panel        │
│  ┌──────────────────┐ │ ┌──────────────────┐ │
│  │     🚀            │ │ │                  │ │
│  │   My App          │ │ │  Login / Register│ │
│  │   Hệ thống quản  │ │ │   Form Content   │ │
│  │   lý thông minh   │ │ │                  │ │
│  └──────────────────┘ │ └──────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## ✨ Chức năng chính

### 🎨 Hệ thống Theme
- **Dark / Light mode** — chuyển đổi bằng nút bấm trên Header, trạng thái lưu vào `localStorage` và tự động phát hiện `prefers-color-scheme` của hệ thống.
- **Ant Design ConfigProvider** — token màu sắc, font size, border radius được cấu hình tập trung trong `themeConfig.ts`.
- **Design tokens** — bộ biến `colors`, `fontSizes`, `spacing`, `borderRadius` để thống nhất toàn bộ UI.

### 📐 Layout
| Layout | Mô tả |
|---|---|
| **MainLayout** | Sidebar + Header + Breadcrumb + Content area. Dùng cho các trang chính sau khi đăng nhập. |
| **AuthLayout** | Split-screen: brand panel (bên trái) + form panel (bên phải). Dùng cho Login/Register. |

### 🧭 Sidebar
- Thu gọn / mở rộng (collapsible) với animation mượt.
- Hỗ trợ cả chế độ **controlled** & **uncontrolled**.
- Props linh hoạt: `header`, `footer`, `theme`, `width`, `collapsedWidth`, `selectedKeys`, `defaultOpenKeys`…
- Menu hỗ trợ **nested sub-menu** (ví dụ: Quản lý → Người dùng, Sản phẩm).

### 🔝 Header
- **Ô tìm kiếm** với Ant Design Input.
- **Nút Dark Mode** — toggle giữa 🌙 và ☀️.
- **Badge thông báo** — hiển thị số lượng notification chưa đọc.
- **User dropdown** — Avatar + tên + role, menu: Tài khoản, Cài đặt, Đăng xuất.

### 🗺️ Routing
| Route | Trang | Breadcrumb |
|---|---|---|
| `/` hoặc `/dashboard` | Dashboard | Dashboard |
| `/table` | Data Table | Bảng |
| `/users` | Quản lý người dùng | Người dùng |
| `/products` | Quản lý sản phẩm | Sản phẩm |
| `/settings` | Cài đặt | Cài đặt |
| `/components` | Component Showcase | Components |
| `/login` | Đăng nhập | — |
| `/register` | Đăng ký | — |
| `*` | 404 Not Found | — |

### 📊 Dashboard
- **4 Stat Cards** — Doanh thu, Đơn hàng, Khách hàng, Tăng trưởng (có icon, trend ↑↓).
- **Revenue Line Chart** — biểu đồ doanh thu & đơn hàng theo tháng (Recharts).
- **Category Pie Chart** — biểu đồ tròn phân loại doanh thu.
- **Report Table** — bảng đơn hàng gần đây với trạng thái màu sắc.
- Layout responsive: 4 cột trên desktop → 2 cột trên tablet → 1 cột trên mobile.

### 🧩 Shared Components
Các component đã được đóng gói sẵn, tái sử dụng across toàn bộ project:

| Component | Mô tả |
|---|---|
| **Button** | Custom button wrap Ant Design, hỗ trợ thêm variant/color. |
| **Input** | Custom input field. |
| **TextArea** | Custom textarea. |
| **Select** | Custom select dropdown. |
| **DatePicker** | Custom date picker. |
| **Modal** | Custom modal dialog. |
| **Table** | Custom data table với dark mode styling. |
| **Card** | Custom card container. |
| **Breadcrumb** | Auto-generated breadcrumb dựa trên route `handle`. |
| **ErrorBoundary** | Bắt lỗi runtime, hiển thị fallback UI thay vì crash app. |

### 🌐 HTTP Client (Axios)
- Instance Axios đã cấu hình sẵn `baseURL`, `timeout` từ biến môi trường.
- **Request interceptor** — tự động gắn `Bearer token` từ `localStorage`.
- **Response interceptor** — xử lý lỗi 401 (hết phiên), 403, 404, 500 và lỗi mạng.

### 🔐 Xác thực
- Trang **Login** và **Register** với layout split-screen đẹp mắt.
- Layout riêng biệt (`AuthLayout`) không có Sidebar/Header.

---

## 🛠️ Tech Stack

| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| **React** | 19 | UI Library |
| **TypeScript** | — | Type Safety |
| **Vite** | 7 | Build Tool & Dev Server |
| **Ant Design** | 6 | UI Component Library |
| **React Router** | 7 | Client-side Routing |
| **Axios** | 1.x | HTTP Client |
| **Recharts** | 3 | Biểu đồ (Chart) |
| **TailwindCSS** | 4 | Utility CSS |
| **Prettier** | 3 | Code Formatter |
| **ESLint** | 9 | Linting |

---

## 📁 Cấu trúc thư mục

```
src/
├── assets/                  # Tài nguyên tĩnh (ảnh, icon…)
├── layouts/                 # Các layout wrapper
│   ├── AuthLayout/          # Layout cho Login/Register
│   ├── MainLayout/          # Layout chính (Sidebar + Header)
│   ├── Header/              # Header component
│   └── Sidebar/             # Sidebar component (collapsible)
├── routes/
│   ├── index.tsx            # Định nghĩa routes (createBrowserRouter)
│   └── menuItems.tsx        # Cấu hình menu items cho Sidebar
├── shared/
│   ├── components/          # Shared UI components
│   │   ├── Breadcrumb/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── DatePicker/
│   │   ├── ErrorBoundary/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Select/
│   │   ├── Table/
│   │   └── TextArea/
│   ├── constants/           # Hằng số dùng chung
│   ├── hooks/               # Custom hooks (useDarkMode…)
│   ├── services/            # HTTP client (Axios instance)
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── themes/
│   ├── index.tsx            # ThemeProvider (Dark mode + Ant ConfigProvider)
│   └── themeConfig.ts       # Design tokens (colors, spacing, fonts…)
├── views/                   # Các trang / features
│   ├── auth/                # Login, Register
│   ├── components/          # Component Showcase
│   ├── dashboard/           # Dashboard + StatCard, Charts, ReportTable
│   ├── products/            # Quản lý sản phẩm
│   ├── settings/            # Cài đặt
│   ├── table/               # Data Table demo
│   ├── users/               # Quản lý người dùng
│   └── NotFound.tsx         # Trang 404
├── App.tsx                  # Root component
├── main.tsx                 # Entry point
└── index.css                # Global styles
```

---

## 🚀 Bắt đầu

### Yêu cầu
- **Node.js** >= 18
- **npm** >= 9

### Cài đặt

```bash
# Clone repo
git clone <repo-url>
cd my-react-app

# Cài dependencies
npm install

# Tạo file .env từ example
cp .env.example .env
```

### Biến môi trường (`.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=My React App
VITE_API_TIMEOUT=15000
```

### Chạy Development

```bash
npm run dev
```

Truy cập: [http://localhost:5173](http://localhost:5173)

### Build Production

```bash
npm run build
npm run preview
```

### Các lệnh khác

```bash
npm run lint        # Kiểm tra lỗi ESLint
npm run lint:fix    # Tự động fix lỗi ESLint
npm run format      # Format code với Prettier
```

---

## 📝 License

MIT
