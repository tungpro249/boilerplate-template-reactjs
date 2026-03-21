import { Card } from "antd";
import type { CardProps } from "antd";
import { forwardRef } from "react";
import "./styles.css";

type CustomCardVariant = "default" | "bordered" | "shadow" | "flat";

interface CustomCardProps extends Omit<CardProps, "variant"> {
  /** Kiểu hiển thị */
  variant?: CustomCardVariant;
  /** Có hiệu ứng hover nổi lên không */
  hoverable?: boolean;
  /** Padding tùy chỉnh */
  padding?: "none" | "sm" | "md" | "lg";
}

const CustomCard = forwardRef<HTMLDivElement, CustomCardProps>(
  (
    {
      variant = "default",
      hoverable = false,
      padding,
      className = "",
      children,
      ...rest
    },
    ref,
  ) => {
    const cls = [
      "custom-card",
      `custom-card-${variant}`,
      hoverable && "custom-card-hoverable",
      padding && `custom-card-padding-${padding}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Card ref={ref} className={cls} bordered={variant === "bordered"} {...rest}>
        {children}
      </Card>
    );
  },
);

CustomCard.displayName = "CustomCard";

export default CustomCard;
