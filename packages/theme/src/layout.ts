import { LayoutTheme } from "./types"

export const defaultLayout: LayoutTheme = {
  dividerWeight: "1px",
  disabledOpacity: ".5",
  fontSize: {
    tiny: "0.75rem",
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
  },
  lineHeight: {
    tiny: "1rem",
    small: "1.25rem",
    medium: "1.5rem",
    large: "1.75rem",
  },
  radius: {
    small: "4px",
    medium: "8px",
    large: "12px",
  },
  borderWidth: {
    small: "1px",
    medium: "2px",
    large: "3px",
  },
  boxShadow: {
    small: "0px 0px 5px 0px rgb(0 0 0 / 0.1)",
    medium: "0px 0px 15px 0px rgb(0 0 0 / 0.15)",
    large: "0px 0px 30px 0px rgb(0 0 0 / 0.2)",
  },
}

export const lightLayout: LayoutTheme = {
  hoverOpacity: ".8",
}

export const darkLayout: LayoutTheme = {
  hoverOpacity: ".8",
  boxShadow: {
    small: "0px 0px 5px 0px rgb(0 0 0 / 0.2)",
    medium: "0px 0px 15px 0px rgb(0 0 0 / 0.25)",
    large: "0px 0px 30px 0px rgb(0 0 0 / 0.3)",
  },
}
