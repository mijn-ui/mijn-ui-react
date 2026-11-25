/// <reference types="node" />
/**
 * Test helpers shared by the component packages. Private, never published.
 *
 * The bug these exist for: a class the theme cannot compile — an undefined
 * token (`text-fg-brand-emphasis`), two classes fused by a missing space
 * (`bg-bg-brandfocus:...`) — builds green, passes lint and types, and then
 * silently renders nothing. Only Tailwind itself can tell, so these run the
 * real Tailwind compiler against the real theme.
 */
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const require = createRequire(import.meta.url)
const here = dirname(fileURLToPath(import.meta.url))
const tailwindDir = dirname(require.resolve("tailwindcss/package.json"))
const themeFile = join(here, "../../core/src/theme.css")
// Components use tw-animate-css's enter/exit utilities (`animate-in`,
// `fade-in-0`, ...), so it is part of the stylesheet they are checked against,
// as it is in Storybook. It exports only a `style` condition, hence the path.
const animateFile = join(
  here,
  "node_modules/tw-animate-css/dist/tw-animate.css",
)

type Compiler = { build(candidates: string[]): string }

const createCompiler = async (): Promise<Compiler> => {
  const { compile } = require("tailwindcss") as {
    compile: (
      css: string,
      opts: {
        base: string
        loadStylesheet: (
          id: string,
          base: string,
        ) => Promise<{ path: string; base: string; content: string }>
      },
    ) => Promise<Compiler>
  }
  const css = [
    '@import "tailwindcss/theme.css" layer(theme);',
    '@import "mijn-ui-theme";',
    '@import "tw-animate-css";',
    '@import "tailwindcss/utilities.css" layer(utilities);',
  ].join("\n")

  return compile(css, {
    base: here,
    loadStylesheet: async (id) => {
      const path =
        id === "mijn-ui-theme"
          ? themeFile
          : id === "tw-animate-css"
            ? animateFile
            : join(tailwindDir, id.replace(/^tailwindcss\//, ""))
      return { path, base: dirname(path), content: readFileSync(path, "utf8") }
    },
  })
}

/** Split class strings (or arrays of them) into unique candidates. */
export const splitClasses = (
  ...classes: Array<string | undefined | null | false>
): string[] => [
  ...new Set(
    classes
      .filter((c): c is string => typeof c === "string")
      .flatMap((c) => c.split(/\s+/))
      .filter(Boolean),
  ),
]

/** Marker classes that are meant to produce no CSS of their own. */
const MARKERS = /^(group|peer)(\/[\w-]+)?$/

/**
 * Returns every class that Tailwind, compiled against the mijn-ui theme,
 * turns into no CSS at all. An empty array means every class does something.
 *
 * @param markers - extra classes that are hooks for other selectors on
 *   purpose (react-day-picker's `day-outside`, say) and should be ignored.
 */
export const unknownClasses = async (
  classes: string | string[],
  markers: string[] = [],
): Promise<string[]> => {
  const compiler = await createCompiler()
  const unknown: string[] = []
  // build() accumulates: the stylesheet only grows when the new candidate
  // actually generated something.
  let previous = compiler.build([])
  for (const candidate of splitClasses(...[classes].flat())) {
    if (MARKERS.test(candidate) || markers.includes(candidate)) continue
    const next = compiler.build([candidate])
    if (next === previous) unknown.push(candidate)
    previous = next
  }
  return unknown
}

export type Declaration = {
  property: string
  value: string
  important: boolean
}

/**
 * The declarations Tailwind emits for `classes` (custom properties left out),
 * with whether each is `!important`.
 */
export const declarationsFor = async (
  classes: string | string[],
): Promise<Declaration[]> => {
  const compiler = await createCompiler()
  const css = compiler.build(splitClasses(...[classes].flat()))
  const layer = css.slice(css.indexOf("@layer utilities"))
  const end = layer.search(/\n@property|\n@layer properties/)
  return parseDeclarations(end === -1 ? layer : layer.slice(0, end))
}

/** Plain declarations in a stylesheet, ignoring custom properties. */
export const parseDeclarations = (css: string): Declaration[] =>
  [...css.matchAll(/(?:^|[;{\s])([a-z-]+)\s*:\s*([^;{}]+);/g)]
    .filter(([, property]) => !property.startsWith("--"))
    .map(([, property, raw]) => ({
      property,
      value: raw.replace(/\s*!important\s*$/, "").trim(),
      important: /!important\s*$/.test(raw),
    }))

/* -------------------------------------------------------------------------- */

const parseColorTokens = (block: string): Record<string, string> =>
  Object.fromEntries(
    [...block.matchAll(/--color-([a-z0-9-]+)\s*:\s*([^;]+);/g)].map(
      ([, name, value]) => [name, value.trim()],
    ),
  )

/**
 * The colour tokens theme.css defines, as written (`hsl(...)`), for light mode
 * and for `.dark` (which inherits every token it does not override).
 */
export const themeColors = (): {
  light: Record<string, string>
  dark: Record<string, string>
} => {
  const css = readFileSync(themeFile, "utf8")
  const darkStart = css.indexOf(".dark {")
  const darkEnd = css.indexOf("}", darkStart)
  const light = parseColorTokens(css.slice(0, darkStart))
  const dark = { ...light, ...parseColorTokens(css.slice(darkStart, darkEnd)) }
  return { light, dark }
}

const hslToRgb = (value: string): [number, number, number] => {
  const match = value.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?\s*\)/)
  if (!match) throw new Error(`not an hsl() colour: ${value}`)
  const [h, s, l] = [
    Number(match[1]),
    Number(match[2]) / 100,
    Number(match[3]) / 100,
  ]
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0), f(8), f(4)]
}

const luminance = (value: string) => {
  const [r, g, b] = hslToRgb(value).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG contrast ratio between two `hsl(...)` colours, from 1 to 21. */
export const contrastRatio = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
