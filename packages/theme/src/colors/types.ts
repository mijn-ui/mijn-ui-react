export type ColorSchema =
  | Partial<{ foreground: string; DEFAULT: string }>
  | string

export type ActionSchema = ColorSchema & { "foreground-filled"?: string }

export type BaseColors = {
  background: ColorSchema
  foreground: ColorSchema
  border: ColorSchema
  overlay: ColorSchema
  ring: ColorSchema
  input: ColorSchema
}

export type ThemeColors = BaseColors & {
  card: ColorSchema
  popover: ColorSchema
  default: ColorSchema
  primary: ColorSchema
  secondary: ColorSchema
  muted: ColorSchema
  accent: ColorSchema

  info: ActionSchema
  warning: ActionSchema
  danger: ActionSchema
  success: ActionSchema
}

export type DefaultBaseColors = {
  light: BaseColors
  dark: BaseColors
}
