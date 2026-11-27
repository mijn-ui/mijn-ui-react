# @mijn-ui/react-breadcrumb

## 0.2.3

### Patch Changes

- e7050f8: Republished through npm trusted publishing from the GitHub `npm` environment. No code changes. This first publish validates the new trusted-publisher setting on every package.

## 0.2.2

### Patch Changes

- b948a13: Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
  read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
  `mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
  older `theme.css` they would lose their corner radius, shadow and focus ring.

## 0.2.1

### Patch Changes

- 39652e2: Fix three components that styled themselves with class names the theme does not
  define. Each of these builds green, passes lint and types, and then renders
  wrong — an undefined custom property makes an invalid `hsl()`, which the browser
  discards rather than reporting.
  - **Toast** used `bg-bg-primary` (6 occurrences) and `text-fg-primary` (2). The
    palette has no `primary` tier — it is `default` / `secondary` / `tertiary` /
    `accent` / `inverse` — so every toast lost its surface colour and its title
    colour. Now `bg-bg-default-alt` and `text-fg-default`, matching the popover,
    which is the same kind of raised floating surface.
  - **Breadcrumb** used `text-fg-primary` for the current page and for the link
    hover state, so neither took effect. Now `text-fg-default`.
  - **Progress** had `bg-bg-brandsize-full` — `bg-bg-brand` and `size-full` fused
    into one unparseable class, so the indicator had neither a fill colour nor a
    size and the bar was invisible at every value. Now two classes.

## 0.2.0

### Minor Changes

- 19ac9d1: Align components with Figma design system and add new components
  - **accordion**: add `size` variant (sm/md/lg); rename `default` → `outline`, `contained` → `solid`/`plain`
  - **badge**: add Figma-aligned variants (`solid`, `tonal`, `modern`); add `pill` radius
  - **button**: add Figma-aligned composite variants (`default`, `brand`, `error` and their `-plain`/`-outline` forms); add `default` size
  - **input**: add `size` variant (`default`/`lg`); add `aria-invalid` border/ring styling
  - **breadcrumb**: new component
  - **toast**: new component
