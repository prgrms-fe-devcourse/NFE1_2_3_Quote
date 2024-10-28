import { create } from "zustand";

interface ThemeStore {
  themeMode: string;
  toggleThemeMode: () => void;
}

const initialThemeMode = localStorage.getItem("themeMode") || "lightMode";
if (!localStorage.getItem("themeMode")) {
  localStorage.setItem("themeMode", initialThemeMode);
}

const useThemeStore = create<ThemeStore>((set) => ({
  themeMode: initialThemeMode,
  toggleThemeMode: () =>
    set((state) => {
      const newMode =
        state.themeMode === "lightMode" ? "darkMode" : "lightMode";
      localStorage.setItem("themeMode", newMode);
      return { themeMode: newMode };
    }),
}));

export default useThemeStore;
