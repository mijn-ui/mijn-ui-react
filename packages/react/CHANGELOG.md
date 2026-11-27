# @mijn-ui/react

## 0.8.1

### Patch Changes

- e7050f8: Republished through npm trusted publishing from the GitHub `npm` environment. No code changes. This first publish validates the new trusted-publisher setting on every package.
- Updated dependencies [e7050f8]
  - @mijn-ui/react-accordion@0.5.2
  - @mijn-ui/react-alert@0.4.7
  - @mijn-ui/react-alert-dialog@0.4.4
  - @mijn-ui/react-autocomplete@0.3.7
  - @mijn-ui/react-avatar@0.4.6
  - @mijn-ui/react-badge@0.6.1
  - @mijn-ui/react-breadcrumb@0.2.3
  - @mijn-ui/react-button@0.7.1
  - @mijn-ui/react-calendar@0.4.4
  - @mijn-ui/react-card@0.5.1
  - @mijn-ui/react-charts@0.1.2
  - @mijn-ui/react-checkbox@0.4.4
  - @mijn-ui/react-collapsible@0.4.2
  - @mijn-ui/react-command@0.4.7
  - @mijn-ui/react-core@0.6.1
  - @mijn-ui/react-dialog@0.4.7
  - @mijn-ui/react-dropdown-menu@0.4.4
  - @mijn-ui/react-input@0.6.1
  - @mijn-ui/react-label@0.4.4
  - @mijn-ui/react-pagination@0.4.4
  - @mijn-ui/react-popover@0.4.4
  - @mijn-ui/react-progress@0.4.5
  - @mijn-ui/react-radio-group@0.4.4
  - @mijn-ui/react-scroll-area@0.4.4
  - @mijn-ui/react-segmented-control@0.1.1
  - @mijn-ui/react-select@0.4.4
  - @mijn-ui/react-separator@0.4.4
  - @mijn-ui/react-skeleton@0.4.4
  - @mijn-ui/react-slider@0.1.2
  - @mijn-ui/react-switch@0.4.6
  - @mijn-ui/react-table@0.4.4
  - @mijn-ui/react-tabs@0.4.4
  - @mijn-ui/react-textarea@0.4.4
  - @mijn-ui/react-toast@0.2.3
  - @mijn-ui/react-tooltip@0.1.2
  - @mijn-ui/shared-icons@0.2.1

## 0.8.0

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

- Updated dependencies [44b1356]
- Updated dependencies [071215f]
- Updated dependencies [29f153f]
- Updated dependencies [7978b2c]
- Updated dependencies [510cc3b]
- Updated dependencies [e1d8920]
- Updated dependencies [e527d99]
- Updated dependencies [4538a8a]
- Updated dependencies [3011f9f]
- Updated dependencies [322907a]
- Updated dependencies [04f82a6]
- Updated dependencies [7ff94dc]
- Updated dependencies [c7459f4]
- Updated dependencies [9c8817b]
- Updated dependencies [c17e9a0]
- Updated dependencies [b948a13]
- Updated dependencies [24add51]
- Updated dependencies [1025439]
- Updated dependencies [e4df001]
  - @mijn-ui/react-segmented-control@0.1.0
  - @mijn-ui/react-accordion@0.5.1
  - @mijn-ui/react-alert-dialog@0.4.3
  - @mijn-ui/react-autocomplete@0.3.6
  - @mijn-ui/react-avatar@0.4.5
  - @mijn-ui/react-button@0.7.0
  - @mijn-ui/react-checkbox@0.4.3
  - @mijn-ui/react-collapsible@0.4.1
  - @mijn-ui/react-dialog@0.4.6
  - @mijn-ui/react-dropdown-menu@0.4.3
  - @mijn-ui/react-label@0.4.3
  - @mijn-ui/react-popover@0.4.3
  - @mijn-ui/react-progress@0.4.4
  - @mijn-ui/react-radio-group@0.4.3
  - @mijn-ui/react-scroll-area@0.4.3
  - @mijn-ui/react-select@0.4.3
  - @mijn-ui/react-separator@0.4.3
  - @mijn-ui/react-slider@0.1.1
  - @mijn-ui/react-switch@0.4.5
  - @mijn-ui/react-tabs@0.4.3
  - @mijn-ui/react-tooltip@0.1.1
  - @mijn-ui/react-card@0.5.0
  - @mijn-ui/react-badge@0.6.0
  - @mijn-ui/react-calendar@0.4.3
  - @mijn-ui/react-input@0.6.0
  - @mijn-ui/react-pagination@0.4.3
  - @mijn-ui/react-textarea@0.4.3
  - @mijn-ui/shared-icons@0.2.0
  - @mijn-ui/react-core@0.6.0
  - @mijn-ui/react-alert@0.4.6
  - @mijn-ui/react-breadcrumb@0.2.2
  - @mijn-ui/react-command@0.4.6
  - @mijn-ui/react-table@0.4.3
  - @mijn-ui/react-toast@0.2.2
  - @mijn-ui/react-charts@0.1.1
  - @mijn-ui/react-skeleton@0.4.3

## 0.7.0

### Minor Changes

- 630f091: Add `Tooltip` and `Slider`, two primitives the library did not ship.

  Both are Radix-backed and follow the house pattern (`tv()` slots, the `unstyled`
  / `classNames` escape hatches, `data-slot` attributes), so they theme and
  override exactly like the rest of the set.
  - **Tooltip** — `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipArrow`
    and `TooltipProvider`. The provider is required and should be mounted once
    near the root: it owns the shared hover delay, which is what lets a second
    trigger open instantly instead of re-waiting the full delay.
  - **Slider** — one thumb is rendered per value, so a range slider is just two
    values. Each thumb is its own `role="slider"`, so `thumbAriaLabels` names them
    individually; a single name on the root cannot tell two thumbs apart.

  Both are re-exported from `@mijn-ui/react`.

### Patch Changes

- Updated dependencies [630f091]
- Updated dependencies [39652e2]
  - @mijn-ui/react-tooltip@0.1.0
  - @mijn-ui/react-slider@0.1.0
  - @mijn-ui/react-breadcrumb@0.2.1
  - @mijn-ui/react-progress@0.4.3
  - @mijn-ui/react-toast@0.2.1

## 0.6.0

### Minor Changes

- 445df5b: Add `@mijn-ui/react-charts` — `BarChart`, `GroupedBarChart`, `DonutChart`, `Sparkline`, and `ChartLegend` — plus categorical hue tokens in the core theme, and export the new package from the umbrella.

### Patch Changes

- Updated dependencies [445df5b]
  - @mijn-ui/react-charts@0.1.0
  - @mijn-ui/react-core@0.5.1
  - @mijn-ui/react-accordion@0.5.0
  - @mijn-ui/react-alert@0.4.5
  - @mijn-ui/react-alert-dialog@0.4.2
  - @mijn-ui/react-autocomplete@0.3.5
  - @mijn-ui/react-avatar@0.4.4
  - @mijn-ui/react-badge@0.5.0
  - @mijn-ui/react-breadcrumb@0.2.0
  - @mijn-ui/react-button@0.6.0
  - @mijn-ui/react-calendar@0.4.2
  - @mijn-ui/react-card@0.4.2
  - @mijn-ui/react-checkbox@0.4.2
  - @mijn-ui/react-collapsible@0.4.0
  - @mijn-ui/react-command@0.4.5
  - @mijn-ui/react-dialog@0.4.5
  - @mijn-ui/react-dropdown-menu@0.4.2
  - @mijn-ui/react-input@0.5.0
  - @mijn-ui/react-label@0.4.2
  - @mijn-ui/react-pagination@0.4.2
  - @mijn-ui/react-popover@0.4.2
  - @mijn-ui/react-progress@0.4.2
  - @mijn-ui/react-radio-group@0.4.2
  - @mijn-ui/react-scroll-area@0.4.2
  - @mijn-ui/react-select@0.4.2
  - @mijn-ui/react-separator@0.4.2
  - @mijn-ui/react-skeleton@0.4.2
  - @mijn-ui/react-switch@0.4.4
  - @mijn-ui/react-table@0.4.2
  - @mijn-ui/react-tabs@0.4.2
  - @mijn-ui/react-textarea@0.4.2
  - @mijn-ui/react-toast@0.2.0

## 0.5.0

### Minor Changes

- d44e61a: Add `@mijn-ui/react-breadcrumb` and `@mijn-ui/react-toast` to the umbrella package exports.

## 0.4.14

### Patch Changes

- Updated dependencies [19ac9d1]
  - @mijn-ui/react-accordion@0.5.0
  - @mijn-ui/react-badge@0.5.0
  - @mijn-ui/react-button@0.6.0
  - @mijn-ui/react-input@0.5.0
  - @mijn-ui/react-calendar@0.4.2
  - @mijn-ui/react-alert-dialog@0.4.2
  - @mijn-ui/react-autocomplete@0.3.5
  - @mijn-ui/react-card@0.4.2
  - @mijn-ui/react-dialog@0.4.5
  - @mijn-ui/react-dropdown-menu@0.4.2
  - @mijn-ui/react-label@0.4.2
  - @mijn-ui/react-popover@0.4.2
  - @mijn-ui/react-tabs@0.4.2
  - @mijn-ui/react-command@0.4.5

## 0.4.13

### Patch Changes

- Updated dependencies [38a28af]
  - @mijn-ui/react-switch@0.4.4
  - @mijn-ui/react-input@0.4.3
  - @mijn-ui/react-autocomplete@0.3.4
  - @mijn-ui/react-command@0.4.4
  - @mijn-ui/react-dialog@0.4.4
  - @mijn-ui/react-popover@0.4.2
  - @mijn-ui/react-tabs@0.4.2

## 0.4.12

### Patch Changes

- Updated dependencies [58a2391]
  - @mijn-ui/react-badge@0.4.5
  - @mijn-ui/react-calendar@0.4.2

## 0.4.11

### Patch Changes

- Updated dependencies [87cddd9]
  - @mijn-ui/react-badge@0.4.4
  - @mijn-ui/react-calendar@0.4.2

## 0.4.10

### Patch Changes

- Updated dependencies [c3692d0]
  - @mijn-ui/react-button@0.5.3
  - @mijn-ui/react-badge@0.4.3
  - @mijn-ui/react-alert-dialog@0.4.2
  - @mijn-ui/react-autocomplete@0.3.4
  - @mijn-ui/react-card@0.4.2
  - @mijn-ui/react-dialog@0.4.4
  - @mijn-ui/react-dropdown-menu@0.4.2
  - @mijn-ui/react-label@0.4.2
  - @mijn-ui/react-popover@0.4.2
  - @mijn-ui/react-tabs@0.4.2
  - @mijn-ui/react-calendar@0.4.2
  - @mijn-ui/react-command@0.4.4

## 0.4.9

### Patch Changes

- Updated dependencies [b735ecf]
  - @mijn-ui/react-avatar@0.4.4

## 0.4.8

### Patch Changes

- Updated dependencies [feb210a]
  - @mijn-ui/react-dropdown-menu@0.4.2
  - @mijn-ui/react-alert-dialog@0.4.2
  - @mijn-ui/react-radio-group@0.4.2
  - @mijn-ui/react-scroll-area@0.4.2
  - @mijn-ui/react-pagination@0.4.2
  - @mijn-ui/react-accordion@0.4.2
  - @mijn-ui/react-separator@0.4.2
  - @mijn-ui/react-calendar@0.4.2
  - @mijn-ui/react-checkbox@0.4.2
  - @mijn-ui/react-progress@0.4.2
  - @mijn-ui/react-skeleton@0.4.2
  - @mijn-ui/react-textarea@0.4.2
  - @mijn-ui/react-command@0.4.3
  - @mijn-ui/react-popover@0.4.2
  - @mijn-ui/react-avatar@0.4.3
  - @mijn-ui/react-button@0.5.2
  - @mijn-ui/react-dialog@0.4.3
  - @mijn-ui/react-select@0.4.2
  - @mijn-ui/react-switch@0.4.3
  - @mijn-ui/react-alert@0.4.5
  - @mijn-ui/react-badge@0.4.2
  - @mijn-ui/react-input@0.4.2
  - @mijn-ui/react-label@0.4.2
  - @mijn-ui/react-table@0.4.2
  - @mijn-ui/react-card@0.4.2
  - @mijn-ui/react-tabs@0.4.2
  - @mijn-ui/react-autocomplete@0.3.3

## 0.4.7

### Patch Changes

- Updated dependencies [81fcba6]
  - @mijn-ui/react-avatar@0.4.2

## 0.4.6

### Patch Changes

- Updated dependencies [643b6f0]
  - @mijn-ui/react-alert@0.4.4

## 0.4.5

### Patch Changes

- Updated dependencies [cde99cb]
  - @mijn-ui/react-alert@0.4.3

## 0.4.4

### Patch Changes

- Updated dependencies [b2c9bfc]
  - @mijn-ui/react-alert@0.4.2

## 0.4.3

### Patch Changes

- 2625e63: Fix switch component styling issue
- Updated dependencies [2625e63]
  - @mijn-ui/react-switch@0.4.2

## 0.4.2

### Patch Changes

- beaaa6e: Add loadingIcon customization option
- Updated dependencies [beaaa6e]
  - @mijn-ui/react-button@0.5.1
  - @mijn-ui/react-alert-dialog@0.4.1
  - @mijn-ui/react-autocomplete@0.3.2
  - @mijn-ui/react-card@0.4.1
  - @mijn-ui/react-dialog@0.4.2
  - @mijn-ui/react-dropdown-menu@0.4.1
  - @mijn-ui/react-label@0.4.1
  - @mijn-ui/react-popover@0.4.1
  - @mijn-ui/react-tabs@0.4.1
  - @mijn-ui/react-command@0.4.2

## 0.4.1

### Patch Changes

- 910e03f: update dependencies
- Updated dependencies [4881375]
- Updated dependencies [4881375]
- Updated dependencies [910e03f]
- Updated dependencies [910e03f]
- Updated dependencies [910e03f]
- Updated dependencies [ef4a704]
- Updated dependencies [4881375]
  - @mijn-ui/react-alert@0.4.1
  - @mijn-ui/react-core@0.5.0
  - @mijn-ui/react-button@0.5.0
  - @mijn-ui/react-dropdown-menu@0.4.1
  - @mijn-ui/react-alert-dialog@0.4.1
  - @mijn-ui/react-autocomplete@0.3.1
  - @mijn-ui/react-radio-group@0.4.1
  - @mijn-ui/react-scroll-area@0.4.1
  - @mijn-ui/react-pagination@0.4.1
  - @mijn-ui/react-accordion@0.4.1
  - @mijn-ui/react-separator@0.4.1
  - @mijn-ui/react-calendar@0.4.1
  - @mijn-ui/react-checkbox@0.4.1
  - @mijn-ui/react-progress@0.4.1
  - @mijn-ui/react-skeleton@0.4.1
  - @mijn-ui/react-textarea@0.4.1
  - @mijn-ui/react-command@0.4.1
  - @mijn-ui/react-popover@0.4.1
  - @mijn-ui/react-avatar@0.4.1
  - @mijn-ui/react-dialog@0.4.1
  - @mijn-ui/react-select@0.4.1
  - @mijn-ui/react-switch@0.4.1
  - @mijn-ui/react-badge@0.4.1
  - @mijn-ui/react-input@0.4.1
  - @mijn-ui/react-label@0.4.1
  - @mijn-ui/react-table@0.4.1
  - @mijn-ui/react-card@0.4.1
  - @mijn-ui/react-tabs@0.4.1
  - @mijn-ui/react-collapsible@0.4.0

## 0.4.0

### Minor Changes

- 3cb12cf: Fix class merging issuing

### Patch Changes

- Updated dependencies [3cb12cf]
  - @mijn-ui/react-accordion@0.4.0
  - @mijn-ui/react-alert@0.4.0
  - @mijn-ui/react-alert-dialog@0.4.0
  - @mijn-ui/react-autocomplete@0.3.0
  - @mijn-ui/react-avatar@0.4.0
  - @mijn-ui/react-badge@0.4.0
  - @mijn-ui/react-button@0.4.0
  - @mijn-ui/react-calendar@0.4.0
  - @mijn-ui/react-card@0.4.0
  - @mijn-ui/react-checkbox@0.4.0
  - @mijn-ui/react-collapsible@0.4.0
  - @mijn-ui/react-command@0.4.0
  - @mijn-ui/react-dialog@0.4.0
  - @mijn-ui/react-dropdown-menu@0.4.0
  - @mijn-ui/react-input@0.4.0
  - @mijn-ui/react-label@0.4.0
  - @mijn-ui/react-pagination@0.4.0
  - @mijn-ui/react-popover@0.4.0
  - @mijn-ui/react-progress@0.4.0
  - @mijn-ui/react-radio-group@0.4.0
  - @mijn-ui/react-scroll-area@0.4.0
  - @mijn-ui/react-select@0.4.0
  - @mijn-ui/react-separator@0.4.0
  - @mijn-ui/react-skeleton@0.4.0
  - @mijn-ui/react-switch@0.4.0
  - @mijn-ui/react-table@0.4.0
  - @mijn-ui/react-tabs@0.4.0
  - @mijn-ui/react-textarea@0.4.0
  - @mijn-ui/react-core@0.4.0

## 0.3.0

### Minor Changes

- a9b1337: Tailwind v4 integration and reorganize packages theme structure

### Patch Changes

- Updated dependencies [a9b1337]
  - @mijn-ui/react-accordion@0.3.0
  - @mijn-ui/react-alert@0.3.0
  - @mijn-ui/react-alert-dialog@0.3.0
  - @mijn-ui/react-autocomplete@0.2.0
  - @mijn-ui/react-avatar@0.3.0
  - @mijn-ui/react-badge@0.3.0
  - @mijn-ui/react-button@0.3.0
  - @mijn-ui/react-calendar@0.3.0
  - @mijn-ui/react-card@0.3.0
  - @mijn-ui/react-checkbox@0.3.0
  - @mijn-ui/react-collapsible@0.3.0
  - @mijn-ui/react-command@0.3.0
  - @mijn-ui/react-dialog@0.3.0
  - @mijn-ui/react-dropdown-menu@0.3.0
  - @mijn-ui/react-input@0.3.0
  - @mijn-ui/react-label@0.3.0
  - @mijn-ui/react-pagination@0.3.0
  - @mijn-ui/react-popover@0.3.0
  - @mijn-ui/react-progress@0.3.0
  - @mijn-ui/react-radio-group@0.3.0
  - @mijn-ui/react-scroll-area@0.3.0
  - @mijn-ui/react-select@0.3.0
  - @mijn-ui/react-separator@0.3.0
  - @mijn-ui/react-skeleton@0.3.0
  - @mijn-ui/react-switch@0.3.0
  - @mijn-ui/react-table@0.3.0
  - @mijn-ui/react-tabs@0.3.0
  - @mijn-ui/react-textarea@0.3.0
  - @mijn-ui/react-core@0.3.0

## 0.2.3

### Patch Changes

- Updated dependencies [e360033]
  - @mijn-ui/react-theme@0.2.1
  - @mijn-ui/react-accordion@0.2.1
  - @mijn-ui/react-alert@0.2.1
  - @mijn-ui/react-alert-dialog@0.2.1
  - @mijn-ui/react-autocomplete@0.1.1
  - @mijn-ui/react-avatar@0.2.1
  - @mijn-ui/react-badge@0.2.0
  - @mijn-ui/react-button@0.2.0
  - @mijn-ui/react-calendar@0.2.0
  - @mijn-ui/react-card@0.2.1
  - @mijn-ui/react-checkbox@0.2.1
  - @mijn-ui/react-collapsible@0.2.0
  - @mijn-ui/react-command@0.2.1
  - @mijn-ui/react-date-picker@0.1.1
  - @mijn-ui/react-dialog@0.2.1
  - @mijn-ui/react-dropdown-menu@0.2.1
  - @mijn-ui/react-input@0.2.0
  - @mijn-ui/react-label@0.2.0
  - @mijn-ui/react-pagination@0.2.1
  - @mijn-ui/react-popover@0.2.1
  - @mijn-ui/react-progress@0.2.0
  - @mijn-ui/react-radio-group@0.2.1
  - @mijn-ui/react-scroll-area@0.2.1
  - @mijn-ui/react-select@0.2.1
  - @mijn-ui/react-separator@0.2.0
  - @mijn-ui/react-skeleton@0.2.0
  - @mijn-ui/react-switch@0.2.0
  - @mijn-ui/react-table@0.2.1
  - @mijn-ui/react-tabs@0.2.1
  - @mijn-ui/react-textarea@0.2.0
  - @mijn-ui/react-core@0.2.0
  - @mijn-ui/react-hooks@0.0.19

## 0.2.2

### Patch Changes

- Updated dependencies [82f9206]
  - @mijn-ui/react-hooks@0.0.19
  - @mijn-ui/react-accordion@0.2.1
  - @mijn-ui/react-alert@0.2.1
  - @mijn-ui/react-alert-dialog@0.2.1
  - @mijn-ui/react-autocomplete@0.1.1
  - @mijn-ui/react-avatar@0.2.1
  - @mijn-ui/react-card@0.2.1
  - @mijn-ui/react-checkbox@0.2.1
  - @mijn-ui/react-command@0.2.1
  - @mijn-ui/react-dialog@0.2.1
  - @mijn-ui/react-dropdown-menu@0.2.1
  - @mijn-ui/react-pagination@0.2.1
  - @mijn-ui/react-popover@0.2.1
  - @mijn-ui/react-radio-group@0.2.1
  - @mijn-ui/react-scroll-area@0.2.1
  - @mijn-ui/react-select@0.2.1
  - @mijn-ui/react-table@0.2.1
  - @mijn-ui/react-tabs@0.2.1
  - @mijn-ui/react-date-picker@0.1.1

## 0.2.1

### Patch Changes

- 62d4024: Fix react-core version mismatch.

## 0.2.0

### Minor Changes

- 959c0f7: Integrate new design system.

## 0.1.2

### Patch Changes

- Updated dependencies [21f75ac]
- Updated dependencies [30f66d5]
  - @mijn-ui/react-theme@0.2.0
  - @mijn-ui/react-accordion@0.2.0
  - @mijn-ui/react-alert@0.2.0
  - @mijn-ui/react-alert-dialog@0.2.0
  - @mijn-ui/react-autocomplete@0.1.0
  - @mijn-ui/react-avatar@0.2.0
  - @mijn-ui/react-badge@0.2.0
  - @mijn-ui/react-button@0.2.0
  - @mijn-ui/react-calendar@0.2.0
  - @mijn-ui/react-card@0.2.0
  - @mijn-ui/react-checkbox@0.2.0
  - @mijn-ui/react-collapsible@0.2.0
  - @mijn-ui/react-command@0.2.0
  - @mijn-ui/react-date-picker@0.1.0
  - @mijn-ui/react-dialog@0.2.0
  - @mijn-ui/react-dropdown-menu@0.2.0
  - @mijn-ui/react-input@0.2.0
  - @mijn-ui/react-label@0.2.0
  - @mijn-ui/react-pagination@0.2.0
  - @mijn-ui/react-popover@0.2.0
  - @mijn-ui/react-progress@0.2.0
  - @mijn-ui/react-radio-group@0.2.0
  - @mijn-ui/react-scroll-area@0.2.0
  - @mijn-ui/react-select@0.2.0
  - @mijn-ui/react-separator@0.2.0
  - @mijn-ui/react-skeleton@0.2.0
  - @mijn-ui/react-switch@0.2.0
  - @mijn-ui/react-table@0.2.0
  - @mijn-ui/react-tabs@0.2.0
  - @mijn-ui/react-textarea@0.2.0
  - @mijn-ui/shared-icons@0.1.0
  - @mijn-ui/react-hooks@0.0.18

## 0.1.1

### Patch Changes

- Updated dependencies [21eb31f]
  - @mijn-ui/react-hooks@0.0.18
  - @mijn-ui/react-accordion@0.1.1
  - @mijn-ui/react-alert@0.1.1
  - @mijn-ui/react-alert-dialog@0.1.1
  - @mijn-ui/react-autocomplete@0.0.22
  - @mijn-ui/react-avatar@0.1.1
  - @mijn-ui/react-card@0.1.1
  - @mijn-ui/react-checkbox@0.1.1
  - @mijn-ui/react-command@0.1.1
  - @mijn-ui/react-dialog@0.1.1
  - @mijn-ui/react-dropdown-menu@0.1.1
  - @mijn-ui/react-pagination@0.1.1
  - @mijn-ui/react-popover@0.1.1
  - @mijn-ui/react-radio-group@0.1.1
  - @mijn-ui/react-scroll-area@0.1.1
  - @mijn-ui/react-select@0.1.1
  - @mijn-ui/react-table@0.1.1
  - @mijn-ui/react-tabs@0.1.1
  - @mijn-ui/react-date-picker@0.0.22

## 0.1.0

### Minor Changes

- 284b531: Beta Release

### Patch Changes

- Updated dependencies [284b531]
  - @mijn-ui/react-accordion@0.1.0
  - @mijn-ui/react-alert@0.1.0
  - @mijn-ui/react-alert-dialog@0.1.0
  - @mijn-ui/react-avatar@0.1.0
  - @mijn-ui/react-badge@0.1.0
  - @mijn-ui/react-button@0.1.0
  - @mijn-ui/react-calendar@0.1.0
  - @mijn-ui/react-card@0.1.0
  - @mijn-ui/react-checkbox@0.1.0
  - @mijn-ui/react-collapsible@0.1.0
  - @mijn-ui/react-command@0.1.0
  - @mijn-ui/react-dialog@0.1.0
  - @mijn-ui/react-dropdown-menu@0.1.0
  - @mijn-ui/react-input@0.1.0
  - @mijn-ui/react-label@0.1.0
  - @mijn-ui/react-pagination@0.1.0
  - @mijn-ui/react-popover@0.1.0
  - @mijn-ui/react-progress@0.1.0
  - @mijn-ui/react-radio-group@0.1.0
  - @mijn-ui/react-scroll-area@0.1.0
  - @mijn-ui/react-select@0.1.0
  - @mijn-ui/react-separator@0.1.0
  - @mijn-ui/react-skeleton@0.1.0
  - @mijn-ui/react-switch@0.1.0
  - @mijn-ui/react-table@0.1.0
  - @mijn-ui/react-tabs@0.1.0
  - @mijn-ui/react-textarea@0.1.0
  - @mijn-ui/react-autocomplete@0.0.21
  - @mijn-ui/react-date-picker@0.0.21

## 0.0.10

### Patch Changes

- Updated dependencies [29bd2ad]
- Updated dependencies [29bd2ad]
  - @mijn-ui/react-theme@0.1.0
  - @mijn-ui/react-core@0.1.0
  - @mijn-ui/react-collapsible@0.0.11
  - @mijn-ui/react-hooks@0.0.16

## 0.0.9

### Patch Changes

- Updated dependencies [1bcaa59]
  - @mijn-ui/react-theme@0.0.13
  - @mijn-ui/react-accordion@0.0.17
  - @mijn-ui/react-alert@0.0.17
  - @mijn-ui/react-alert-dialog@0.0.19
  - @mijn-ui/react-autocomplete@0.0.20
  - @mijn-ui/react-avatar@0.0.17
  - @mijn-ui/react-badge@0.0.17
  - @mijn-ui/react-button@0.0.20
  - @mijn-ui/react-calendar@0.0.18
  - @mijn-ui/react-card@0.0.17
  - @mijn-ui/react-checkbox@0.0.19
  - @mijn-ui/react-collapsible@0.0.11
  - @mijn-ui/react-command@0.0.20
  - @mijn-ui/react-date-picker@0.0.20
  - @mijn-ui/react-dialog@0.0.20
  - @mijn-ui/react-dropdown-menu@0.0.19
  - @mijn-ui/react-input@0.0.17
  - @mijn-ui/react-label@0.0.16
  - @mijn-ui/react-pagination@0.0.19
  - @mijn-ui/react-popover@0.0.19
  - @mijn-ui/react-progress@0.0.16
  - @mijn-ui/react-radio-group@0.0.18
  - @mijn-ui/react-scroll-area@0.0.17
  - @mijn-ui/react-select@0.0.18
  - @mijn-ui/react-separator@0.0.16
  - @mijn-ui/react-skeleton@0.0.17
  - @mijn-ui/react-switch@0.0.17
  - @mijn-ui/react-table@0.0.17
  - @mijn-ui/react-tabs@0.0.18
  - @mijn-ui/react-textarea@0.0.16
  - @mijn-ui/react-core@0.0.8
  - @mijn-ui/react-hooks@0.0.16

## 0.0.8

### Patch Changes

- Updated dependencies [2e00de6]
- Updated dependencies [b9b775f]
  - @mijn-ui/react-checkbox@0.0.18
  - @mijn-ui/react-button@0.0.19
  - @mijn-ui/react-select@0.0.17
  - @mijn-ui/react-switch@0.0.16
  - @mijn-ui/react-input@0.0.16
  - @mijn-ui/react-dropdown-menu@0.0.18
  - @mijn-ui/react-alert-dialog@0.0.18
  - @mijn-ui/react-autocomplete@0.0.19
  - @mijn-ui/react-date-picker@0.0.19
  - @mijn-ui/react-radio-group@0.0.17
  - @mijn-ui/react-scroll-area@0.0.16
  - @mijn-ui/react-pagination@0.0.18
  - @mijn-ui/react-skeleton@0.0.16
  - @mijn-ui/react-popover@0.0.18
  - @mijn-ui/react-avatar@0.0.16
  - @mijn-ui/react-dialog@0.0.19
  - @mijn-ui/react-alert@0.0.16
  - @mijn-ui/react-badge@0.0.16
  - @mijn-ui/react-table@0.0.16
  - @mijn-ui/react-card@0.0.16
  - @mijn-ui/react-tabs@0.0.17
  - @mijn-ui/react-label@0.0.15
  - @mijn-ui/react-command@0.0.19
  - @mijn-ui/react-calendar@0.0.17

## 0.0.7

### Patch Changes

- Updated dependencies [562f35f]
- Updated dependencies [562f35f]
- Updated dependencies [562f35f]
- Updated dependencies [562f35f]
  - @mijn-ui/react-input@0.0.15
  - @mijn-ui/react-command@0.0.18
  - @mijn-ui/react-pagination@0.0.17
  - @mijn-ui/react-theme@0.0.12
  - @mijn-ui/react-autocomplete@0.0.18
  - @mijn-ui/react-dialog@0.0.18
  - @mijn-ui/react-popover@0.0.17
  - @mijn-ui/react-tabs@0.0.16
  - @mijn-ui/react-accordion@0.0.16
  - @mijn-ui/react-alert@0.0.15
  - @mijn-ui/react-alert-dialog@0.0.17
  - @mijn-ui/react-avatar@0.0.15
  - @mijn-ui/react-badge@0.0.15
  - @mijn-ui/react-button@0.0.18
  - @mijn-ui/react-calendar@0.0.17
  - @mijn-ui/react-card@0.0.15
  - @mijn-ui/react-checkbox@0.0.17
  - @mijn-ui/react-collapsible@0.0.11
  - @mijn-ui/react-date-picker@0.0.18
  - @mijn-ui/react-dropdown-menu@0.0.17
  - @mijn-ui/react-label@0.0.15
  - @mijn-ui/react-progress@0.0.15
  - @mijn-ui/react-radio-group@0.0.16
  - @mijn-ui/react-scroll-area@0.0.15
  - @mijn-ui/react-select@0.0.16
  - @mijn-ui/react-separator@0.0.15
  - @mijn-ui/react-skeleton@0.0.15
  - @mijn-ui/react-switch@0.0.15
  - @mijn-ui/react-table@0.0.15
  - @mijn-ui/react-textarea@0.0.15
  - @mijn-ui/react-core@0.0.7
  - @mijn-ui/react-hooks@0.0.15

## 0.0.6

### Patch Changes

- Updated dependencies [610a9ae]
  - @mijn-ui/react-button@0.0.17
  - @mijn-ui/react-autocomplete@0.0.17
  - @mijn-ui/react-card@0.0.14
  - @mijn-ui/react-date-picker@0.0.17
  - @mijn-ui/react-dialog@0.0.17
  - @mijn-ui/react-dropdown-menu@0.0.16
  - @mijn-ui/react-label@0.0.14
  - @mijn-ui/react-popover@0.0.16
  - @mijn-ui/react-tabs@0.0.15
  - @mijn-ui/react-command@0.0.17

## 0.0.5

### Patch Changes

- Updated dependencies [32b1f0a]
  - @mijn-ui/react-theme@0.0.11
  - @mijn-ui/react-accordion@0.0.15
  - @mijn-ui/react-alert@0.0.14
  - @mijn-ui/react-alert-dialog@0.0.16
  - @mijn-ui/react-autocomplete@0.0.16
  - @mijn-ui/react-avatar@0.0.14
  - @mijn-ui/react-badge@0.0.14
  - @mijn-ui/react-button@0.0.16
  - @mijn-ui/react-calendar@0.0.16
  - @mijn-ui/react-card@0.0.14
  - @mijn-ui/react-checkbox@0.0.16
  - @mijn-ui/react-collapsible@0.0.11
  - @mijn-ui/react-command@0.0.16
  - @mijn-ui/react-date-picker@0.0.16
  - @mijn-ui/react-dialog@0.0.16
  - @mijn-ui/react-dropdown-menu@0.0.16
  - @mijn-ui/react-input@0.0.14
  - @mijn-ui/react-label@0.0.14
  - @mijn-ui/react-pagination@0.0.16
  - @mijn-ui/react-popover@0.0.16
  - @mijn-ui/react-progress@0.0.14
  - @mijn-ui/react-radio-group@0.0.15
  - @mijn-ui/react-scroll-area@0.0.14
  - @mijn-ui/react-select@0.0.15
  - @mijn-ui/react-separator@0.0.14
  - @mijn-ui/react-skeleton@0.0.14
  - @mijn-ui/react-switch@0.0.14
  - @mijn-ui/react-table@0.0.14
  - @mijn-ui/react-tabs@0.0.15
  - @mijn-ui/react-textarea@0.0.14
  - @mijn-ui/react-core@0.0.6
  - @mijn-ui/react-hooks@0.0.14

## 0.0.4

### Patch Changes

- cc9e490: export components.
- Updated dependencies [a7594eb]
- Updated dependencies [6777e35]
  - @mijn-ui/react-core@0.0.5
  - @mijn-ui/react-theme@0.0.10
  - @mijn-ui/react-accordion@0.0.14
  - @mijn-ui/react-alert@0.0.13
  - @mijn-ui/react-alert-dialog@0.0.15
  - @mijn-ui/react-autocomplete@0.0.15
  - @mijn-ui/react-avatar@0.0.13
  - @mijn-ui/react-badge@0.0.13
  - @mijn-ui/react-button@0.0.15
  - @mijn-ui/react-calendar@0.0.15
  - @mijn-ui/react-card@0.0.13
  - @mijn-ui/react-checkbox@0.0.15
  - @mijn-ui/react-collapsible@0.0.11
  - @mijn-ui/react-command@0.0.15
  - @mijn-ui/react-date-picker@0.0.15
  - @mijn-ui/react-dialog@0.0.15
  - @mijn-ui/react-dropdown-menu@0.0.15
  - @mijn-ui/react-input@0.0.13
  - @mijn-ui/react-label@0.0.13
  - @mijn-ui/react-pagination@0.0.15
  - @mijn-ui/react-popover@0.0.15
  - @mijn-ui/react-progress@0.0.13
  - @mijn-ui/react-radio-group@0.0.14
  - @mijn-ui/react-scroll-area@0.0.13
  - @mijn-ui/react-select@0.0.14
  - @mijn-ui/react-separator@0.0.13
  - @mijn-ui/react-skeleton@0.0.13
  - @mijn-ui/react-switch@0.0.13
  - @mijn-ui/react-table@0.0.13
  - @mijn-ui/react-tabs@0.0.14
  - @mijn-ui/react-textarea@0.0.13
  - @mijn-ui/react-hooks@0.0.13
