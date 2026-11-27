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

Move to tailwind-variants v4, and use its class merging everywhere.

- The `tailwind-variants` peer dependency is now `^4.0.0`.
- `tailwind-merge` is no longer a peer dependency. `cn` now merges classes with tailwind-variants' own engine, so an app ships one merge engine instead of two. `cn` gives the same result for every class mijn-ui uses. One difference for arbitrary font values without a label: they now follow Tailwind 4, so `font-[Inter]` is a font family and `font-[700]` a weight.
- Components now require `@mijn-ui/react-core` `^0.7.0`.
- `extendVariants` no longer accepts `twMergeConfig`, and throws if it is given one.

**Migration**

1. Run `pnpm add tailwind-variants@^4`. Until you do, pnpm warns about an unmet peer dependency.
2. If your app doesn't import `tailwind-merge` itself, you can remove it. If it does, either keep it (your app then ships two merge engines) or alias it to `tailwind-variants` as the upstream guide describes.
3. If your app has its own `tv()` recipes, check them against the [tailwind-variants v3 → v4 guide](https://github.com/heroui-inc/tailwind-variants/blob/main/.docs/migrations/v3-to-v4.md). The changes most likely to matter:
   - `twMergeConfig` must be imported from `tailwind-variants/config`. Passing it through the default import throws when the recipe is defined.
   - Unknown keys in `variants`, `compoundVariants`, `defaultVariants` and slot names are now compile errors.
   - An empty class list returns `""` instead of `undefined`. This applies to `tv()`, `cn()`, `cx()` and mijn-ui's exported `*Styles` recipes.
   - `cn("a", 0)` from tailwind-variants now returns `"a"`.
