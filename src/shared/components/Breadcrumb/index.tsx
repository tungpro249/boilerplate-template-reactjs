import { Breadcrumb } from "antd";
import { Link, useMatches } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

interface MatchHandle {
  breadcrumb?: string;
}

export default function AppBreadcrumb() {
  const matches = useMatches();

  // Lọc các match có handle.breadcrumb
  const items = matches
    .filter((match) => (match.handle as MatchHandle)?.breadcrumb)
    .map((match, index, arr) => {
      const label = (match.handle as MatchHandle).breadcrumb!;
      const isFirst = index === 0;
      const isLast = index === arr.length - 1;

      return {
        title: isLast ? (
          label
        ) : (
          <Link to={match.pathname}>
            {isFirst && <HomeOutlined />} {label}
          </Link>
        ),
      };
    });

  if (items.length === 0) return null;

  return <Breadcrumb items={items} style={{ marginBottom: 16 }} />;
}
