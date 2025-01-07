"use client"

// Adapted from https://gist.github.com/Gomah/cb2b0b3f7cb9838a0efd6508a42c3eda/aa5d64a6ca2c0cfb6c86118410c943c62a1023b2
/* eslint-disable */
import { useMediaQuery } from "@mijn-ui/react-hooks"

const screens = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

type Breakpoints = keyof typeof screens

type ResponsiveValue<T> = T extends boolean
  ? boolean
  : T extends string
    ? T
    : keyof T

type ResponsiveProps<T> = {
  [K in Breakpoints]?: ResponsiveValue<T>
} & { initial: ResponsiveValue<T> }

function getScreenValue(key: string) {
  return Number.parseInt(screens[key as Breakpoints])
}

/**
 * Custom hook for handling responsive behavior for multiple attributes.
 * @param props - An object where keys are attribute names, and values are responsive props for each attribute.
 * @returns An object with resolved responsive values for each attribute.
 */
export function useResponsiveVariants<T extends Record<string, any>>(props: {
  [K in keyof T]: ResponsiveProps<T[K]>
}) {
  const results: Partial<Record<keyof T, any>> = {}

  for (const key in props) {
    const { initial, ...breakpoints } = props[key]
    const matchedBreakpoint = Object.keys(breakpoints)
      .sort((a, b) => getScreenValue(b) - getScreenValue(a))
      .map((breakpoint) =>
        useMediaQuery(`(min-width: ${screens[breakpoint as Breakpoints]})`)
          ? breakpoints[breakpoint as Breakpoints]
          : undefined,
      )
      .find((value) => value !== undefined)

    results[key] = matchedBreakpoint ?? initial
  }

  return results as T
}
