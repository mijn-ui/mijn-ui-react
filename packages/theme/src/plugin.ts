/* eslint-disable */
import { kebabCase, mapKeys, omit } from "@mijn-ui/react-utilities"
import deepmerge from "deepmerge"
import plugin from "tailwindcss/plugin.js"
import { animations } from "./animations"
import { defaultColors } from "./colors"
import { darkLayout, defaultLayout, lightLayout } from "./layout"
import {
  ConfigTheme,
  ConfigThemes,
  DefaultThemeType,
  MijnUIPluginConfig,
} from "./types"
import { baseStyles, flattenThemeObject, isBaseTheme } from "./utils"

const DEFAULT_PREFIX = "mijnui"

const resolveConfig = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
) => {
  const resolved: {
    variants: { name: string; definition: string[] }[]
    utilities: Record<string, Record<string, any>>
    colors: Record<string, string>
  } = {
    variants: [],
    utilities: {},
    colors: {},
  }

  for (const [themeName, { extend, layout, colors }] of Object.entries(
    themes,
  )) {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`
    const scheme =
      themeName === "light" || themeName === "dark" ? themeName : extend

    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`
    }

    resolved.utilities[cssSelector] = scheme
      ? {
          "color-scheme": scheme,
        }
      : {}

    const flatColors = flattenThemeObject(colors) as Record<string, string>
    const flatLayout = layout ? mapKeys(layout, (_, key) => kebabCase(key)) : {}

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    })

    /**
     * Colors
     */
    for (const [colorName, colorValue] of Object.entries(flatColors)) {
      if (!colorValue) return

      try {
        const mijnuiColorVariable = `--${prefix}-${colorName}`

        resolved.utilities[cssSelector]![mijnuiColorVariable] = colorValue

        resolved.colors[colorName] = `hsl(var(${mijnuiColorVariable}))`
      } catch (error: any) {
        console.log(error, error.message)
      }
    }

    for (const [key, value] of Object.entries(flatLayout)) {
      if (!value) return

      const layoutVariablePrefix = `--${prefix}-${key}`

      if (typeof value === "object") {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          const nestedLayoutVariable = `${layoutVariablePrefix}-${nestedKey}`

          resolved.utilities[cssSelector]![nestedLayoutVariable] = nestedValue
        }
      } else {
        const formattedValue =
          layoutVariablePrefix.includes("opacity") && typeof value === "number"
            ? value.toString().replace(/^0\./, ".")
            : value

        resolved.utilities[cssSelector]![layoutVariablePrefix] = formattedValue
      }
    }
  }
  return resolved
}

const corePlugin = (
  themes: ConfigThemes = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix)

  return plugin(
    ({ addBase, addUtilities, addVariant }) => {
      addBase({
        [":root [data-theme]"]: {
          ...baseStyles(prefix),
        },
      })

      addUtilities({ ...resolved?.utilities })

      resolved?.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition)
      })
    },
    {
      theme: {
        extend: {
          colors: {
            ...resolved?.colors,
          },

          borderRadius: {
            "2xs": `var(--${prefix}-radius-2xs)`,
            xs: `var(--${prefix}-radius-xs)`,
            sm: `var(--${prefix}-radius-sm)`,
            md: `var(--${prefix}-radius-md)`,
            lg: `var(--${prefix}-radius-lg)`,
            xl: `var(--${prefix}-radius-xl)`,
            "2xl": `var(--${prefix}-radius-2xl)`,
          },

          boxShadow: {
            xs: `var(--${prefix}-box-shadow-xs)`,
            sm: `var(--${prefix}-box-shadow-sm)`,
            md: `var(--${prefix}-box-shadow-md)`,
            lg: `var(--${prefix}-box-shadow-lg)`,
            xl: `var(--${prefix}-box-shadow-xl)`,
            "2xl": `var(--${prefix}-box-shadow-2xl)`,
            "3xl": `var(--${prefix}-box-shadow-3xl)`,
          },

          ...animations,
        },
      },
    },
  )
}

export const mijnui = (
  config: MijnUIPluginConfig = {},
): ReturnType<typeof plugin> => {
  const {
    themes: themeObject = {},
    defaultTheme = "light",
    layout: userLayout,
    prefix: defaultPrefix = DEFAULT_PREFIX,
    defaultExtendTheme = "light",
  } = config

  const userLightColors = themeObject.light?.colors || {}
  const userDarkColors = themeObject.dark?.colors || {}

  const defaultLayoutObj =
    userLayout && typeof userLayout === "object"
      ? deepmerge(defaultLayout, userLayout)
      : defaultLayout

  const baseLayouts = {
    light: {
      ...defaultLayoutObj,
      ...lightLayout,
    },
    dark: {
      ...defaultLayoutObj,
      ...darkLayout,
    },
  }

  let otherThemes = omit(themeObject, ["light", "dark"]) || {}

  Object.entries(otherThemes).forEach(
    ([themeName, { extend, colors, layout }]) => {
      const baseTheme =
        extend && isBaseTheme(extend) ? extend : defaultExtendTheme

      if (colors && typeof colors === "object") {
        otherThemes[themeName].colors = deepmerge(
          defaultColors[baseTheme],
          colors,
        )
      }
      if (layout && typeof layout === "object") {
        otherThemes[themeName].layout = deepmerge(
          extend ? baseLayouts[extend] : defaultLayoutObj,
          layout,
        )
      }
    },
  )

  const light: ConfigTheme = {
    layout: deepmerge(baseLayouts.light, themeObject?.light?.layout || {}),
    colors: deepmerge(defaultColors.light, userLightColors),
  }

  const dark: ConfigTheme = {
    layout: deepmerge(baseLayouts.dark, themeObject?.dark?.layout || {}),
    colors: deepmerge(defaultColors.dark, userDarkColors),
  }

  const themes = {
    light,
    dark,
    ...otherThemes,
  }

  return corePlugin(themes, defaultTheme, defaultPrefix)
}
