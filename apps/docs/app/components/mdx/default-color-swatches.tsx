"use client"

import { useEffect, useState } from "react"
import {
  ActionSchema,
  ThemeColors,
  themeColorsDark,
  themeColorsLight,
} from "@mijn-ui/react"
import { readableColor, toHex } from "color2k"
import { Check, Clipboard } from "lucide-react"
import { useTheme } from "next-themes"
import { useCopyToClipboard } from "@/app/hooks/use-copy-to-clipboard"
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip"

/* -------------------------------------------------------------------------- */
/*                             Constant Variables                             */
/* -------------------------------------------------------------------------- */

const SWATCH_CATEGORIES = {
  base: "base",
  common: "common",
  status: "status",
} as const

const BASE_KEYS = [
  "background",
  "foreground",
  "border",
  "ring",
  "input",
  "overlay",
] as const

const OTHER_KEYS = [
  "card",
  "popover",
  "default",
  "primary",
  "secondary",
  "muted",
  "accent",
] as const

const STATUS_KEYS = ["success", "info", "warning", "danger"] as const

/* -------------------------------------------------------------------------- */

type DefaultColorSwatchesProps = {
  category: (typeof SWATCH_CATEGORIES)[keyof typeof SWATCH_CATEGORIES]
}

const DefaultColorSwatches = ({ category }: DefaultColorSwatchesProps) => {
  const Colors = {
    light: createColors(themeColorsLight),
    dark: createColors(themeColorsDark),
  }
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const activeColors = theme === "dark" ? Colors.dark : Colors.light

  const renderSwatches = (
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    colors: Record<string, any>,
    keys: readonly string[],
  ) => (
    <div className={"flex flex-wrap items-center gap-4"}>
      {Object.entries(colors).map(([key, value]) =>
        keys.map((subKey) => (
          <ColorSwatch
            key={`${key}-${subKey}`}
            color={value[subKey]}
            label={omitSubkeyStringBackground(key, subKey)}
          />
        )),
      )}
    </div>
  )

  switch (category) {
    case SWATCH_CATEGORIES.base:
      return renderSwatches(activeColors.base, ["background"])
    case SWATCH_CATEGORIES.common:
      return renderSwatches(activeColors.common, ["background", "foreground"])
    case SWATCH_CATEGORIES.status:
      return renderSwatches(activeColors.status, [
        "background",
        "foreground",
        "foreground-filled",
      ])
    default:
      return (
        <div className="space-y-4">
          {renderSwatches(activeColors.base, ["background"])}
          {renderSwatches(activeColors.common, ["background", "foreground"])}
          {renderSwatches(activeColors.status, [
            "background",
            "foreground",
            "foreground-filled",
          ])}
        </div>
      )
  }
}

const ColorSwatch = ({ color, label }: { color?: string; label: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  if (!color) return null

  const handleCopy = () => {
    copyToClipboard(color)
  }

  const style = {
    backgroundColor: withHslFunc(color),
    color: readableColor(toHex(withHslFunc(color))),
  }

  return (
    <Tooltip open={isCopied}>
      <TooltipTrigger
        onClick={handleCopy}
        className="group relative flex size-24 shrink-0 cursor-pointer flex-col items-center justify-center rounded-md border border-border p-2 text-xs shadow-sm transition-opacity duration-300 hover:opacity-hover md:size-28"
        style={style}
      >
        <span className="absolute right-2 top-2 hidden text-xs group-hover:block">
          {isCopied ? (
            <Check className="size-[1em]" />
          ) : (
            <Clipboard className="size-[1em]" />
          )}
        </span>
        <span className="inline-block text-center font-medium">{label}</span>
        <span className="inline-block text-center text-[12px]">{color}</span>
      </TooltipTrigger>
      <TooltipContent>Copied</TooltipContent>
    </Tooltip>
  )
}

export default DefaultColorSwatches

/* -------------------------------------------------------------------------- */
/*                               Util Functions                               */
/* -------------------------------------------------------------------------- */

const omitSubkeyStringBackground = (key: string, subKey: string) =>
  subKey === "background" ? key : `${key}-${subKey}`

/**
 * Converts a color string (e.g., `"0 0% 100%"`) into an HSL color function string.
 * If the input is undefined, it returns an empty string.
 *
 * @param color - A space-separated HSL color string (e.g., `"0 0% 100%"`) or undefined.
 * @returns The HSL color function string (e.g., `"hsl(0, 0%, 100%)"`) or an empty string.
 */

const withHslFunc = (color: string | undefined): string =>
  color ? `hsl(${color.split(" ").join(", ")})` : ""

/**
 * Creates a structured object containing themed colors grouped by swatch categories.
 *
 * Each category includes keys like `base`, `other`, and `status` with their respective
 * background and foreground color values.
 *
 * @param themeColors - The theme colors object containing color definitions.
 * @returns A categorized object of theme colors.
 */

function createColors(themeColors: ThemeColors) {
  return {
    [SWATCH_CATEGORIES.base]: createCategory(BASE_KEYS, (key) => ({
      background: getColor(themeColors[key]),
    })),
    [SWATCH_CATEGORIES.common]: createCategory(OTHER_KEYS, (key) => ({
      background: getColor(themeColors[key]),
      foreground: getColor(themeColors[key], "foreground"),
    })),
    [SWATCH_CATEGORIES.status]: createCategory(STATUS_KEYS, (key) => ({
      background: getColor(themeColors[key]),
      foreground: getColor(themeColors[key], "foreground"),
      "foreground-filled": getColor(themeColors[key], "foreground-filled"),
    })),
  }
}

/**
 * Generates an object based on a list of keys and a mapping function.
 *
 * The mapper function is applied to each key, producing a corresponding value.
 *
 * @param keys - A readonly array of keys.
 * @param mapper - A function that takes a key and returns a value for that key.
 * @returns An object where each key maps to the result of the mapper function.
 */
function createCategory<T extends string, R>(
  keys: readonly T[],
  mapper: (key: T) => R,
): Record<T, R> {
  return Object.fromEntries(keys.map((key) => [key, mapper(key)])) as Record<
    T,
    R
  >
}

/**
 * Retrieves a specific color value from the given action schema.
 *
 * Depending on the `value` parameter, it returns the corresponding property (e.g., `DEFAULT`, `foreground`, or `foreground-filled`).
 * If `value` is not specified, it prioritizes `DEFAULT`, then `foreground`, and finally `foreground-filled`.
 *
 * @param color - The action schema containing color definitions or a string color value.
 * @param value - The specific color property to retrieve (`"background"`, `"foreground"`, or `"foreground-filled"`).
 * @returns The corresponding color value as a string.
 */

const COLOR_KEYS = {
  background: "background",
  foreground: "foreground",
  "foreground-filled": "foreground-filled",
} as const

type ColorKeyValues = (typeof COLOR_KEYS)[keyof typeof COLOR_KEYS]

function getColor(color: ActionSchema, value?: ColorKeyValues) {
  if (typeof color === "string") return color

  switch (value) {
    case COLOR_KEYS.background:
      return color.DEFAULT
    case COLOR_KEYS.foreground:
      return color.foreground
    case COLOR_KEYS["foreground-filled"]:
      return color["foreground-filled"]
    default:
      return color.DEFAULT ?? color.foreground ?? color["foreground-filled"]
  }
}
