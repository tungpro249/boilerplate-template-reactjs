import { DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { forwardRef } from "react";
import "./styles.css";

type CustomDatePickerSize = "sm" | "md" | "lg";

interface CustomDatePickerProps extends Omit<DatePickerProps, "size"> {
  /** Kích thước */
  size?: CustomDatePickerSize;
  /** Label hiển thị phía trên */
  label?: string;
  /** Bo tròn hoàn toàn */
  rounded?: boolean;
  /** Full width (mặc định true) */
  block?: boolean;
}

const sizeMap = { sm: "small" as const, md: "middle" as const, lg: "large" as const };

const CustomDatePicker = forwardRef<any, CustomDatePickerProps>(
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
      "custom-datepicker",
      `custom-datepicker-${size}`,
      rounded && "custom-datepicker-rounded",
      block && "custom-datepicker-block",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`custom-datepicker-wrapper ${block ? "custom-datepicker-wrapper-block" : ""}`}>
        {label && <label className="custom-datepicker-label">{label}</label>}
        <DatePicker ref={ref} size={sizeMap[size]} className={cls} {...rest} />
      </div>
    );
  },
);

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
