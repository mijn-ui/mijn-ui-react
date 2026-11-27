# @mijn-ui-react/collapsible

## 0.4.2

### Patch Changes

- e7050f8: Republished through npm trusted publishing from the GitHub `npm` environment. No code changes. This first publish validates the new trusted-publisher setting on every package.

## 0.4.1

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

## 0.0.11

### Patch Changes

- 3a9d89e: Update peer dependencies

## 0.0.10

### Patch Changes

- 7b1ba9f: Update imports
- 9ffa4c1: Beta release.

## 0.0.9

### Patch Changes

- 696a2e3: Add classNames support.

## 0.0.8

### Patch Changes

- f524463: Update peer dependendicies.

## 0.0.7

### Patch Changes

- ab36c61: extract core functionalities from utils.
- Updated dependencies [d8a420b]
- Updated dependencies [ab36c61]
  - @mijn-ui/react-core@0.0.2

## 0.0.6

### Patch Changes

- 4ff5f86: Add ReadMeFile and keywords

## 0.0.5

### Patch Changes

- 73a2336: Update theme variable name `neutral` to `muted` which is conflicting with the tailwind neutral color utilities

## 0.0.4

### Patch Changes

- 4bc34e6: Fix release source files doesn't get included issues.

## 0.0.3

### Patch Changes

- cbc483f: Rename packages

## 0.0.2

### Patch Changes

- 58174fb: Add collapsible package
