# @mijn-ui/react-core

## 0.6.0

### Minor Changes

- c17e9a0: The focus ring no longer leaves a dark band around controls on raised
  surfaces in dark mode.

  It was a box-shadow ring with a 2px `ring-offset-bg-default` gap: a band
  painted in the page background colour, so a focused button or input inside a
  card, popover or dialog (`bg-default-alt`) got a near-black ring between
  itself and the brand ring. The ring is now an outline from a new
  `mijn-focus-ring` utility in `theme.css`: same geometry (2px wide, 2px away
  from the control), same colours, but the gap is transparent and shows
  whatever surface the control is on.

  Used by Button, Badge, Input, Textarea, Select (trigger), Slider (thumb),
  Radio Group (item), Pagination, Calendar (navigation and day buttons), and the
  close / action buttons of Dialog, Alert Dialog and Popover.

  What you may notice:
  - **Dark mode, raised surfaces**: the black band around focused controls is
    gone. On the page background nothing changes.
  - **Light mode on a tinted surface** (e.g. `bg-bg-secondary`): the gap shows
    the tint instead of a white band.
  - **Forced-colours / Windows High Contrast**: the ring is now visible (browsers
    drop box-shadow there, not outlines).
  - **className overrides**: the ring colour still follows `focus-visible:ring-*`
    colour classes. `focus-visible:ring-offset-*` and `focus-visible:ring-0` no
    longer affect these components; use `focus-visible:outline-none` to remove
    the ring.

  Use `focus-visible:mijn-focus-ring` on your own controls to match.

- 1025439: `theme.css` no longer redefines Tailwind's own radius and shadow scales.
  Importing it used to change `rounded-xs` … `rounded-2xl` and `shadow-xs` …
  `shadow-2xl` across your whole app, not just inside Mijn UI components.

  Mijn UI's scale now lives under its own names, `--mijn-radius-{2xs,xs,sm,base,lg,xl,2xl}`
  and `--mijn-shadow-{xs,sm,md,lg,xl,2xl,3xl}`, with the same values as before.
  Components use them as `rounded-(--mijn-radius-lg)` /
  `shadow-(--mijn-shadow-sm)`, a form tailwind-merge resolves against a
  `rounded-*` / `shadow-*` you pass in `className`, so **Mijn UI components look
  exactly as they did**. Override the `--mijn-*` tokens in your `@theme` to
  re-shape every component at once.

  **What changes in your own code** (classes you write yourself, which now get
  Tailwind's defaults again):

  | Class         | Before (Mijn UI)                             | Now (Tailwind default)                                    |
  | ------------- | -------------------------------------------- | --------------------------------------------------------- |
  | `rounded-xs`  | 4px                                          | 2px                                                       |
  | `rounded-sm`  | 6px                                          | 4px                                                       |
  | `rounded-lg`  | 12px                                         | 8px                                                       |
  | `rounded-xl`  | 16px                                         | 12px                                                      |
  | `rounded-2xl` | 20px                                         | 16px                                                      |
  | `shadow-xs`   | `0 1px 2px` slate 5%                         | `0 1px 2px 0` black 5% (same shape)                       |
  | `shadow-sm`   | `0 1px 3px` slate 10%, `0 1px 2px` slate 6%  | `0 1px 3px 0` black 10%, `0 1px 2px -1px` black 10%       |
  | `shadow-md`   | `0 4px 8px` slate 10%, `0 2px 4px` slate 6%  | `0 4px 6px -1px` black 10%, `0 2px 4px -2px` black 10%    |
  | `shadow-lg`   | `0 12px 16px` slate 8%, `0 4px 6px` slate 3% | `0 10px 15px -3px` black 10%, `0 4px 6px -4px` black 10%  |
  | `shadow-xl`   | `0 20px 24px` slate 8%, `0 8px 8px` slate 3% | `0 20px 25px -5px` black 10%, `0 8px 10px -6px` black 10% |
  | `shadow-2xl`  | `0 24px 48px` slate 18%                      | `0 25px 50px -12px` black 25%                             |

  Unchanged: `rounded-md`, `rounded-3xl` and bare `rounded` / `shadow`, which
  Mijn UI never redefined, and `rounded-2xs`, `rounded-base` and `shadow-3xl`,
  which Tailwind does not have and `theme.css` still adds. `rounded-full` is
  Tailwind's own again (`calc(infinity * 1px)` instead of `9999px`; still fully
  round).

  To keep the old values in your own code, put them back in your `@theme`
  (Mijn UI components are not affected either way):

  ```css
  @theme {
    --radius-xs: 0.25rem;
    --radius-sm: 0.375rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.25rem;
    --shadow-xs: 0 1px 2px rgba(16, 24, 40, 0.05);
    --shadow-sm:
      0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
    --shadow-md:
      0 4px 8px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06);
    --shadow-lg:
      0 12px 16px rgba(16, 24, 40, 0.08), 0 4px 6px rgba(16, 24, 40, 0.03);
    --shadow-xl:
      0 20px 24px rgba(16, 24, 40, 0.08), 0 8px 8px rgba(16, 24, 40, 0.03);
    --shadow-2xl: 0 24px 48px rgba(16, 24, 40, 0.18);
  }
  ```

  To match a Mijn UI component in your own markup, use the namespaced tokens:
  `rounded-(--mijn-radius-lg) shadow-(--mijn-shadow-sm)`.

- e4df001: `theme.css` now defines both the light and the dark tokens inside Tailwind's
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

### Patch Changes

- 24add51: Fix `createTVUnstyledSlots` / `useTVUnstyled` dropping a slot's variant props
  whenever a `className` was passed alongside them. A call such as
  `content({ position: "popper", className })` used to drop the whole props
  object, so the variant classes disappeared as soon as a consumer set
  `className` or the matching `classNames` slot: Select's content and viewport
  lost their `popper` classes, DropdownMenu's `Item` / `Label` / `SubTrigger`
  lost `inset`, Pagination lost the `active` page style and Autocomplete the
  `selected` item style. Only
  `className` (and tailwind-variants' `class` alias) is now split off; the
  remaining variant props reach the slot function, and the user classes are
  merged after the variant classes so they still win conflicts. `unstyled` still
  strips the default and variant classes and keeps only the user classes.

  Wrappers that re-applied the popper / inset classes by hand as a workaround
  can drop them.

## 0.5.1

### Patch Changes

- 445df5b: Add `@mijn-ui/react-charts` — `BarChart`, `GroupedBarChart`, `DonutChart`, `Sparkline`, and `ChartLegend` — plus categorical hue tokens in the core theme, and export the new package from the umbrella.

## 0.5.0

### Minor Changes

- 910e03f: Add accent color in css theme.

### Patch Changes

- 4881375: Update theme subtle colors

## 0.4.0

### Minor Changes

- 3cb12cf: Fix class merging issuing

## 0.3.0

### Minor Changes

- a9b1337: Tailwind v4 integration and reorganize packages theme structure

## 0.1.0

### Minor Changes

- 29bd2ad: Beta Release.

## 0.0.8

### Patch Changes

- Updated dependencies [1bcaa59]
  - @mijn-ui/react-theme@0.0.13

## 0.0.7

### Patch Changes

- Updated dependencies [562f35f]
  - @mijn-ui/react-theme@0.0.12

## 0.0.6

### Patch Changes

- Updated dependencies [32b1f0a]
  - @mijn-ui/react-theme@0.0.11

## 0.0.5

### Patch Changes

- a7594eb: remove @mijn-ui/react-theme from dependencies.
- Updated dependencies [6777e35]
  - @mijn-ui/react-theme@0.0.10

## 0.0.4

### Patch Changes

- 9ffa4c1: Beta release.
- 7b1ba9f: Update imports and remove unnecessary types
- Updated dependencies [9ffa4c1]
- Updated dependencies [4256d76]
  - @mijn-ui/react-theme@0.0.9

## 0.0.3

### Patch Changes

- f524463: Update peer dependendicies.

## 0.0.2

### Patch Changes

- d8a420b: Add core package
- ab36c61: extract core functionalities from utils.
- Updated dependencies [ab36c61]
- Updated dependencies [82b681d]
  - @mijn-ui/react-utilities@0.0.8
