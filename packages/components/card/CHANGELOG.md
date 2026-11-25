# @mijn-ui-react/card

## 0.5.0

### Minor Changes

- 29f153f: **Card is now raised in dark mode.** Its background is `bg-default-alt`, the
  raised surface Popover, Dialog, Dropdown, Select, Command and Toast already
  use, instead of `bg-default`, the page background.
  - **Light mode**: no change (both tokens are white).
  - **Dark mode**: cards go from the page colour (`hsl(240 10% 4%)`, near
    black) to the raised grey (`hsl(240 4% 16%)`), so a card stands out from
    the page instead of being outlined on it. Its `outline-secondary` border
    has the same value as the raised surface in dark mode, as on popovers and
    dialogs, so the edge now comes from the surface contrast rather than the
    border line.
  - Content inside a card that sets `bg-bg-default` on purpose (to match the
    page) now shows as a darker panel inside it in dark mode. Default-variant
    Buttons (`bg-default-alt`) sit on the card the way they do in a popover:
    same fill, separated by their border and shadow.

  To keep the old flat card, pass `className="bg-bg-default"` (or
  `classNames={{ base: "bg-bg-default" }}`).

### Patch Changes

- b948a13: Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
  read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
  `mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
  older `theme.css` they would lose their corner radius, shadow and focus ring.
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

## 0.0.17

### Patch Changes

- Updated dependencies [1bcaa59]
  - @mijn-ui/react-theme@0.0.13
  - @mijn-ui/react-core@0.0.8
  - @mijn-ui/react-hooks@0.0.16

## 0.0.16

### Patch Changes

- b9b775f: Export types and hooks

## 0.0.15

### Patch Changes

- Updated dependencies [562f35f]
  - @mijn-ui/react-theme@0.0.12
  - @mijn-ui/react-core@0.0.7
  - @mijn-ui/react-hooks@0.0.15

## 0.0.14

### Patch Changes

- Updated dependencies [32b1f0a]
  - @mijn-ui/react-theme@0.0.11
  - @mijn-ui/react-core@0.0.6
  - @mijn-ui/react-hooks@0.0.14

## 0.0.13

### Patch Changes

- Updated dependencies [a7594eb]
- Updated dependencies [6777e35]
  - @mijn-ui/react-core@0.0.5
  - @mijn-ui/react-theme@0.0.10
  - @mijn-ui/react-hooks@0.0.13

## 0.0.12

### Patch Changes

- 3a9d89e: Update peer dependencies
- Updated dependencies [3a9d89e]
  - @mijn-ui/react-hooks@0.0.12

## 0.0.11

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

## 0.0.10

### Patch Changes

- 696a2e3: Add classNames support.
- Updated dependencies [d32f792]
  - @mijn-ui/react-theme@0.0.8
  - @mijn-ui/react-hooks@0.0.10

## 0.0.9

### Patch Changes

- f524463: Update peer dependendicies.
- Updated dependencies [f524463]
  - @mijn-ui/react-hooks@0.0.10
  - @mijn-ui/react-core@0.0.3

## 0.0.8

### Patch Changes

- ab36c61: extract core functionalities from utils.
- Updated dependencies [d8a420b]
- Updated dependencies [ab36c61]
- Updated dependencies [82b681d]
  - @mijn-ui/react-core@0.0.2
  - @mijn-ui/react-utilities@0.0.8
  - @mijn-ui/react-hooks@0.0.9
  - @mijn-ui/react-theme@0.0.7

## 0.0.7

### Patch Changes

- fe02d23: Make context errors more user friendly.
- c642cf6: Replace styles with theme package's style
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

- 457b18e: Add card package
- Updated dependencies [62a87c2]
- Updated dependencies [6765e19]
  - @mijn-ui-react/utilities@0.0.2
