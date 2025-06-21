import type { ThemeColors as ImportedThemeColors } from "./colors"

export type DefaultThemeType = "light" | "dark"

export type RadiusThemeUnit = {
  "2xs"?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  "2xl"?: string
  full?: string
}

export type ShadowThemeUnit = {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  "2xl"?: string
  "3xl"?: string
}

export type ColorSchema =
  | Partial<{ foreground: string; DEFAULT: string }>
  | string

export type ExtendedColorSchema = ColorSchema & {
  "foreground-subtle"?: string
  subtle?: string
  emphasis?: string
  alt?: string
}

export type ActionSchema = ExtendedColorSchema & {
  "foreground-filled"?: string
}

export type BorderSchema = {
  DEFAULT: string
  muted?: string
  inverse?: string
  primary?: string
  "primary-subtle"?: string
  secondary?: string
  success?: string
  "success-subtle"?: string
  warning?: string
  "warning-subtle"?: string
  danger?: string
  "danger-subtle"?: string
}

export type BaseColors = {
  background: ExtendedColorSchema
  foreground: ColorSchema
  border: BorderSchema
  overlay: ColorSchema
  ring: ColorSchema
  input: ColorSchema
}

export type DefaultBaseColors = {
  light: BaseColors
  dark: BaseColors
}

export interface LayoutTheme {
  /**
   * The default radius applied across the components.
   * we recommend to use `rem` units.
   *
   * @default
   * {
   *   "2xs": "0.125rem", // 2px
   *   xs: "0.25rem", // 4px
   *   sm: "0.375rem", // 6px
   *   md: "0.5rem", // 8px
   *   lg: "0.75rem", // 12px
   *   xl: "1rem", // 16px
   *   "2xl": "1.25rem", // 20px
   *   full: "9999px",
   * }
   */
  radius?: RadiusThemeUnit
  /**
   * The box shadow applied across the components.
   *
   * @default
   * {
   *   xs: "0 1px 2px rgba(16, 24, 40, 0.05)",
   *   sm: "0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)",
   *   md: "0 4px 8px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06)",
   *   lg: "0 12px 16px rgba(16, 24, 40, 0.08), 0 4px 6px rgba(16, 24, 40, 0.03)",
   *   xl: "0 20px 24px rgba(16, 24, 40, 0.08), 0 8px 8px rgba(16, 24, 40, 0.03)",
   *   "2xl": "0 24px 48px rgba(16, 24, 40, 0.18)",
   *   "3xl": "0 32px 64px rgba(16, 24, 40, 0.14)",
   * }
   */
  boxShadow?: ShadowThemeUnit
}

export type ConfigTheme = {
  extend?: "light" | "dark"
  layout?: LayoutTheme
  colors?: Partial<ImportedThemeColors>
}

export type ConfigThemes = Record<string, ConfigTheme>

export type MijnUIPluginConfig = {
  /**
   * The prefix for the css variables.
   * @default "mijnui"
   */
  prefix?: string
  /**
   * Common layout definitions. These definitions are applied to all themes.
   */
  layout?: LayoutTheme
  /**
   * The theme definitions.
   */
  themes?: ConfigThemes
  /**
   * The default theme to use.
   * @default "light"
   */
  defaultTheme?: DefaultThemeType
  /**
   * The default theme to extend.
   * @default "light"
   */
  defaultExtendTheme?: DefaultThemeType
}
