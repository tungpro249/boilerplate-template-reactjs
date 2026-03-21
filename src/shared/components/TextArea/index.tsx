import { Input } from "antd";
import type { TextAreaProps, TextAreaRef } from "antd/es/input/TextArea";
import { forwardRef } from "react";
import "./styles.css";

type CustomTextAreaSize = "sm" | "md" | "lg";

interface CustomTextAreaProps extends Omit<TextAreaProps, "size"> {
  /** Kích thước */
  size?: CustomTextAreaSize;
  /** Label hiển thị phía trên */
  label?: string;
  /** Full width (mặc định true) */
  block?: boolean;
}

const CustomTextArea = forwardRef<TextAreaRef, CustomTextAreaProps>(
  (
    {
      size = "md",
      label,
      block = true,
      rows = 4,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const cls = [
      "custom-textarea",
      `custom-textarea-${size}`,
      block && "custom-textarea-block",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`custom-textarea-wrapper ${block ? "custom-textarea-wrapper-block" : ""}`}>
        {label && <label className="custom-textarea-label">{label}</label>}
        <Input.TextArea ref={ref} rows={rows} className={cls} {...rest} />
      </div>
    );
  },
);

CustomTextArea.displayName = "CustomTextArea";

export default CustomTextArea;
