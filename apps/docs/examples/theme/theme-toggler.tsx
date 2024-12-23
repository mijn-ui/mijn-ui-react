"use client"

import { useTheme } from "next-themes"
import { SVGProps, useEffect, useState } from "react"
import { Button, ButtonProps } from "@mijn-ui/react-button"
/* -------------------------------------------------------------------------- */

const ThemeToggler = ({ ...props }: ButtonProps) => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return

  if (resolvedTheme === "dark") {
    return (
      <Button onClick={() => setTheme("light")} {...props}>
        <SunIcon fontSize={16} />
      </Button>
    )
  }
  if (resolvedTheme === "light") {
    return (
      <Button onClick={() => setTheme("dark")} {...props}>
        <MoonIcon fontSize={14} />
      </Button>
    )
  }
}

export default ThemeToggler

/* -------------------------------------------------------------------------- */

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={12} cy={12} r={5} />
      <path d="M12 1L12 3" />
      <path d="M12 21L12 23" />
      <path d="M4.22 4.22L5.64 5.64" />
      <path d="M18.36 18.36L19.78 19.78" />
      <path d="M1 12L3 12" />
      <path d="M21 12L23 12" />
      <path d="M4.22 19.78L5.64 18.36" />
      <path d="M18.36 5.64L19.78 4.22" />
    </svg>
  )
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
