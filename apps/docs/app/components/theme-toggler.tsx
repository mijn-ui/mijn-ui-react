"use client"

import { useEffect, useState } from "react"

import { useTheme } from "next-themes"
import { FiMoon, FiSun } from "react-icons/fi"

import { cn } from "@mijn-ui/react-theme"

/* -------------------------------------------------------------------------- */

const ThemeToggler = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return

  if (resolvedTheme === "dark") {
    return (
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex size-8 items-center justify-center text-muted-foreground transition duration-200 hover:text-secondary sm:size-10",
          className,
        )}
      >
        <FiSun />
      </button>
    )
  }
  if (resolvedTheme === "light") {
    return (
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex size-8 items-center justify-center text-muted-foreground transition duration-200 hover:text-secondary sm:size-10",
          className,
        )}
      >
        <FiMoon />
      </button>
    )
  }
}

export default ThemeToggler
