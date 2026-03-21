import { ConfigProvider, theme } from "antd";
import { antThemeToken } from "./themeConfig";
import { DarkModeProvider, useDarkMode } from "../shared/hooks/useDarkMode";

function AntThemeProvider({ children }: any) {
  const { isDark } = useDarkMode();

  return (
    <ConfigProvider
      theme={{
        token: antThemeToken,
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default function ThemeProvider({ children }: any) {
  return (
    <DarkModeProvider>
      <AntThemeProvider>{children}</AntThemeProvider>
    </DarkModeProvider>
  );
}
