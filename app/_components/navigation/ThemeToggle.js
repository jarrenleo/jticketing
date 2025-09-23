"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  function handleThemeToggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  if (!mounted) return null;

  return (
    <button
      onClick={handleThemeToggle}
      className="group cursor-pointer rounded-xl p-2 transition-colors hover:bg-accent"
      aria-label="Theme toggle button"
    >
      {resolvedTheme === "dark" ? (
        <Moon
          width={20}
          height={20}
          className="group-hover:stroke-accent-foreground group-hover:transition-colors"
        />
      ) : (
        <Sun
          width={20}
          height={20}
          className="group-hover:stroke-accent-foreground group-hover:transition-colors"
        />
      )}
    </button>
  );
}
