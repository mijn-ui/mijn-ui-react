# @mijn-ui/react-segmented-control

## 0.1.0

### Minor Changes

- 44b1356: Add `@mijn-ui/react-segmented-control`: `SegmentedControl` and
  `SegmentedControlItem`, a row of mutually exclusive choices in one pill with
  one tab stop, where the arrow keys move and select, skipping unavailable
  options.
  - **`semantics`**: `"radio"` (default, on Radix RadioGroup) for an answer the
    user gives, or `"tabs"` (on Radix Tabs) for a filter that switches what a
    list shows. Each gets the roles and states of the primitive built for it.
  - **Unanswered**: a controlled `value={null}` checks nothing, and Tab lands on
    the first enabled option without choosing it.
  - **`count`**: a muted count after the label, part of the option's name.
  - **`disabledReason`**: disables the option with `aria-disabled` rather than
    the native attribute, so it still receives hover, and makes the reason its
    accessible description. The visible tooltip is composed with
    `@mijn-ui/react-tooltip`. The package does not depend on it.
  - **`size`**: `sm` (32px, the height of `Button size="sm"`) and `xs` (24px).

  It follows the house pattern (`tv()` slots `base` / `item` / `count`, the
  `unstyled` / `classNames` escape hatches, `data-slot` attributes) and is
  re-exported from `@mijn-ui/react`.

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
