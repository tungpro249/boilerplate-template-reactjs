import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// ─── Config ──────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 15_000;

// ─── Create Instance ─────────────────────────────────────
const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ────────────────────────────────
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Tự động gắn token nếu có
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ───────────────────────────────
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // Trả về data trực tiếp (bỏ wrapper Axios)
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          // Token hết hạn → xoá token, redirect login
          localStorage.removeItem("access_token");
          // window.location.href = "/login";
          console.error("Unauthorized – phiên đăng nhập hết hạn.");
          break;

        case 403:
          console.error("Forbidden – bạn không có quyền truy cập.");
          break;

        case 404:
          console.error("Not Found – tài nguyên không tồn tại.");
          break;

        case 500:
          console.error("Server Error – lỗi máy chủ nội bộ.");
          break;

        default:
          console.error(`HTTP Error ${status}`);
      }
    } else if (error.request) {
      console.error("Network Error – không kết nối được tới server.");
    }

    return Promise.reject(error);
  }
);

export default http;
