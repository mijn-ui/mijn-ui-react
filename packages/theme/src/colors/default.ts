import { DefaultBaseColors, ThemeColors } from "./types"

const base: DefaultBaseColors = {
  light: {
    background: {
      DEFAULT: "220 14% 96%",
    },
    foreground: {
      DEFAULT: "0 0% 0%",
    },
    border: {
      DEFAULT: "0 0% 83%",
    },
    input: {
      DEFAULT: "0 0% 73%",
    },
    ring: {
      DEFAULT: "0 0% 15%",
    },
    overlay: {
      DEFAULT: "0 0% 0%",
    },
  },
  dark: {
    background: {
      DEFAULT: "0 0% 4%",
    },
    foreground: {
      DEFAULT: "0 0% 96%",
    },
    border: {
      DEFAULT: "0 0% 15%",
    },
    input: {
      DEFAULT: "0 0% 15%",
    },
    ring: {
      DEFAULT: "0 0% 96%",
    },
    overlay: {
      DEFAULT: "0 0% 0%",
    },
  },
}

export const themeColorsLight: ThemeColors = {
  ...base.light,
  card: {
    DEFAULT: "0 0% 98%",
    foreground: "0 0% 0%",
  },

  popover: {
    DEFAULT: "0 0% 98%",
    foreground: "0 0% 0%",
  },

  default: {
    DEFAULT: "216 12.2% 83.9%",
    foreground: "240 5.9% 10%",
  },

  muted: {
    DEFAULT: "0 0% 83%",
    foreground: "0 0% 25%",
  },

  accent: {
    DEFAULT: "0 0% 90%",
    foreground: "0 0% 0%",
  },

  primary: {
    DEFAULT: "29 100% 52%",
    foreground: "0 0% 100%",
  },

  secondary: {
    DEFAULT: "33 35% 50%",
    foreground: "0 0% 100%",
  },

  info: {
    DEFAULT: "216 76% 52%",
    foreground: "219 64% 43%",
    "foreground-filled": "0 0% 100%",
  },

  warning: {
    DEFAULT: "45 92% 47%",
    foreground: "28 73% 26%",
    "foreground-filled": "0 0% 0%",
  },

  danger: {
    DEFAULT: "0 72% 43%",
    foreground: "0 82% 31%",
    "foreground-filled": "0 0% 100%",
  },

  success: {
    DEFAULT: "140 76% 38%",
    foreground: "140 49% 20%",
    "foreground-filled": "0 0% 100%",
  },
}

export const themeColorsDark: ThemeColors = {
  ...base.dark,
  card: {
    DEFAULT: "0 0% 7%",
    foreground: "0 0% 96%",
  },

  popover: {
    DEFAULT: "0 0% 7%",
    foreground: "0 0% 96%",
  },

  default: {
    DEFAULT: "240 3.7% 15.9%",
    foreground: "0 0% 98%",
  },

  muted: {
    DEFAULT: "0 0% 15%",
    foreground: "0 0% 64%",
  },

  accent: {
    DEFAULT: "0 0% 12%",
    foreground: "0 0% 96%",
  },

  primary: {
    DEFAULT: "29 100% 52%",
    foreground: "0 0% 100%",
  },

  secondary: {
    DEFAULT: "33 35% 50%",
    foreground: "0 0% 100%",
  },

  info: {
    DEFAULT: "216 76% 52%",
    foreground: "207 70% 80%",
    "foreground-filled": "0 0% 100%",
  },

  danger: {
    DEFAULT: "0 72% 43%",
    foreground: "0 79% 79%",
    "foreground-filled": "0 0% 100%",
  },

  warning: {
    DEFAULT: "45 92% 47%",
    foreground: "53 98% 77%",
    "foreground-filled": "0 0% 0%",
  },

  success: {
    DEFAULT: "140 76% 38%",
    foreground: "140 71% 82%",
    "foreground-filled": "0 0% 100%",
  },
}

export const defaultColors = {
  light: themeColorsLight,
  dark: themeColorsDark,
}
