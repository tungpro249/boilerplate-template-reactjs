import { Tag } from "antd";
import { ShoppingCartOutlined, HeartOutlined, EyeOutlined, StarFilled } from "@ant-design/icons";
import "./ProductCard.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: "new" | "sale" | "hot";
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const formatPrice = (price: number) =>
    price.toLocaleString("vi-VN") + "₫";

  const badgeColors: Record<string, { color: string; bg: string }> = {
    new: { color: "#1677ff", bg: "#e6f4ff" },
    sale: { color: "#ff4d4f", bg: "#fff1f0" },
    hot: { color: "#fa8c16", bg: "#fff7e6" },
  };

  const badgeLabels: Record<string, string> = {
    new: "Mới",
    sale: "Giảm giá",
    hot: "Hot",
  };

  return (
    <div className="product-card">
      {/* Image */}
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />

        {product.badge && (
          <span
            className="product-card-badge"
            style={{
              color: badgeColors[product.badge].color,
              background: badgeColors[product.badge].bg,
            }}
          >
            {badgeLabels[product.badge]}
          </span>
        )}

        {discount > 0 && (
          <span className="product-card-discount">-{discount}%</span>
        )}

        {/* Overlay actions */}
        <div className="product-card-actions">
          <button className="product-card-action-btn" aria-label="Yêu thích">
            <HeartOutlined />
          </button>
          <button className="product-card-action-btn" aria-label="Xem nhanh">
            <EyeOutlined />
          </button>
          <button className="product-card-action-btn product-card-action-cart" aria-label="Thêm giỏ hàng">
            <ShoppingCartOutlined />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card-body">
        <Tag className="product-card-category">{product.category}</Tag>

        <h3 className="product-card-name">{product.name}</h3>

        {/* Rating */}
        <div className="product-card-rating">
          <div className="product-card-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarFilled
                key={star}
                style={{
                  color: star <= product.rating ? "#fadb14" : "#e8e8e8",
                  fontSize: 12,
                }}
              />
            ))}
          </div>
          <span className="product-card-reviews">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="product-card-price-row">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="product-card-original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.inStock === false && (
          <span className="product-card-out-of-stock">Hết hàng</span>
        )}
      </div>
    </div>
  );
}
