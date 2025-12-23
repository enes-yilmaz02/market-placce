"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "@/lib/stores";
import { Button, Icon } from "@/components/atoms";

export function ThemeToggle() {
  const { mode, toggleMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" aria-label="Toggle theme">
        <Icon name="sun" size={20} />
      </Button>
    );
  }

  const isDark = mode === "dark" || (mode === "system" && 
    typeof window !== "undefined" && 
    window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMode}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Icon name={isDark ? "moon" : "sun"} size={20} />
      </motion.div>
    </Button>
  );
}
