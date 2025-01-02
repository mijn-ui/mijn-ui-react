import { DefaultBaseColors, ThemeColors } from "./types"

const base: DefaultBaseColors = {
  light: {
    main: {
      DEFAULT: "210 14% 95%",
      text: "0 0% 0%",
    },
    border: "0 0% 83%",
    "input-border": "0 0% 0%",
    ring: "0 0% 15%",
    overlay: "0 0% 0%",
  },
  dark: {
    main: {
      DEFAULT: "0 0% 4%",
      text: "0 0% 96%",
    },
    border: "0 0% 15%",
    "input-border": "0 0% 96%",
    ring: "0 0% 96%",
    overlay: "0 0% 0%",
  },
}

export const themeColorsLight: ThemeColors = {
  ...base.light,
  surface: {
    DEFAULT: "0 0% 98%",
    text: "0 0% 0%",
  },

  muted: {
    DEFAULT: "0 0% 83%",
    text: "0 0% 25%",
  },

  accent: {
    DEFAULT: "0 0% 90%",
    text: "0 0% 0%",
  },

  primary: {
    DEFAULT: "29 100% 52%",
    text: "0 0% 100%",
  },

  secondary: {
    DEFAULT: "33 35% 50%",
    text: "0 0% 100%",
  },

  info: {
    DEFAULT: "216 76% 52%",
    text: "219 64% 43%",
    "filled-text": "0 0% 100%",
  },

  warning: {
    DEFAULT: "45 92% 47%",
    text: "28 73% 26%",
    "filled-text": "0 0% 0%",
  },

  danger: {
    DEFAULT: "0 72% 43%",
    text: "0 82% 31%",
    "filled-text": "0 0% 100%",
  },

  success: {
    DEFAULT: "140 76% 38%",
    text: "140 49% 20%",
    "filled-text": "0 0% 100%",
  },
}

export const themeColorsDark: ThemeColors = {
  ...base.dark,
  surface: {
    DEFAULT: "0 0% 7%",
    text: "0 0% 96%",
  },

  muted: {
    DEFAULT: "0 0% 15%",
    text: "0 0% 64%",
  },

  accent: {
    DEFAULT: "0 0% 12%",
    text: "0 0% 96%",
  },

  primary: {
    DEFAULT: "29 100% 52%",
    text: "0 0% 100%",
  },

  secondary: {
    DEFAULT: "33 35% 50%",
    text: "0 0% 100%",
  },

  info: {
    DEFAULT: "216 76% 52%",
    text: "207 70% 80%",
    "filled-text": "0 0% 100%",
  },

  danger: {
    DEFAULT: "0 72% 43%",
    text: "0 79% 79%",
    "filled-text": "0 0% 100%",
  },

  warning: {
    DEFAULT: "45 92% 47%",
    text: "53 98% 77%",
    "filled-text": "0 0% 0%",
  },

  success: {
    DEFAULT: "140 76% 38%",
    text: "140 71% 82%",
    "filled-text": "0 0% 100%",
  },
}

export const defaultColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
}
