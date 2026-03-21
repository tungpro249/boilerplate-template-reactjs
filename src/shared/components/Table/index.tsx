import { Table, Input, Button, Space, Empty } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useState, type ReactNode } from "react";
import "./styles.css";

interface CustomTableProps<T> extends Omit<TableProps<T>, "title"> {
  /** Tiêu đề bảng */
  title?: string;
  /** Nút hành động bên phải header (VD: nút Thêm mới) */
  headerActions?: ReactNode;
  /** Hiện thanh tìm kiếm */
  searchable?: boolean;
  /** Placeholder search */
  searchPlaceholder?: string;
  /** Callback khi search */
  onSearch?: (value: string) => void;
  /** Callback khi nhấn Refresh */
  onRefresh?: () => void;
  /** Hiện nút Refresh */
  showRefresh?: boolean;
  /** Kẻ sọc xen kẽ */
  striped?: boolean;
  /** Border giữa các row */
  bordered?: boolean;
  /** Size compact */
  compact?: boolean;
}

export default function CustomTable<T extends object>({
  title,
  headerActions,
  searchable = false,
  searchPlaceholder = "Tìm kiếm...",
  onSearch,
  onRefresh,
  showRefresh = false,
  striped = false,
  bordered = false,
  compact = false,
  dataSource,
  pagination,
  ...rest
}: CustomTableProps<T>) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
    onSearch?.(value);
  };

  const showHeader = title || headerActions || searchable || showRefresh;

  const wrapperClass = [
    "custom-table-wrapper",
    striped && "custom-table-striped",
    bordered && "custom-table-bordered",
    compact && "custom-table-compact",
  ]
    .filter(Boolean)
    .join(" ");

  const totalItems =
    typeof pagination === "object" && pagination.total
      ? pagination.total
      : Array.isArray(dataSource)
        ? dataSource.length
        : 0;

  return (
    <div className={wrapperClass}>
      {showHeader && (
        <div className="custom-table-header">
          <div className="custom-table-header-left">
            {title && <h3 className="custom-table-title">{title}</h3>}
            {totalItems > 0 && (
              <span className="custom-table-count">{totalItems} bản ghi</span>
            )}
          </div>

          <div className="custom-table-header-right">
            {searchable && (
              <Input.Search
                placeholder={searchPlaceholder}
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                style={{ width: 240 }}
              />
            )}
            {showRefresh && (
              <Button icon={<ReloadOutlined />} onClick={onRefresh} />
            )}
            {headerActions && <Space>{headerActions}</Space>}
          </div>
        </div>
      )}

      <Table<T>
        dataSource={dataSource}
        pagination={
          pagination === false
            ? false
            : {
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} / ${total} bản ghi`,
                pageSizeOptions: ["10", "20", "50", "100"],
                ...(typeof pagination === "object" ? pagination : {}),
              }
        }
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Không có dữ liệu"
            />
          ),
        }}
        {...rest}
      />
    </div>
  );
}
