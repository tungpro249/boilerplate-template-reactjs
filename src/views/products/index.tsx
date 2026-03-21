import { useState, useMemo } from "react";
import { Row, Col, Pagination, Empty } from "antd";
import ProductCard from "./components/ProductCard";
import ProductFilter from "./components/ProductFilter";
import type { Product } from "./components/ProductCard";
import "./styles.css";

// ── Mock data ──────────────────────────────────────────

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Tai nghe Bluetooth Sony WH-1000XM5",
    price: 6990000,
    originalPrice: 8490000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Điện tử",
    rating: 5,
    reviews: 324,
    badge: "hot",
    inStock: true,
  },
  {
    id: 2,
    name: "Áo khoác Bomber nam phong cách Hàn Quốc",
    price: 450000,
    originalPrice: 650000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
    category: "Thời trang",
    rating: 4,
    reviews: 156,
    badge: "sale",
    inStock: true,
  },
  {
    id: 3,
    name: "Nồi chiên không dầu Philips 6.2L",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=400&fit=crop",
    category: "Gia dụng",
    rating: 4,
    reviews: 89,
    badge: "new",
    inStock: true,
  },
  {
    id: 4,
    name: "Giày thể thao Nike Air Max 270",
    price: 2890000,
    originalPrice: 3490000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Thể thao",
    rating: 5,
    reviews: 512,
    badge: "hot",
    inStock: true,
  },
  {
    id: 5,
    name: "Bàn phím cơ Keychron K8 Pro",
    price: 2490000,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop",
    category: "Phụ kiện",
    rating: 5,
    reviews: 203,
    inStock: true,
  },
  {
    id: 6,
    name: "Đồng hồ thông minh Apple Watch Series 9",
    price: 9990000,
    originalPrice: 11990000,
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop",
    category: "Điện tử",
    rating: 5,
    reviews: 678,
    badge: "sale",
    inStock: true,
  },
  {
    id: 7,
    name: "Ba lô laptop chống nước Xiaomi 26L",
    price: 590000,
    originalPrice: 790000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Phụ kiện",
    rating: 4,
    reviews: 142,
    inStock: true,
  },
  {
    id: 8,
    name: "Áo polo nam Uniqlo Dry-EX",
    price: 390000,
    image: "https://images.unsplash.com/photo-1625910513413-5fc42f006332?w=400&h=400&fit=crop",
    category: "Thời trang",
    rating: 4,
    reviews: 97,
    badge: "new",
    inStock: true,
  },
  {
    id: 9,
    name: "Máy hút bụi cầm tay Dyson V12",
    price: 12500000,
    originalPrice: 14900000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop",
    category: "Gia dụng",
    rating: 5,
    reviews: 234,
    badge: "sale",
    inStock: false,
  },
  {
    id: 10,
    name: "Bình giữ nhiệt Stanley 1.0L",
    price: 850000,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Gia dụng",
    rating: 4,
    reviews: 67,
    inStock: true,
  },
  {
    id: 11,
    name: "Quần jogger thể thao Adidas Essentials",
    price: 890000,
    originalPrice: 1190000,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=400&fit=crop",
    category: "Thể thao",
    rating: 4,
    reviews: 178,
    inStock: true,
  },
  {
    id: 12,
    name: "Loa Bluetooth JBL Charge 5",
    price: 3190000,
    originalPrice: 3790000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Điện tử",
    rating: 4,
    reviews: 445,
    badge: "hot",
    inStock: true,
  },
];

const PAGE_SIZE = 8;

// ── Component ──────────────────────────────────────────

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter + Sort
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.category.toLowerCase().includes(keyword),
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default: // newest
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [search, category, sort]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  return (
    <div className="products-page">
      {/* Page header */}
      <div className="products-page-header">
        <h1 className="products-page-title">Sản phẩm</h1>
        <p className="products-page-desc">Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi</p>
      </div>

      {/* Filter bar */}
      <ProductFilter
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        total={filteredProducts.length}
      />

      {/* Product grid */}
      {paginatedProducts.length > 0 ? (
        <>
          <Row gutter={[16, 16]}>
            {paginatedProducts.map((product) => (
              <Col
                key={product.id}
                xs={viewMode === "grid" ? 12 : 24}
                sm={viewMode === "grid" ? 12 : 24}
                md={viewMode === "grid" ? 8 : 24}
                lg={viewMode === "grid" ? 6 : 12}
              >
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {filteredProducts.length > PAGE_SIZE && (
            <div className="products-pagination">
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={filteredProducts.length}
                onChange={setCurrentPage}
                showSizeChanger={false}
                showTotal={(total) => `Tổng ${total} sản phẩm`}
              />
            </div>
          )}
        </>
      ) : (
        <div className="products-empty">
          <Empty description="Không tìm thấy sản phẩm phù hợp" />
        </div>
      )}
    </div>
  );
}
