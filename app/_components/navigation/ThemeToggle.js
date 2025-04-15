"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="cursor-pointer rounded-md p-1.5 transition-colors hover:bg-accent"
      aria-label="Theme toggle button"
    >
      {resolvedTheme === "dark" ? (
        <Moon width={20} height={20} />
      ) : (
        <Sun width={20} height={20} />
      )}
    </button>
  );
}
