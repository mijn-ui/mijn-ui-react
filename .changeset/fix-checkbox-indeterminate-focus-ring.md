---
"@mijn-ui/react-checkbox": patch
---

Fix the checkbox's hairline indeterminate mark and its uncoloured focus ring.

- **Indeterminate**: the mark was `DividerHorizontalIcon`, a filled bar one
  unit thick on a 15-unit grid — about 1px at the default 16px icon, a
  hairline at smaller sizes. It is now `MinusIcon` with a 3-unit stroke on a
  24-unit grid: 2px at 16px, 1.5px at 12px. **The indeterminate bar is
  visibly bolder**, close to the check mark's weight. A `stroke-*` class in
  `classNames.icon` overrides the stroke.
- **Focus ring**: the base had `focus-visible:ring-2` but no ring colour, so
  Tailwind v4 used `currentColor` and the ring came out in the text colour
  (black in light mode). It now uses the theme's `mijn-focus-ring` (a 2px
  outline with a transparent 2px gap, as every control in 0.8) coloured by
  `ring-outline-brand`. **The keyboard focus ring is brand-coloured.**
- Reads the theme's own radius (`rounded-(--mijn-radius-sm)`, the same 6px)
  and gives its border an explicit `border-outline-default`. No visual change.
