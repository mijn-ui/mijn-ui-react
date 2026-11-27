# @mijn-ui-react/autocomplete

## 0.3.7

### Patch Changes

- e7050f8: Republished through npm trusted publishing from the GitHub `npm` environment. No code changes. This first publish validates the new trusted-publisher setting on every package.
- Updated dependencies [e7050f8]
  - @mijn-ui/react-command@0.4.7
  - @mijn-ui/react-popover@0.4.4
  - @mijn-ui/react-skeleton@0.4.4
  - @mijn-ui/shared-icons@0.2.1

## 0.3.6

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

- b948a13: Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
  read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
  `mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
  older `theme.css` they would lose their corner radius, shadow and focus ring.
- Updated dependencies [071215f]
- Updated dependencies [e527d99]
- Updated dependencies [c17e9a0]
- Updated dependencies [b948a13]
- Updated dependencies [1025439]
  - @mijn-ui/react-popover@0.4.3
  - @mijn-ui/shared-icons@0.2.0
  - @mijn-ui/react-command@0.4.6
  - @mijn-ui/react-skeleton@0.4.3

## 0.3.5

### Patch Changes

- @mijn-ui/react-popover@0.4.2
- @mijn-ui/react-command@0.4.5

## 0.3.4

### Patch Changes

- @mijn-ui/react-popover@0.4.2
- @mijn-ui/react-command@0.4.4

## 0.3.3

### Patch Changes

- Updated dependencies [feb210a]
  - @mijn-ui/react-skeleton@0.4.2
  - @mijn-ui/react-command@0.4.3
  - @mijn-ui/react-popover@0.4.2

## 0.3.2

### Patch Changes

- @mijn-ui/react-popover@0.4.1
- @mijn-ui/react-command@0.4.2

## 0.3.1

### Patch Changes

- 910e03f: update dependencies
- Updated dependencies [910e03f]
  - @mijn-ui/react-skeleton@0.4.1
  - @mijn-ui/react-command@0.4.1
  - @mijn-ui/react-popover@0.4.1

## 0.3.0

### Minor Changes

- 3cb12cf: Fix class merging issuing

### Patch Changes

- Updated dependencies [3cb12cf]
  - @mijn-ui/react-command@0.4.0
  - @mijn-ui/react-popover@0.4.0
  - @mijn-ui/react-skeleton@0.4.0

## 0.2.0

### Minor Changes

- a9b1337: Tailwind v4 integration and reorganize packages theme structure

### Patch Changes

- Updated dependencies [a9b1337]
  - @mijn-ui/react-command@0.3.0
  - @mijn-ui/react-popover@0.3.0
  - @mijn-ui/react-skeleton@0.3.0

## 0.1.1

### Patch Changes

- Updated dependencies [82f9206]
  - @mijn-ui/react-hooks@0.0.19
  - @mijn-ui/react-command@0.2.1
  - @mijn-ui/react-popover@0.2.1

## 0.1.0

### Minor Changes

- 30f66d5: Integrate new design

### Patch Changes

- Updated dependencies [30f66d5]
  - @mijn-ui/react-command@0.2.0
  - @mijn-ui/react-popover@0.2.0
  - @mijn-ui/react-skeleton@0.2.0
  - @mijn-ui/shared-icons@0.1.0
  - @mijn-ui/react-hooks@0.0.18

## 0.0.22

### Patch Changes

- Updated dependencies [21eb31f]
  - @mijn-ui/react-hooks@0.0.18
  - @mijn-ui/react-command@0.1.1
  - @mijn-ui/react-popover@0.1.1

## 0.0.21

### Patch Changes

- Updated dependencies [284b531]
  - @mijn-ui/react-command@0.1.0
  - @mijn-ui/react-popover@0.1.0
  - @mijn-ui/react-skeleton@0.1.0

## 0.0.20

### Patch Changes

- Updated dependencies [1bcaa59]
  - @mijn-ui/react-theme@0.0.13
  - @mijn-ui/react-command@0.0.20
  - @mijn-ui/react-popover@0.0.19
  - @mijn-ui/react-skeleton@0.0.17
  - @mijn-ui/react-core@0.0.8
  - @mijn-ui/react-hooks@0.0.16

## 0.0.19

### Patch Changes

- b9b775f: Export types and hooks
- Updated dependencies [b9b775f]
  - @mijn-ui/react-skeleton@0.0.16
  - @mijn-ui/react-popover@0.0.18
  - @mijn-ui/react-command@0.0.19

## 0.0.18

### Patch Changes

- Updated dependencies [562f35f]
- Updated dependencies [562f35f]
  - @mijn-ui/react-command@0.0.18
  - @mijn-ui/react-theme@0.0.12
  - @mijn-ui/react-popover@0.0.17
  - @mijn-ui/react-skeleton@0.0.15
  - @mijn-ui/react-core@0.0.7
  - @mijn-ui/react-hooks@0.0.15

## 0.0.17

### Patch Changes

- @mijn-ui/react-popover@0.0.16
- @mijn-ui/react-command@0.0.17

## 0.0.16

### Patch Changes

- Updated dependencies [32b1f0a]
  - @mijn-ui/react-theme@0.0.11
  - @mijn-ui/react-command@0.0.16
  - @mijn-ui/react-popover@0.0.16
  - @mijn-ui/react-skeleton@0.0.14
  - @mijn-ui/react-core@0.0.6
  - @mijn-ui/react-hooks@0.0.14

## 0.0.15

### Patch Changes

- Updated dependencies [a7594eb]
- Updated dependencies [6777e35]
  - @mijn-ui/react-core@0.0.5
  - @mijn-ui/react-theme@0.0.10
  - @mijn-ui/react-command@0.0.15
  - @mijn-ui/react-popover@0.0.15
  - @mijn-ui/react-skeleton@0.0.13
  - @mijn-ui/react-hooks@0.0.13

## 0.0.14

### Patch Changes

- 3a9d89e: Update peer dependencies
- Updated dependencies [3a9d89e]
  - @mijn-ui/react-skeleton@0.0.12
  - @mijn-ui/react-command@0.0.14
  - @mijn-ui/react-popover@0.0.14
  - @mijn-ui/react-hooks@0.0.12

## 0.0.13

### Patch Changes

- 7b1ba9f: Update imports
- 9ffa4c1: Beta release.
- Updated dependencies [7b1ba9f]
- Updated dependencies [7b1ba9f]
- Updated dependencies [9ffa4c1]
- Updated dependencies [7b1ba9f]
- Updated dependencies [4256d76]
  - @mijn-ui/react-hooks@0.0.11
  - @mijn-ui/react-skeleton@0.0.11
  - @mijn-ui/react-command@0.0.13
  - @mijn-ui/react-popover@0.0.13
  - @mijn-ui/react-utilities@0.0.9
  - @mijn-ui/shared-icons@0.0.4
  - @mijn-ui/react-theme@0.0.9
  - @mijn-ui/react-core@0.0.4

## 0.0.12

### Patch Changes

- 696a2e3: Add classNames support.
- Updated dependencies [d32f792]
- Updated dependencies [696a2e3]
  - @mijn-ui/react-theme@0.0.8
  - @mijn-ui/react-skeleton@0.0.10
  - @mijn-ui/react-command@0.0.12
  - @mijn-ui/react-popover@0.0.12
  - @mijn-ui/react-hooks@0.0.10

## 0.0.11

### Patch Changes

- f524463: Update peer dependendicies.
- Updated dependencies [f524463]
  - @mijn-ui/react-skeleton@0.0.9
  - @mijn-ui/react-command@0.0.11
  - @mijn-ui/react-popover@0.0.11
  - @mijn-ui/react-hooks@0.0.10
  - @mijn-ui/react-core@0.0.3

## 0.0.10

### Patch Changes

- ab36c61: extract core functionalities from utils.
- Updated dependencies [d8a420b]
- Updated dependencies [ab36c61]
- Updated dependencies [82b681d]
  - @mijn-ui/react-core@0.0.2
  - @mijn-ui/react-utilities@0.0.8
  - @mijn-ui/shared-icons@0.0.3
  - @mijn-ui/react-skeleton@0.0.8
  - @mijn-ui/react-command@0.0.10
  - @mijn-ui/react-popover@0.0.10
  - @mijn-ui/react-hooks@0.0.9
  - @mijn-ui/react-theme@0.0.7

## 0.0.9

### Patch Changes

- fe02d23: Make context errors more user friendly.
- 051449d: Replace styles with theme package's styles
- Updated dependencies [9444ec9]
- Updated dependencies [add6e87]
- Updated dependencies [88d96e8]
- Updated dependencies [051449d]
- Updated dependencies [fe02d23]
- Updated dependencies [add6e87]
- Updated dependencies [051449d]
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
  - @mijn-ui/react-skeleton@0.0.7
  - @mijn-ui/react-command@0.0.9
  - @mijn-ui/react-popover@0.0.9
  - @mijn-ui/react-hooks@0.0.8

## 0.0.8

### Patch Changes

- 4ff5f86: Add ReadMeFile and keywords
- Updated dependencies [4ff5f86]
  - @mijn-ui/react-skeleton@0.0.6
  - @mijn-ui/react-command@0.0.8
  - @mijn-ui/react-popover@0.0.8
  - @mijn-ui/shared-icons@0.0.2
  - @mijn-ui/react-utilities@0.0.6

## 0.0.7

### Patch Changes

- 8424853: remove react-icons to use internal shared icons
- Updated dependencies [8424853]
  - @mijn-ui/react-command@0.0.7
  - @mijn-ui/shared-icons@0.0.1
  - @mijn-ui/react-popover@0.0.7

## 0.0.6

### Patch Changes

- 73a2336: Update theme variable name `neutral` to `muted` which is conflicting with the tailwind neutral color utilities
- Updated dependencies [73a2336]
  - @mijn-ui/react-skeleton@0.0.5
  - @mijn-ui/react-command@0.0.6
  - @mijn-ui/react-popover@0.0.6
  - @mijn-ui/react-utilities@0.0.5

## 0.0.5

### Patch Changes

- @mijn-ui/react-popover@0.0.5
- @mijn-ui/react-command@0.0.5

## 0.0.4

### Patch Changes

- 4bc34e6: Fix release source files doesn't get included issues.
- Updated dependencies [4bc34e6]
  - @mijn-ui/react-skeleton@0.0.4
  - @mijn-ui/react-command@0.0.4
  - @mijn-ui/react-popover@0.0.4
  - @mijn-ui/react-utilities@0.0.4

## 0.0.3

### Patch Changes

- cbc483f: Rename packages
- Updated dependencies [cbc483f]
  - @mijn-ui/react-skeleton@0.0.3
  - @mijn-ui/react-command@0.0.3
  - @mijn-ui/react-popover@0.0.3
  - @mijn-ui/react-utilities@0.0.3

## 0.0.2

### Patch Changes

- ab73fe1: Add autocomplete package
- Updated dependencies [3c6b9ad]
- Updated dependencies [6dd4cdc]
- Updated dependencies [62a87c2]
- Updated dependencies [6765e19]
- Updated dependencies [5502b1a]
  - @mijn-ui-react/popover@0.0.2
  - @mijn-ui-react/skeleton@0.0.2
  - @mijn-ui-react/utilities@0.0.2
  - @mijn-ui-react/command@0.0.2
