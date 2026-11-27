---
"@mijn-ui/react-core": minor
"@mijn-ui/react": minor
"@mijn-ui/react-accordion": minor
"@mijn-ui/react-alert": minor
"@mijn-ui/react-alert-dialog": minor
"@mijn-ui/react-autocomplete": minor
"@mijn-ui/react-avatar": minor
"@mijn-ui/react-badge": minor
"@mijn-ui/react-breadcrumb": minor
"@mijn-ui/react-button": minor
"@mijn-ui/react-calendar": minor
"@mijn-ui/react-card": minor
"@mijn-ui/react-charts": minor
"@mijn-ui/react-checkbox": minor
"@mijn-ui/react-command": minor
"@mijn-ui/react-dialog": minor
"@mijn-ui/react-dropdown-menu": minor
"@mijn-ui/react-input": minor
"@mijn-ui/react-label": minor
"@mijn-ui/react-pagination": minor
"@mijn-ui/react-popover": minor
"@mijn-ui/react-progress": minor
"@mijn-ui/react-radio-group": minor
"@mijn-ui/react-scroll-area": minor
"@mijn-ui/react-segmented-control": minor
"@mijn-ui/react-select": minor
"@mijn-ui/react-separator": minor
"@mijn-ui/react-skeleton": minor
"@mijn-ui/react-slider": minor
"@mijn-ui/react-sonner": minor
"@mijn-ui/react-switch": minor
"@mijn-ui/react-table": minor
"@mijn-ui/react-tabs": minor
"@mijn-ui/react-textarea": minor
"@mijn-ui/react-toast": minor
"@mijn-ui/react-tooltip": minor
---

Move to tailwind-variants v4. The `tailwind-variants` peer dependency is now `^4.0.0`.

**Migration:** run `pnpm add tailwind-variants@^4` in your app. Your own `tv()` recipes keep working, with two differences: v4 rejects unknown keys in `variants`, `compoundVariants`, `defaultVariants` and slot names at compile time, and an empty class list now returns `""` instead of `undefined`. `extendVariants` no longer accepts `twMergeConfig`; tailwind-variants v4 only takes a custom merge config from `tailwind-variants/config`.

`tailwind-merge` is still a peer dependency of `@mijn-ui/react-core`, whose `cn` uses it.
