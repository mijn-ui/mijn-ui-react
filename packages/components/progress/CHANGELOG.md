# @mijn-ui-react/progress

## 0.4.5

### Patch Changes

- e7050f8: Republished through npm trusted publishing from the GitHub `npm` environment. No code changes. This first publish validates the new trusted-publisher setting on every package.

## 0.4.4

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

- 04f82a6: Forward `value` and `max` to the Radix root, so the progress bar is
  announced, and fill the bar relative to `max`.
  - `Progress` took `value` out of its props to size the indicator and never
    passed it on, so Radix always saw no value: no `aria-valuenow`, no
    `aria-valuetext`, and `data-state="indeterminate"` at every value. Both
    `value` and `max` now reach the root. **Screen readers announce the value**
    (e.g. "40%"), and **`data-state` is `loading` / `complete`** (still
    `indeterminate` without a value); `data-value` / `data-max` are set too. If
    you styled `data-[state=indeterminate]:` expecting it at every value, it now
    only matches a progress bar without one.
  - The indicator assumed `max` was 100. **With another `max` the bar now fills
    to the right fraction** — `value={40} max={200}` fills 20%, not 40%. A value
    outside `0..max` is clamped for the bar (Radix still logs it and reports it
    as indeterminate).

- b948a13: Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
  read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
  `mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
  older `theme.css` they would lose their corner radius, shadow and focus ring.

## 0.4.3

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

## 0.2.0

### Minor Changes

- 30f66d5: Integrate new design

## 0.1.0

### Minor Changes

- 284b531: Beta Release

## 0.0.16

### Patch Changes

- Updated dependencies [1bcaa59]
  - @mijn-ui/react-theme@0.0.13
  - @mijn-ui/react-core@0.0.8

## 0.0.15

### Patch Changes

- Updated dependencies [562f35f]
  - @mijn-ui/react-theme@0.0.12
  - @mijn-ui/react-core@0.0.7

## 0.0.14

### Patch Changes

- Updated dependencies [32b1f0a]
  - @mijn-ui/react-theme@0.0.11
  - @mijn-ui/react-core@0.0.6

## 0.0.13

### Patch Changes

- Updated dependencies [a7594eb]
- Updated dependencies [6777e35]
  - @mijn-ui/react-core@0.0.5
  - @mijn-ui/react-theme@0.0.10

## 0.0.12

### Patch Changes

- 3a9d89e: Update peer dependencies

## 0.0.11

### Patch Changes

- 7b1ba9f: Update imports
- 9ffa4c1: Beta release.
- Updated dependencies [9ffa4c1]
- Updated dependencies [7b1ba9f]
- Updated dependencies [4256d76]
  - @mijn-ui/react-utilities@0.0.9
  - @mijn-ui/react-theme@0.0.9
  - @mijn-ui/react-core@0.0.4

## 0.0.10

### Patch Changes

- 696a2e3: Add classNames support.
- Updated dependencies [d32f792]
  - @mijn-ui/react-theme@0.0.8

## 0.0.9

### Patch Changes

- f524463: Update peer dependendicies.
- Updated dependencies [f524463]
  - @mijn-ui/react-core@0.0.3

## 0.0.8

### Patch Changes

- ab36c61: extract core functionalities from utils.
- Updated dependencies [d8a420b]
- Updated dependencies [ab36c61]
- Updated dependencies [82b681d]
  - @mijn-ui/react-core@0.0.2
  - @mijn-ui/react-utilities@0.0.8
  - @mijn-ui/react-theme@0.0.7

## 0.0.7

### Patch Changes

- 051449d: Replace styles with theme package's styles.
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

## 0.0.6

### Patch Changes

- 4ff5f86: Add ReadMeFile and keywords
- Updated dependencies [4ff5f86]
  - @mijn-ui/react-utilities@0.0.6

## 0.0.5

### Patch Changes

- 73a2336: Update theme variable name `neutral` to `muted` which is conflicting with the tailwind neutral color utilities
- Updated dependencies [73a2336]
  - @mijn-ui/react-utilities@0.0.5

## 0.0.4

### Patch Changes

- 4bc34e6: Fix release source files doesn't get included issues.
- Updated dependencies [4bc34e6]
  - @mijn-ui/react-utilities@0.0.4

## 0.0.3

### Patch Changes

- cbc483f: Rename packages
- Updated dependencies [cbc483f]
  - @mijn-ui/react-utilities@0.0.3

## 0.0.2

### Patch Changes

- a36c450: Add progress package
- Updated dependencies [62a87c2]
- Updated dependencies [6765e19]
  - @mijn-ui-react/utilities@0.0.2
