import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",

      setMode: (mode: ThemeMode) => {
        set({ mode });
        applyTheme(mode);
      },

      toggleMode: () => {
        const current = get().mode;
        const next = current === "dark" ? "light" : "dark";
        get().setMode(next);
      },
    }),
    {
      name: "pazaryeri-theme",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.mode);
        }
      },
    }
  )
);

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  
  if (mode === "system") {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", systemPrefersDark);
  } else {
    root.classList.toggle("dark", mode === "dark");
  }
}

// Listen to system theme changes
if (typeof window !== "undefined") {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const store = useThemeStore.getState();
    if (store.mode === "system") {
      document.documentElement.classList.toggle("dark", e.matches);
    }
  });
}
