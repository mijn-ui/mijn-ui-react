import { create } from "@storybook/theming/create"
/* eslint-disable */
// @ts-expect-error
import logoUrl from "../public/logo.png"

export default create({
  base: "dark",
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  brandTitle: "Mijn UI",
  brandUrl: "https://mijnui.com",
  brandImage: process.env.NODE_ENV === "production" ? logoUrl : "/logo.png",
  brandTarget: "_self",
})
