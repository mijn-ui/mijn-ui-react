---
"@mijn-ui/react-segmented-control": minor
"@mijn-ui/react": minor
---

Add `@mijn-ui/react-segmented-control`: `SegmentedControl` and
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
