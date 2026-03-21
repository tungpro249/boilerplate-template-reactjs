import { Button } from "antd";
import type { ButtonProps } from "antd";
import { forwardRef } from "react";
import "./styles.css";

type ButtonVariant = "solid" | "outline" | "ghost" | "dashed";
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "primary" | "danger" | "success" | "warning";

interface CustomButtonProps extends Omit<ButtonProps, "size" | "type" | "color" | "variant"> {
  /** Kiểu hiển thị */
  variant?: ButtonVariant;
  /** Kích thước */
  size?: ButtonSize;
  /** Màu sắc */
  color?: ButtonColor;
  /** Bo tròn hoàn toàn (pill) */
  rounded?: boolean;
  /** Full width */
  block?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      color = "primary",
      rounded = false,
      block = false,
      loading,
      disabled,
      icon,
      children,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const isIconOnly = icon && !children;

    const cls = [
      "custom-btn",
      `custom-btn-${variant}`,
      `custom-btn-${size}`,
      color !== "primary" && `custom-btn-${color}`,
      rounded && "custom-btn-rounded",
      block && "custom-btn-block",
      loading && "custom-btn-loading",
      isIconOnly && "custom-btn-icon-only",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Button
        ref={ref}
        className={cls}
        loading={loading}
        disabled={disabled}
        icon={icon}
        {...rest}
      >
        {children}
      </Button>
    );
  },
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
