---
"@mijn-ui/react-sonner": patch
---

Make the toaster's slot classes actually apply over sonner's own CSS.

Sonner injects its stylesheet outside any cascade layer, and unlayered rules
beat every Tailwind utility in `@layer utilities` regardless of specificity.
So most slot classes lost to sonner's defaults: the title stayed at weight 500
under `font-semibold`, the action button rendered black-on-white (sonner's
inverse) instead of brand, and the toast kept sonner's 8px radius and shadow.
0.7 fixed only the description's colour. Every class that competes with a
sonner property is now `!important`; a new test reads sonner's stylesheet and
fails if any slot class would lose again.

What you will see change, matching what the classes always asked for:

- **Title**: `font-semibold` (600, was 500), `text-sm` line height (20px, was
  21px). Its colour is no longer set — it inherits the toast's, as sonner
  intends, so `richColors` tints it.
- **Description**: `text-sm` line height (20px, was 19.6px).
- **Toast**: the theme's `--mijn-radius-lg` (12px) and `--mijn-shadow-lg`
  (were sonner's 8px radius and light shadow). Its keyboard focus indicator is
  now the theme's `mijn-focus-ring` in `ring-outline-brand` (the shadow
  replaces sonner's grey focus shadow). Background, text and border colours
  still come from sonner's variables, so `richColors` keeps working.
- **Action button**: `bg-brand` / `on-bg-brand`, `rounded-md`, `px-2.5`
  (was sonner's inverse colours, 4px radius, 8px padding).
- **Cancel button**: `bg-secondary` / `fg-secondary`, `rounded-md`, `px-2.5`.
- **Close button**: `bg-default-alt`, `fg-tertiary`, `outline-secondary`
  border; on hover `bg-secondary` and `fg-default` (sonner's hover painted it
  near-white, which in dark mode left white text on a white button). With
  `richColors` the close button now stays neutral instead of taking the
  toast's tint.

**Info colour.** With `richColors`, the `info` toast used the brand-subtle
tier, so in an app whose brand is green it looked exactly like `success`. It
now uses the categorical blue tier (`bg-blue-subtle` / `on-bg-blue-subtle` /
`outline-blue-subtle`): **rich-colour info toasts are blue** in every theme
(title contrast 8.5:1 light, 10.5:1 dark). Success, warning and error are
unchanged. To keep the old look, set `--info-bg` / `--info-text` /
`--info-border` on the toaster's `style`.

To override one of these properties in your own `classNames`, add `!` too
(`title: "font-bold!"`); see the README.
