import { Modal } from "antd";
import type { ModalProps } from "antd";
import "./styles.css";

type CustomModalSize = "sm" | "md" | "lg" | "xl";

interface CustomModalProps extends Omit<ModalProps, "width"> {
  /** Kích thước */
  size?: CustomModalSize;
  /** Không có padding nội dung */
  noPadding?: boolean;
}

const widthMap = { sm: 400, md: 520, lg: 720, xl: 960 };

export default function CustomModal({
  size = "md",
  noPadding = false,
  className = "",
  children,
  ...rest
}: CustomModalProps) {
  const cls = [
    "custom-modal",
    `custom-modal-${size}`,
    noPadding && "custom-modal-no-padding",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Modal
      width={widthMap[size]}
      className={cls}
      centered
      {...rest}
    >
      {children}
    </Modal>
  );
}
