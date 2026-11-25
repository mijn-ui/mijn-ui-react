# @mijn-ui/react-tabs

## 0.4.3

### Patch Changes

- 071215f: Align every `@radix-ui/*` dependency on one release set (the 2026-10-12 set:
  Dialog 1.3.1, AlertDialog 1.2.1, Popover 1.3.1, Select 2.4.1, DropdownMenu
  2.2.1, Tooltip 1.4.1, Tabs 1.2.1, RadioGroup 1.5.1, ...).

  The packages declared floors from different Radix lines (`^1.1.x` for most,
  `^1.2.12` for Tooltip, `^1.3.8` for SegmentedControl's RadioGroup), and Radix
  pins its internal packages exactly. An app could therefore end up with
  `@radix-ui/react-alert-dialog@1.2.1` (which pins `react-dialog@1.3.1`) next
  to a locked `react-dialog@1.1.x`, i.e. two copies of DismissableLayer and
  FocusScope and two independent layer stacks: a Select or DropdownMenu opened
  inside a Dialog could close the Dialog. With every floor raised to the same
  set, `@mijn-ui/react` now installs exactly one copy of each Radix internal.

  If your app also depends on `@radix-ui/*` packages directly, update them to
  the same set (or run `npm dedupe` / `pnpm dedupe`), otherwise you can still
  end up with two copies.

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

- 9c8817b: Fix the active tab having no colour, and give triggers a visible focus ring.
  - The active trigger used `text-fg-brand-emphasis`, a token `theme.css` never
    defined, so the class compiled to nothing and the active tab kept the
    inactive `text-fg-secondary` colour. It now uses `text-fg-brand` (also on
    hover), so **the active tab renders in the brand colour** — a visible change.
  - Triggers only changed background on keyboard focus. They now also draw the
    theme's `mijn-focus-ring` (a 2px brand outline with a transparent 2px gap,
    as every control in 0.8), coloured by `ring-outline-brand`.

- b948a13: Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
  read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
  `mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
  older `theme.css` they would lose their corner radius, shadow and focus ring.

## 0.4.2

### Patch Changes

- feb210a: add data slot prop

## 0.4.1

### Patch Changes

- 910e03f: update dependencies

## 0.4.0

### Minor Changes

- 3cb12cf: Fix class merging issuing

## 0.3.0

### Minor Changes

- a9b1337: Tailwind v4 integration and reorganize packages theme structure

## 0.2.1

### Patch Changes

- Updated dependencies [82f9206]
  - @mijn-ui/react-hooks@0.0.19

## 0.2.0

### Minor Changes

- 30f66d5: Integrate new design

### Patch Changes

- @mijn-ui/react-hooks@0.0.18

## 0.1.1

### Patch Changes

- Updated dependencies [21eb31f]
  - @mijn-ui/react-hooks@0.0.18

## 0.1.0

### Minor Changes

- 284b531: Beta Release

## 0.0.18

### Patch Changes

- Updated dependencies [1bcaa59]
  - @mijn-ui/react-theme@0.0.13
  - @mijn-ui/react-core@0.0.8
  - @mijn-ui/react-hooks@0.0.16

## 0.0.17

### Patch Changes

- b9b775f: Export types and hooks

## 0.0.16

### Patch Changes

- Updated dependencies [562f35f]
  - @mijn-ui/react-theme@0.0.12
  - @mijn-ui/react-core@0.0.7
  - @mijn-ui/react-hooks@0.0.15

## 0.0.15

### Patch Changes

- Updated dependencies [32b1f0a]
  - @mijn-ui/react-theme@0.0.11
  - @mijn-ui/react-core@0.0.6
  - @mijn-ui/react-hooks@0.0.14

## 0.0.14

### Patch Changes

- Updated dependencies [a7594eb]
- Updated dependencies [6777e35]
  - @mijn-ui/react-core@0.0.5
  - @mijn-ui/react-theme@0.0.10
  - @mijn-ui/react-hooks@0.0.13

## 0.0.13

### Patch Changes

- 3a9d89e: Update peer dependencies
- Updated dependencies [3a9d89e]
  - @mijn-ui/react-hooks@0.0.12

## 0.0.12

### Patch Changes

- 7b1ba9f: Update imports
- 9ffa4c1: Beta release.
- Updated dependencies [7b1ba9f]
- Updated dependencies [7b1ba9f]
- Updated dependencies [9ffa4c1]
- Updated dependencies [7b1ba9f]
- Updated dependencies [4256d76]
  - @mijn-ui/react-hooks@0.0.11
  - @mijn-ui/react-utilities@0.0.9
  - @mijn-ui/react-theme@0.0.9
  - @mijn-ui/react-core@0.0.4

## 0.0.11

### Patch Changes

- 696a2e3: Add classNames support.
- Updated dependencies [d32f792]
  - @mijn-ui/react-theme@0.0.8
  - @mijn-ui/react-hooks@0.0.10

## 0.0.10

### Patch Changes

- f524463: Update peer dependendicies.
- Updated dependencies [f524463]
  - @mijn-ui/react-hooks@0.0.10
  - @mijn-ui/react-core@0.0.3

## 0.0.9

### Patch Changes

- ab36c61: extract core functionalities from utils.
- Updated dependencies [d8a420b]
- Updated dependencies [ab36c61]
- Updated dependencies [82b681d]
  - @mijn-ui/react-core@0.0.2
  - @mijn-ui/react-utilities@0.0.8
  - @mijn-ui/react-hooks@0.0.9
  - @mijn-ui/react-theme@0.0.7

## 0.0.8

### Patch Changes

- 051449d: Replace styles with package's styles.
- fe02d23: Make context errors more user friendly.
- Updated dependencies [9444ec9]
- Updated dependencies [add6e87]
- Updated dependencies [88d96e8]
- Updated dependencies [d961021]
- Updated dependencies [49f9bf7]
- Updated dependencies [9b913d0]
- Updated dependencies [fd30e1a]
- Updated dependencies [92be87c]
- Updated dependencies [2b64600]
- Updated dependencies [9fe766a]
- Updated dependencies [2595897]
- Updated dependencies [0131172]
  - @mijn-ui/react-utilities@0.0.7
  - @mijn-ui/react-theme@0.0.6
  - @mijn-ui/react-hooks@0.0.8

## 0.0.7

### Patch Changes

- 4ff5f86: Add ReadMeFile and keywords
- Updated dependencies [4ff5f86]
  - @mijn-ui/react-utilities@0.0.6

## 0.0.6

### Patch Changes

- 73a2336: Update theme variable name `neutral` to `muted` which is conflicting with the tailwind neutral color utilities
- Updated dependencies [73a2336]
  - @mijn-ui/react-utilities@0.0.5

## 0.0.5

### Patch Changes

- ca9ef36: Add unstyled provider

## 0.0.4

### Patch Changes

- 4bc34e6: Fix release source files doesn't get included issues.
- Updated dependencies [4bc34e6]
  - @mijn-ui/react-utilities@0.0.4

## 0.0.3

### Patch Changes

- Updated dependencies [cbc483f]
  - @mijn-ui/react-utilities@0.0.3
