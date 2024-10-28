import { create } from "zustand";

interface ThemeStore {
  themeMode: string;
  toggleThemeMode: () => void;
}

const getInitialThemeMode = (): string => {
  if (!localStorage.getItem("themeMode")) {
    localStorage.setItem("themeMode", "lightMode");
    return "lightMode"
  }

  const initialThemeMode: string =
    localStorage.getItem("themeMode") ?? "lightMode";
  return initialThemeMode;
};

const useThemeStore = create<ThemeStore>((set) => ({
  themeMode: getInitialThemeMode(),
  toggleThemeMode: () =>
    set((state) => {
      const newMode =
        state.themeMode === "lightMode" ? "darkMode" : "lightMode";
      localStorage.setItem("themeMode", newMode);
      return { themeMode: newMode };
    }),
}));

export default useThemeStore;
