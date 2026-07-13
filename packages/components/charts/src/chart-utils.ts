/* -------------------------------------------------------------------------- */
/*                                 Chart Hues                                 */
/* -------------------------------------------------------------------------- */

/**
 * The categorical hues exposed by the core theme
 * (see `docs/foundation/colors.md` → Categorical surfaces), plus `brand`.
 */
export type ChartHue =
  | "brand"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "gray"

/*
 * The maps below hold full, literal class strings on purpose —
 * tailwind-variants can't interpolate class names and the Tailwind compiler
 * only picks up classes that appear verbatim in the source.
 */

/** Solid fill classes per hue (`bg-bg-<hue>`). */
export const HUE_BG_MAP: Record<ChartHue, string> = {
  brand: "bg-bg-brand",
  red: "bg-bg-red",
  orange: "bg-bg-orange",
  amber: "bg-bg-amber",
  yellow: "bg-bg-yellow",
  lime: "bg-bg-lime",
  green: "bg-bg-green",
  emerald: "bg-bg-emerald",
  teal: "bg-bg-teal",
  cyan: "bg-bg-cyan",
  sky: "bg-bg-sky",
  blue: "bg-bg-blue",
  indigo: "bg-bg-indigo",
  violet: "bg-bg-violet",
  purple: "bg-bg-purple",
  fuchsia: "bg-bg-fuchsia",
  pink: "bg-bg-pink",
  rose: "bg-bg-rose",
  gray: "bg-bg-gray",
}

/** Subtle fill classes per hue (`bg-bg-<hue>-subtle`). */
export const HUE_BG_SUBTLE_MAP: Record<ChartHue, string> = {
  brand: "bg-bg-brand-subtle",
  red: "bg-bg-red-subtle",
  orange: "bg-bg-orange-subtle",
  amber: "bg-bg-amber-subtle",
  yellow: "bg-bg-yellow-subtle",
  lime: "bg-bg-lime-subtle",
  green: "bg-bg-green-subtle",
  emerald: "bg-bg-emerald-subtle",
  teal: "bg-bg-teal-subtle",
  cyan: "bg-bg-cyan-subtle",
  sky: "bg-bg-sky-subtle",
  blue: "bg-bg-blue-subtle",
  indigo: "bg-bg-indigo-subtle",
  violet: "bg-bg-violet-subtle",
  purple: "bg-bg-purple-subtle",
  fuchsia: "bg-bg-fuchsia-subtle",
  pink: "bg-bg-pink-subtle",
  rose: "bg-bg-rose-subtle",
  gray: "bg-bg-gray-subtle",
}

/** SVG stroke classes per hue (`stroke-fg-<hue>`). */
export const HUE_STROKE_MAP: Record<ChartHue, string> = {
  brand: "stroke-fg-brand",
  red: "stroke-fg-red",
  orange: "stroke-fg-orange",
  amber: "stroke-fg-amber",
  yellow: "stroke-fg-yellow",
  lime: "stroke-fg-lime",
  green: "stroke-fg-green",
  emerald: "stroke-fg-emerald",
  teal: "stroke-fg-teal",
  cyan: "stroke-fg-cyan",
  sky: "stroke-fg-sky",
  blue: "stroke-fg-blue",
  indigo: "stroke-fg-indigo",
  violet: "stroke-fg-violet",
  purple: "stroke-fg-purple",
  fuchsia: "stroke-fg-fuchsia",
  pink: "stroke-fg-pink",
  rose: "stroke-fg-rose",
  gray: "stroke-fg-gray",
}

/**
 * Text color classes per hue (`text-fg-<hue>`) — used to drive
 * `stroke="currentColor"` / `stop-color="currentColor"` SVG techniques.
 */
export const HUE_TEXT_MAP: Record<ChartHue, string> = {
  brand: "text-fg-brand",
  red: "text-fg-red",
  orange: "text-fg-orange",
  amber: "text-fg-amber",
  yellow: "text-fg-yellow",
  lime: "text-fg-lime",
  green: "text-fg-green",
  emerald: "text-fg-emerald",
  teal: "text-fg-teal",
  cyan: "text-fg-cyan",
  sky: "text-fg-sky",
  blue: "text-fg-blue",
  indigo: "text-fg-indigo",
  violet: "text-fg-violet",
  purple: "text-fg-purple",
  fuchsia: "text-fg-fuchsia",
  pink: "text-fg-pink",
  rose: "text-fg-rose",
  gray: "text-fg-gray",
}

/**
 * SVG text-fill classes readable ON a hue's solid surface
 * (`fill-on-bg-<hue>`) — used for labels drawn on top of chart marks.
 */
export const HUE_ON_BG_FILL_MAP: Record<ChartHue, string> = {
  brand: "fill-on-bg-brand",
  red: "fill-on-bg-red",
  orange: "fill-on-bg-orange",
  amber: "fill-on-bg-amber",
  yellow: "fill-on-bg-yellow",
  lime: "fill-on-bg-lime",
  green: "fill-on-bg-green",
  emerald: "fill-on-bg-emerald",
  teal: "fill-on-bg-teal",
  cyan: "fill-on-bg-cyan",
  sky: "fill-on-bg-sky",
  blue: "fill-on-bg-blue",
  indigo: "fill-on-bg-indigo",
  violet: "fill-on-bg-violet",
  purple: "fill-on-bg-purple",
  fuchsia: "fill-on-bg-fuchsia",
  pink: "fill-on-bg-pink",
  rose: "fill-on-bg-rose",
  gray: "fill-on-bg-gray",
}

/**
 * Default categorical series order. Hues are assigned in this fixed order
 * (never re-shuffled when series are added or removed) so a series keeps its
 * color across renders and filters.
 */
export const DEFAULT_PALETTE: ChartHue[] = [
  "blue",
  "emerald",
  "amber",
  "violet",
  "rose",
  "cyan",
  "orange",
  "teal",
  "pink",
  "lime",
  "indigo",
  "gray",
]

/* -------------------------------------------------------------------------- */
/*                                 Chart Data                                 */
/* -------------------------------------------------------------------------- */

/** A single labeled value (BarChart), optionally with a fixed hue. */
export type ChartDatum = {
  label: string
  value: number
  color?: ChartHue
}

/** A labeled group of values, one per series (GroupedBarChart). */
export type GroupedChartDatum = {
  label: string
  values: number[]
}

/** A labeled value with an optional fixed hue (DonutChart). */
export type DonutChartDatum = {
  label: string
  value: number
  color?: ChartHue
}
