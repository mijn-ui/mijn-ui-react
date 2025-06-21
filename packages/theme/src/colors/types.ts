export type ColorSchema =
  | Partial<{ foreground: string; DEFAULT: string }>
  | string

export type ExtendedColorSchema = ColorSchema & {
  "foreground-subtle"?: string
  subtle?: string
  emphasis?: string
  alt?: string
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
}

export type ThemeColors = BaseColors & {
  muted: ExtendedColorSchema
  inverse: ColorSchema
  primary: ExtendedColorSchema & {
    emphasis: string
    subtle: string
    "foreground-subtle": string
  }
  secondary: ColorSchema
  success: ExtendedColorSchema & {
    emphasis: string
    subtle: string
    "foreground-subtle": string
  }
  warning: ExtendedColorSchema & {
    emphasis: string
    subtle: string
    "foreground-subtle": string
  }
  danger: ExtendedColorSchema & {
    emphasis: string
    subtle: string
    "foreground-subtle": string
  }
}

export type DefaultBaseColors = {
  light: BaseColors
  dark: BaseColors
}
