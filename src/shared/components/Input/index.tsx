import { Input } from "antd";
import type { InputProps, InputRef } from "antd";
import { forwardRef } from "react";
import "./styles.css";

type CustomInputSize = "sm" | "md" | "lg";

interface CustomInputProps extends Omit<InputProps, "size"> {
  /** Kích thước */
  size?: CustomInputSize;
  /** Label hiển thị phía trên */
  label?: string;
  /** Bo tròn hoàn toàn */
  rounded?: boolean;
  /** Full width (mặc định true) */
  block?: boolean;
}

const sizeMap = { sm: "small" as const, md: "middle" as const, lg: "large" as const };

const CustomInput = forwardRef<InputRef, CustomInputProps>(
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
      "custom-input",
      `custom-input-${size}`,
      rounded && "custom-input-rounded",
      block && "custom-input-block",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`custom-input-wrapper ${block ? "custom-input-wrapper-block" : ""}`}>
        {label && <label className="custom-input-label">{label}</label>}
        <Input ref={ref} size={sizeMap[size]} className={cls} {...rest} />
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
