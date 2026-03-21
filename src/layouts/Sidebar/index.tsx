import { useState, type ReactNode } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./styles.css";

type MenuItem = Required<MenuProps>["items"][number];

export interface SidebarProps {
  /** Menu items — supports nested children for sub-menus */
  items: MenuItem[];
  /** Header / logo shown at the top of the sidebar */
  header?: ReactNode;
  /** Footer content pinned at the bottom */
  footer?: ReactNode;
  /** Start collapsed? */
  defaultCollapsed?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapse?: (collapsed: boolean) => void;
  /** Width when expanded (px) */
  width?: number;
  /** Width when collapsed (px) */
  collapsedWidth?: number;
  /** Ant Menu theme */
  theme?: "light" | "dark";
  /** Called when a menu item is clicked */
  onSelect?: MenuProps["onSelect"];
  /** Currently selected keys */
  selectedKeys?: string[];
  /** Default selected keys */
  defaultSelectedKeys?: string[];
  /** Default open sub-menu keys */
  defaultOpenKeys?: string[];
}

export default function Sidebar({
  items,
  header,
  footer,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapse,
  width = 256,
  collapsedWidth = 80,
  theme = "dark",
  onSelect,
  selectedKeys,
  defaultSelectedKeys,
  defaultOpenKeys,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  // Support both controlled & uncontrolled
  const isControlled = controlledCollapsed !== undefined;
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed;

  const toggle = () => {
    const next = !collapsed;
    if (!isControlled) setInternalCollapsed(next);
    onCollapse?.(next);
  };

  return (
    <aside
      className={`sidebar ${theme} ${collapsed ? "collapsed" : ""}`}
      style={{ width: collapsed ? collapsedWidth : width }}
    >
      {/* ── Header ── */}
      <div className="sidebar-header">
        {header && <div className="sidebar-logo">{header}</div>}

        <button
          className="sidebar-toggle"
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>

      {/* ── Menu ── */}
      <div className="sidebar-menu">
        <Menu
          mode="inline"
          theme={theme}
          inlineCollapsed={collapsed}
          items={items}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
        />
      </div>

      {/* ── Footer ── */}
      {footer && <div className="sidebar-footer">{footer}</div>}
    </aside>
  );
}
