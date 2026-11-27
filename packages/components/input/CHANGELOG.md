# @mijn-ui-react/input

## 0.6.1

### Patch Changes

- e7050f8: Republished through npm trusted publishing from the GitHub `npm` environment. No code changes. This first publish validates the new trusted-publisher setting on every package.
- Updated dependencies [e7050f8]
  - @mijn-ui/react-label@0.4.4

## 0.6.0

### Minor Changes

- e1d8920: Add a `bare` mode to Input, and stop forcing an `id` and an empty
  `placeholder` onto inputs that have no label.
  - **`bare`** (new): `<Input bare … />` renders the `<input>` alone — no
    wrapper `<div>`, no generated `id`, no `placeholder=""` — so it can replace a
    plain `<input>` in a form that already lays out and labels its own fields.
    Every prop passes through to the input (`id`, `placeholder`, `name`, `ref`,
    …). The wrapper's disabled look (`opacity-50`, not-allowed cursor) moves
    onto the input. `bare` is ignored when `startIcon`, `endIcon` or `label` is
    set, because those are positioned against the wrapper. Without `bare`
    nothing changes structurally: the wrapper stays.
  - **Attribute change (no visual change)**: a wrapped input **without a
    `label`** no longer gets a generated `id` or `placeholder=""`. Both existed
    only for the floating label (the `htmlFor` link, and `:placeholder-shown`
    for its position), and are still set whenever `label` is. Your own `id` and
    `placeholder` are always passed through. If you styled an unlabelled
    `Input` with `:placeholder-shown`, pass `placeholder=""` yourself.
  - Removes two classes that compiled to nothing: `rtl:left` on the floating
    label and `border-b-sm` on the `underline` variant (the `border-b` next to
    it already draws that border). No visual change.

### Patch Changes

- 7978b2c: Components that draw a border now name its colour (`border-outline-default`)
  instead of relying on the `* { border-color }` rule in `theme.css`'s base
  layer: Button (`default` variant, `filled` + `default`, `outlined` +
  `default`), Badge (the same three plus `modern` + `default`), Input
  (`default` and `underline`), Textarea, Tabs (trigger underline), Pagination
  (current page), Calendar (previous / next month buttons) and Accordion
  (`outline` items, `solid` frame and dividers; the `solid` divider class was
  misspelt `divide-y-outline-default` and generated nothing).

  With `theme.css`'s base rule in place nothing looks different. Apps that
  load the components without that rule used to get Tailwind v4's
  `currentColor` borders (dark text-coloured outlines) on these components,
  and apps whose own base rule sets a different border colour used to have it
  show through on them; both now get the theme's `outline-default`.

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

- b948a13: Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
  read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
  `mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
  older `theme.css` they would lose their corner radius, shadow and focus ring.
- Updated dependencies [071215f]
- Updated dependencies [b948a13]
  - @mijn-ui/react-label@0.4.3

## 0.5.0

### Minor Changes

- 19ac9d1: Align components with Figma design system and add new components
  - **accordion**: add `size` variant (sm/md/lg); rename `default` → `outline`, `contained` → `solid`/`plain`
  - **badge**: add Figma-aligned variants (`solid`, `tonal`, `modern`); add `pill` radius
  - **button**: add Figma-aligned composite variants (`default`, `brand`, `error` and their `-plain`/`-outline` forms); add `default` size
  - **input**: add `size` variant (`default`/`lg`); add `aria-invalid` border/ring styling
  - **breadcrumb**: new component
  - **toast**: new component

### Patch Changes

- @mijn-ui/react-label@0.4.2

## 0.4.3

### Patch Changes

- 38a28af: Fix some styling issue

## 0.4.2

### Patch Changes

- feb210a: add data slot prop
- Updated dependencies [feb210a]
  - @mijn-ui/react-label@0.4.2

## 0.4.1

### Patch Changes

- 910e03f: update dependencies
- Updated dependencies [910e03f]
  - @mijn-ui/react-label@0.4.1

## 0.4.0

### Minor Changes

- 3cb12cf: Fix class merging issuing

### Patch Changes

- Updated dependencies [3cb12cf]
  - @mijn-ui/react-label@0.4.0

## 0.3.0

### Minor Changes

- a9b1337: Tailwind v4 integration and reorganize packages theme structure

### Patch Changes

- Updated dependencies [a9b1337]
  - @mijn-ui/react-label@0.3.0

## 0.2.0

### Minor Changes

- 30f66d5: Integrate new design

### Patch Changes

- Updated dependencies [30f66d5]
  - @mijn-ui/react-label@0.2.0

## 0.1.0

### Minor Changes

- 284b531: Beta Release

### Patch Changes

- Updated dependencies [284b531]
  - @mijn-ui/react-label@0.1.0

## 0.0.17

### Patch Changes

- Updated dependencies [1bcaa59]
  - @mijn-ui/react-theme@0.0.13
  - @mijn-ui/react-label@0.0.16
  - @mijn-ui/react-core@0.0.8

## 0.0.16

### Patch Changes

- 2e00de6: Fix focus ring styles issues and refactor.
  - @mijn-ui/react-label@0.0.15

## 0.0.15

### Patch Changes

- 562f35f: Input now has two variants, filled and underline.
- Updated dependencies [562f35f]
  - @mijn-ui/react-theme@0.0.12
  - @mijn-ui/react-label@0.0.15
  - @mijn-ui/react-core@0.0.7

## 0.0.14

### Patch Changes

- Updated dependencies [32b1f0a]
  - @mijn-ui/react-theme@0.0.11
  - @mijn-ui/react-label@0.0.14
  - @mijn-ui/react-core@0.0.6

## 0.0.13

### Patch Changes

- Updated dependencies [a7594eb]
- Updated dependencies [6777e35]
  - @mijn-ui/react-core@0.0.5
  - @mijn-ui/react-theme@0.0.10
  - @mijn-ui/react-label@0.0.13

## 0.0.12

### Patch Changes

- 3a9d89e: Update peer dependencies
- Updated dependencies [3a9d89e]
  - @mijn-ui/react-label@0.0.12

## 0.0.11

### Patch Changes

- 7b1ba9f: Update imports
- 9ffa4c1: Beta release.
- Updated dependencies [7b1ba9f]
- Updated dependencies [9ffa4c1]
- Updated dependencies [7b1ba9f]
- Updated dependencies [4256d76]
  - @mijn-ui/react-label@0.0.11
  - @mijn-ui/react-utilities@0.0.9
  - @mijn-ui/react-theme@0.0.9
  - @mijn-ui/react-core@0.0.4

## 0.0.10

### Patch Changes

- 696a2e3: Add classNames support.
- Updated dependencies [d32f792]
- Updated dependencies [696a2e3]
  - @mijn-ui/react-theme@0.0.8
  - @mijn-ui/react-label@0.0.10

## 0.0.9

### Patch Changes

- f524463: Update peer dependendicies.
- Updated dependencies [f524463]
  - @mijn-ui/react-label@0.0.9
  - @mijn-ui/react-core@0.0.3

## 0.0.8

### Patch Changes

- ab36c61: extract core functionalities from utils.
- Updated dependencies [d8a420b]
- Updated dependencies [ab36c61]
- Updated dependencies [82b681d]
  - @mijn-ui/react-core@0.0.2
  - @mijn-ui/react-utilities@0.0.8
  - @mijn-ui/react-label@0.0.8
  - @mijn-ui/react-theme@0.0.7

## 0.0.7

### Patch Changes

- 051449d: Replace styles with theme package's styles
- Updated dependencies [9444ec9]
- Updated dependencies [add6e87]
- Updated dependencies [88d96e8]
- Updated dependencies [d961021]
- Updated dependencies [49f9bf7]
- Updated dependencies [051449d]
- Updated dependencies [fd30e1a]
- Updated dependencies [92be87c]
- Updated dependencies [2b64600]
- Updated dependencies [9fe766a]
- Updated dependencies [2595897]
- Updated dependencies [0131172]
  - @mijn-ui/react-utilities@0.0.7
  - @mijn-ui/react-theme@0.0.6
  - @mijn-ui/react-label@0.0.7

## 0.0.6

### Patch Changes

- 4ff5f86: Add ReadMeFile and keywords
- Updated dependencies [4ff5f86]
  - @mijn-ui/react-label@0.0.6
  - @mijn-ui/react-utilities@0.0.6

## 0.0.5

### Patch Changes

- 73a2336: Update theme variable name `neutral` to `muted` which is conflicting with the tailwind neutral color utilities
- Updated dependencies [73a2336]
  - @mijn-ui/react-label@0.0.5
  - @mijn-ui/react-utilities@0.0.5

## 0.0.4

### Patch Changes

- 4bc34e6: Fix release source files doesn't get included issues.
- Updated dependencies [4bc34e6]
  - @mijn-ui/react-label@0.0.4
  - @mijn-ui/react-utilities@0.0.4

## 0.0.3

### Patch Changes

- cbc483f: Rename packages
- Updated dependencies [cbc483f]
  - @mijn-ui/react-label@0.0.3
  - @mijn-ui/react-utilities@0.0.3

## 0.0.2

### Patch Changes

- 159f23c: Add input package
- Updated dependencies [62a87c2]
- Updated dependencies [6765e19]
- Updated dependencies [c7c2e97]
  - @mijn-ui-react/utilities@0.0.2
  - @mijn-ui-react/label@0.0.2
