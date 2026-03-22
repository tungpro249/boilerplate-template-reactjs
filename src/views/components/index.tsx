import { useState } from "react";
import { Row, Col, Space, Divider, Typography, Tag } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  DownloadOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";

import CustomButton from "../../shared/components/Button";
import CustomCard from "../../shared/components/Card";
import CustomInput from "../../shared/components/Input";
import CustomTextArea from "../../shared/components/TextArea";
import CustomSelect from "../../shared/components/Select";
import CustomDatePicker from "../../shared/components/DatePicker";
import CustomModal from "../../shared/components/Modal";
import CustomTable from "../../shared/components/Table";

import "./styles.css";

const { Title, Text } = Typography;

/* ── Anchor danh sách sections ── */
const sections = [
  { id: "button", label: "Button" },
  { id: "card", label: "Card" },
  { id: "input", label: "Input" },
  { id: "textarea", label: "TextArea" },
  { id: "select", label: "Select" },
  { id: "datepicker", label: "DatePicker" },
  { id: "modal", label: "Modal" },
  { id: "table", label: "Table" },
];

/* ── Mock data cho Table ── */
const tableColumns = [
  { title: "Mã", dataIndex: "id", key: "id" },
  { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
  { title: "Giá", dataIndex: "price", key: "price", render: (v: number) => `${v.toLocaleString()}đ` },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (s: string) => (
      <Tag color={s === "active" ? "green" : s === "draft" ? "orange" : "red"}>{s}</Tag>
    ),
  },
];

const tableData = [
  { key: "1", id: "SP001", name: "Laptop Gaming", price: 25000000, status: "active" },
  { key: "2", id: "SP002", name: "Tai nghe Bluetooth", price: 1200000, status: "active" },
  { key: "3", id: "SP003", name: "Bàn phím cơ", price: 2500000, status: "draft" },
  { key: "4", id: "SP004", name: "Chuột không dây", price: 800000, status: "inactive" },
  { key: "5", id: "SP005", name: "Màn hình 27 inch", price: 8500000, status: "active" },
];

const selectOptions = [
  { label: "Hà Nội", value: "hn" },
  { label: "TP. Hồ Chí Minh", value: "hcm" },
  { label: "Đà Nẵng", value: "dn" },
  { label: "Huế", value: "hue" },
  { label: "Cần Thơ", value: "ct" },
];

/* ═══════════════════════════════════════════════════ */

type ModalSize = "sm" | "md" | "lg" | "xl";

export default function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<ModalSize>("md");

  const openModal = (size: ModalSize) => {
    setModalSize(size);
    setModalOpen(true);
  };

  return (
    <div className="showcase-page">
      {/* Header */}
      <div className="showcase-header">
        <Title level={2} style={{ margin: 0 }}>
          🧩 Component Showcase
        </Title>
        <Text type="secondary">
          Tổng hợp tất cả shared components trong dự án — tra cứu nhanh props, variants và cách sử dụng.
        </Text>
      </div>

      {/* Navigation */}
      <nav className="showcase-nav">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.label}
          </a>
        ))}
      </nav>

      {/* ════════════ BUTTON ════════════ */}
      <section id="button" className="showcase-section">
        <div className="showcase-section-title">Button</div>
        <p className="showcase-section-desc">
          Custom Button hỗ trợ variant, color, size, rounded, block, loading, icon.
        </p>

        <CustomCard variant="shadow" padding="lg">
          {/* Variants × Colors */}
          <div className="showcase-sub">
            <div className="showcase-sub-label">Variants × Colors</div>
            <Row gutter={[16, 16]}>
              {(["solid", "outline", "ghost", "dashed"] as const).map((variant) => (
                <Col key={variant} xs={24} sm={12} lg={6}>
                  <Text strong style={{ display: "block", marginBottom: 8 }}>
                    <span className="showcase-tag">{variant}</span>
                  </Text>
                  <Space wrap>
                    <CustomButton variant={variant} color="primary">Primary</CustomButton>
                    <CustomButton variant={variant} color="danger">Danger</CustomButton>
                    <CustomButton variant={variant} color="success">Success</CustomButton>
                    <CustomButton variant={variant} color="warning">Warning</CustomButton>
                  </Space>
                </Col>
              ))}
            </Row>
          </div>

          <Divider />

          {/* Sizes */}
          <div className="showcase-sub">
            <div className="showcase-sub-label">Sizes</div>
            <div className="showcase-row showcase-row-center">
              <CustomButton size="sm">Small</CustomButton>
              <CustomButton size="md">Medium</CustomButton>
              <CustomButton size="lg">Large</CustomButton>
            </div>
          </div>

          <Divider />

          {/* Special */}
          <div className="showcase-sub">
            <div className="showcase-sub-label">Special</div>
            <div className="showcase-row showcase-row-center">
              <CustomButton rounded>Rounded</CustomButton>
              <CustomButton loading>Loading</CustomButton>
              <CustomButton disabled>Disabled</CustomButton>
              <CustomButton icon={<PlusOutlined />}>Có Icon</CustomButton>
              <CustomButton icon={<SearchOutlined />} />
              <CustomButton icon={<HeartOutlined />} color="danger" variant="outline" rounded />
              <CustomButton icon={<StarOutlined />} color="warning" variant="ghost" />
            </div>
          </div>

          <Divider />

          {/* Block */}
          <div className="showcase-sub">
            <div className="showcase-sub-label">Block (Full Width)</div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <CustomButton block>Block Primary</CustomButton>
              <CustomButton block variant="outline" color="danger">Block Outline Danger</CustomButton>
            </Space>
          </div>
        </CustomCard>
      </section>

      {/* ════════════ CARD ════════════ */}
      <section id="card" className="showcase-section">
        <div className="showcase-section-title">Card</div>
        <p className="showcase-section-desc">
          Custom Card hỗ trợ variant (default, bordered, shadow, flat), hoverable, padding.
        </p>

        <div className="showcase-grid-2">
          {(["default", "bordered", "shadow", "flat"] as const).map((variant) => (
            <CustomCard key={variant} variant={variant} title={`Variant: ${variant}`} hoverable>
              <Text>
                Đây là card với variant <span className="showcase-tag">{variant}</span>. Hover lên để xem hiệu ứng.
              </Text>
            </CustomCard>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="showcase-sub-label">Padding Options</div>
          <div className="showcase-grid-4">
            {(["none", "sm", "md", "lg"] as const).map((p) => (
              <CustomCard key={p} variant="bordered" padding={p}>
                <Text>padding = <span className="showcase-tag">{p}</span></Text>
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ INPUT ════════════ */}
      <section id="input" className="showcase-section">
        <div className="showcase-section-title">Input</div>
        <p className="showcase-section-desc">
          Custom Input hỗ trợ size, label, rounded, block, prefix/suffix.
        </p>

        <CustomCard variant="shadow" padding="lg">
          <div className="showcase-sub">
            <div className="showcase-sub-label">Sizes</div>
            <div className="showcase-grid-2">
              <CustomInput size="sm" label="Small Input" placeholder="Nhập gì đó..." />
              <CustomInput size="md" label="Medium Input" placeholder="Nhập gì đó..." />
              <CustomInput size="lg" label="Large Input" placeholder="Nhập gì đó..." />
              <CustomInput size="md" label="Rounded Input" placeholder="Bo tròn" rounded />
            </div>
          </div>

          <Divider />

          <div className="showcase-sub">
            <div className="showcase-sub-label">With Icons</div>
            <div className="showcase-grid-2">
              <CustomInput label="Tìm kiếm" placeholder="Search..." prefix={<SearchOutlined />} />
              <CustomInput label="Mật khẩu" placeholder="Nhập mật khẩu" suffix={<EditOutlined />} />
            </div>
          </div>
        </CustomCard>
      </section>

      {/* ════════════ TEXTAREA ════════════ */}
      <section id="textarea" className="showcase-section">
        <div className="showcase-section-title">TextArea</div>
        <p className="showcase-section-desc">
          Custom TextArea hỗ trợ size, label, block, rows.
        </p>

        <CustomCard variant="shadow" padding="lg">
          <div className="showcase-grid-2">
            <CustomTextArea size="sm" label="Small TextArea" placeholder="Nhập nội dung..." rows={3} />
            <CustomTextArea size="md" label="Medium TextArea" placeholder="Nhập nội dung..." rows={3} />
            <CustomTextArea size="lg" label="Large TextArea" placeholder="Nhập nội dung..." rows={3} />
            <CustomTextArea size="md" label="Max Length" placeholder="Tối đa 200 ký tự" maxLength={200} showCount rows={3} />
          </div>
        </CustomCard>
      </section>

      {/* ════════════ SELECT ════════════ */}
      <section id="select" className="showcase-section">
        <div className="showcase-section-title">Select</div>
        <p className="showcase-section-desc">
          Custom Select hỗ trợ size, label, rounded, block, multiple.
        </p>

        <CustomCard variant="shadow" padding="lg">
          <div className="showcase-grid-2">
            <CustomSelect size="sm" label="Small Select" placeholder="Chọn thành phố" options={selectOptions} />
            <CustomSelect size="md" label="Medium Select" placeholder="Chọn thành phố" options={selectOptions} />
            <CustomSelect size="lg" label="Large Select" placeholder="Chọn thành phố" options={selectOptions} />
            <CustomSelect size="md" label="Rounded Select" placeholder="Bo tròn" options={selectOptions} rounded />
            <CustomSelect size="md" label="Multiple Select" placeholder="Chọn nhiều" options={selectOptions} mode="multiple" />
            <CustomSelect size="md" label="Searchable" placeholder="Tìm & chọn" options={selectOptions} showSearch />
          </div>
        </CustomCard>
      </section>

      {/* ════════════ DATEPICKER ════════════ */}
      <section id="datepicker" className="showcase-section">
        <div className="showcase-section-title">DatePicker</div>
        <p className="showcase-section-desc">
          Custom DatePicker hỗ trợ size, label, rounded, block.
        </p>

        <CustomCard variant="shadow" padding="lg">
          <div className="showcase-grid-2">
            <CustomDatePicker size="sm" label="Small DatePicker" placeholder="Chọn ngày" />
            <CustomDatePicker size="md" label="Medium DatePicker" placeholder="Chọn ngày" />
            <CustomDatePicker size="lg" label="Large DatePicker" placeholder="Chọn ngày" />
            <CustomDatePicker size="md" label="Rounded DatePicker" placeholder="Bo tròn" rounded />
          </div>
        </CustomCard>
      </section>

      {/* ════════════ MODAL ════════════ */}
      <section id="modal" className="showcase-section">
        <div className="showcase-section-title">Modal</div>
        <p className="showcase-section-desc">
          Custom Modal hỗ trợ size (sm, md, lg, xl), noPadding, centered.
        </p>

        <CustomCard variant="shadow" padding="lg">
          <div className="showcase-row">
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <CustomButton key={size} variant="outline" onClick={() => openModal(size)}>
                Mở Modal <span className="showcase-tag">{size}</span>
              </CustomButton>
            ))}
          </div>

          <CustomModal
            title={`Modal size: ${modalSize}`}
            size={modalSize}
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            onOk={() => setModalOpen(false)}
          >
            <p>Đây là nội dung của modal với size <strong>{modalSize}</strong>.</p>
            <p>
              Width tương ứng:{" "}
              <span className="showcase-tag">
                {modalSize === "sm" ? "400px" : modalSize === "md" ? "520px" : modalSize === "lg" ? "720px" : "960px"}
              </span>
            </p>
          </CustomModal>
        </CustomCard>
      </section>

      {/* ════════════ TABLE ════════════ */}
      <section id="table" className="showcase-section">
        <div className="showcase-section-title">Table</div>
        <p className="showcase-section-desc">
          Custom Table hỗ trợ title, searchable, refresh, striped, bordered, compact, headerActions.
        </p>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <CustomTable
            title="Default Table"
            columns={tableColumns}
            dataSource={tableData}
            searchable
            showRefresh
            onSearch={(v) => console.log("search:", v)}
            onRefresh={() => console.log("refresh")}
            headerActions={
              <Space>
                <CustomButton icon={<PlusOutlined />} size="sm">Thêm mới</CustomButton>
                <CustomButton icon={<DownloadOutlined />} size="sm" variant="outline">Xuất file</CustomButton>
              </Space>
            }
          />

          <CustomTable
            title="Striped + Bordered + Compact"
            columns={tableColumns}
            dataSource={tableData}
            striped
            bordered
            compact
            headerActions={
              <CustomButton icon={<DeleteOutlined />} size="sm" color="danger" variant="outline">
                Xoá đã chọn
              </CustomButton>
            }
          />
        </Space>
      </section>
    </div>
  );
}
