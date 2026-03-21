import { Row, Col } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  BarsOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import CustomInput from "../../../shared/components/Input";
import CustomSelect from "../../../shared/components/Select";
import "./ProductFilter.css";

interface ProductFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  total: number;
}

const categoryOptions = [
  { value: "all", label: "Tất cả danh mục" },
  { value: "Điện tử", label: "Điện tử" },
  { value: "Thời trang", label: "Thời trang" },
  { value: "Gia dụng", label: "Gia dụng" },
  { value: "Phụ kiện", label: "Phụ kiện" },
  { value: "Thể thao", label: "Thể thao" },
];

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "price-asc", label: "Giá: Thấp → Cao" },
  { value: "price-desc", label: "Giá: Cao → Thấp" },
  { value: "rating", label: "Đánh giá cao nhất" },
  { value: "popular", label: "Phổ biến nhất" },
];

export default function ProductFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  total,
}: ProductFilterProps) {
  return (
    <div className="product-filter">
      <Row gutter={[12, 12]} align="middle">
        {/* Search */}
        <Col xs={24} sm={12} md={8}>
          <CustomInput
            size="md"
            placeholder="Tìm kiếm sản phẩm..."
            prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            allowClear
            rounded
          />
        </Col>

        {/* Category filter */}
        <Col xs={12} sm={6} md={4}>
          <CustomSelect
            size="md"
            value={category}
            onChange={onCategoryChange}
            options={categoryOptions}
          />
        </Col>

        {/* Sort */}
        <Col xs={12} sm={6} md={4}>
          <CustomSelect
            size="md"
            value={sort}
            onChange={onSortChange}
            options={sortOptions}
            suffixIcon={<SortAscendingOutlined />}
          />
        </Col>

        {/* Right: count + view toggle */}
        <Col flex="auto">
          <div className="product-filter-right">
            <span className="product-filter-count">{total} sản phẩm</span>
            <div className="product-filter-view-toggle">
              <button
                className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => onViewModeChange("grid")}
                aria-label="Grid view"
              >
                <AppstoreOutlined />
              </button>
              <button
                className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => onViewModeChange("list")}
                aria-label="List view"
              >
                <BarsOutlined />
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
