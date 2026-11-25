---
"@mijn-ui/react-core": minor
"@mijn-ui/react": minor
---

`theme.css` now defines both the light and the dark tokens inside Tailwind's
`theme` layer (the lowest of `theme, base, components, utilities`). Before,
the `.dark { … }` block was unlayered, so it beat every layered rule an app
wrote: an app that re-themed `--color-bg-brand` (or any other token) under
`.dark` in `@layer base` kept getting Mijn UI's orange in dark mode.

What changes for apps:

- **Your dark overrides now win** wherever you write them: under `.dark` in
  `@layer theme` (after the import), `@layer base`, `@layer components`, or
  unlayered. Light overrides in `@theme` keep working as before.
- **The import order no longer matters**: importing `theme.css` before
  `tailwindcss` used to make app overrides lose in dark mode; the tokens now
  land in the `theme` layer either way.
- **A workaround can go**: re-importing `theme.css` into a layer
  (`@import "@mijn-ui/react-core/theme.css" layer(theme)`) is no longer
  needed. It keeps working if you leave it.
- **One behaviour to check**: a token you override on `:root` inside a layer
  (`@layer base { :root { --color-bg-brand: … } }`) without a matching `.dark`
  override now applies in dark mode too, where Mijn UI's dark value used to
  win. Add a `.dark` override next to it, or move the light value into
  `@theme`, which keeps Mijn UI's dark value.
