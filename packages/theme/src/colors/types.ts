// need to rename
export type GeneralColor = Partial<{ text: string; DEFAULT: string }> | string

export type ActionColor = GeneralColor & { "filled-text"?: string }

export type BaseColors = {
  main: GeneralColor
  border: string
  overlay: string
  ring: string
  // TODO: removed this later
  "input-border": string
}

export type ThemeColors = BaseColors & {
  surface: GeneralColor
  muted: GeneralColor
  accent: GeneralColor
  primary: GeneralColor
  secondary: GeneralColor
  info: ActionColor
  warning: ActionColor
  danger: ActionColor
  success: ActionColor
}

export type DefaultBaseColors = {
  light: BaseColors
  dark: BaseColors
}
