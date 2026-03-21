import { Select } from "antd";
import type { SelectProps, RefSelectProps } from "antd";
import { forwardRef } from "react";
import "./styles.css";

type CustomSelectSize = "sm" | "md" | "lg";

interface CustomSelectProps extends Omit<SelectProps, "size"> {
  /** Kích thước */
  size?: CustomSelectSize;
  /** Label hiển thị phía trên */
  label?: string;
  /** Bo tròn hoàn toàn */
  rounded?: boolean;
  /** Full width (mặc định true) */
  block?: boolean;
}

const sizeMap = { sm: "small" as const, md: "middle" as const, lg: "large" as const };

const CustomSelect = forwardRef<RefSelectProps, CustomSelectProps>(
  (
    {
      size = "md",
      label,
      rounded = false,
      block = true,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const cls = [
      "custom-select",
      `custom-select-${size}`,
      rounded && "custom-select-rounded",
      block && "custom-select-block",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`custom-select-wrapper ${block ? "custom-select-wrapper-block" : ""}`}>
        {label && <label className="custom-select-label">{label}</label>}
        <Select
          ref={ref}
          size={sizeMap[size]}
          className={cls}
          {...rest}
        />
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
