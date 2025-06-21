import type { DefaultBaseColors, ThemeColors } from "./types"

const base: DefaultBaseColors = {
  light: {
    background: {
      DEFAULT: "0 0 100%",
      alt: "0 0 100%",
    },
    foreground: {
      DEFAULT: "240 10% 4%",
    },
    border: {
      DEFAULT: "240 5% 84%",
      muted: "240 5% 96%",
      inverse: "240 5% 26%",
      primary: "20 88% 40%",
      "primary-subtle": "21 98% 83%",
      secondary: "240 6% 90%",
      success: "142 72% 29%",
      "success-subtle": "142 79% 85%",
      warning: "41 92% 33%",
      "warning-subtle": "41 98% 77%",
      danger: "0 74% 42%",
      "danger-subtle": "0 96% 89%",
    },
  },
  dark: {
    background: {
      DEFAULT: "240 10% 4%",
      alt: "240 4% 16%",
    },
    foreground: {
      DEFAULT: "0 0 100%",
    },
    border: {
      DEFAULT: "240 5% 26%",
      muted: "240 6% 10%",
      inverse: "240 5% 84%",
      primary: "20 96% 61%",
      "primary-subtle": "21 79% 34%",
      secondary: "240 4% 16%",
      success: "142 69% 58%",
      "success-subtle": "142 64% 24%",
      warning: "41 96% 53%",
      "warning-subtle": "41 81% 29%",
      danger: "0 91% 71%",
      "danger-subtle": "0 70% 35%",
    },
  },
}

export const themeColorsLight: ThemeColors = {
  ...base.light,

  muted: {
    DEFAULT: "240 6% 90%",
    alt: "240 6% 90%",
    foreground: "240 4% 46%",
  },

  inverse: {
    DEFAULT: "240 10% 4%",
    foreground: "0 0 98%",
  },

  primary: {
    DEFAULT: "21 90% 48%",
    foreground: "20 100% 96%",
    subtle: "20 100% 92%",
    "foreground-subtle": "20 75% 28%",
    emphasis: "20 88% 40%",
  },

  secondary: {
    DEFAULT: "240 5% 96%",
    foreground: "240 5% 26%",
  },

  success: {
    DEFAULT: "142 76% 36%",
    foreground: "143 76% 97%",
    subtle: "143 84% 93%",
    "foreground-subtle": "142 61% 20%",
    emphasis: "142 72% 29%",
  },

  warning: {
    DEFAULT: "41 96% 40%",
    foreground: "41 92% 95%",
    subtle: "41 97% 88%",
    "foreground-subtle": "40 73% 26%",
    emphasis: "41 92% 33%",
  },

  danger: {
    DEFAULT: "0 72% 51%",
    foreground: "0 86% 97%",
    subtle: "0 93% 94%",
    "foreground-subtle": "0 63% 31%",
    emphasis: "0 74% 42%",
  },
}

export const themeColorsDark: ThemeColors = {
  ...base.dark,

  muted: {
    DEFAULT: "240 4% 16%",
    alt: "240 10% 4%",
    foreground: "240 4% 46%",
  },

  inverse: {
    DEFAULT: "0 0 100%",
    foreground: "240 10% 4%",
  },

  primary: {
    DEFAULT: "20 96% 61%",
    foreground: "21 81% 15%",
    subtle: "20 75% 28%",
    "foreground-subtle": "20 100% 92%",
    emphasis: "20 96% 61%",
  },

  secondary: {
    DEFAULT: "240 6% 10%",
    foreground: "240 5% 84%",
  },

  success: {
    DEFAULT: "142 69% 58%",
    foreground: "142 80% 10%",
    subtle: "142 61% 20%",
    "foreground-subtle": "143 84% 93%",
    emphasis: "142 69% 58%",
  },

  warning: {
    DEFAULT: "41 96% 53%",
    foreground: "41 83% 14%",
    subtle: "40 73% 26%",
    "foreground-subtle": "41 97% 88%",
    emphasis: "41 96% 53%",
  },

  danger: {
    DEFAULT: "0 91% 71%",
    foreground: "0 75% 15%",
    subtle: "0 63% 31%",
    "foreground-subtle": "0 93% 94%",
    emphasis: "0 91% 71%",
  },
}

export const defaultColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
}
