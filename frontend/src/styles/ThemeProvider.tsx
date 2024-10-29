import { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import useThemeStore from "./store/useThemeStore";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { themeMode } = useThemeStore();

  return (
    <StyledThemeProvider
      theme={themeMode === "lightMode" ? lightTheme : darkTheme}
    >
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
