import http from "./http";
import type { AxiosRequestConfig } from "axios";

/**
 * Helper functions bọc các HTTP method phổ biến.
 * Trả về `response.data` trực tiếp.
 *
 * @example
 * // GET /users?page=1
 * const users = await api.get<User[]>("/users", { params: { page: 1 } });
 *
 * // POST /users
 * const newUser = await api.post<User>("/users", { name: "Tùng" });
 */
const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    http.get<T>(url, config).then((res) => res.data),

  post: <T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => http.post<T>(url, data, config).then((res) => res.data),

  put: <T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => http.put<T>(url, data, config).then((res) => res.data),

  patch: <T = any>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => http.patch<T>(url, data, config).then((res) => res.data),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    http.delete<T>(url, config).then((res) => res.data),
};

export default api;
