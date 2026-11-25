---
"@mijn-ui/react-calendar": patch
---

Fix a fused class on the selected day, and make keyboard focus on a day
visible.

- The `selected` slot ended in `focus:!bg-bg-brandfocus:!text-on-bg-brand` —
  two classes joined by a missing space, which Tailwind compiles to nothing.
  It is now `focus-within:bg-bg-brand! focus-within:text-on-bg-brand!`:
  `focus-within` rather than `focus` because the class sits on the day cell
  and focus lands on the button inside it.
- For the same reason the day's focus ring (`focus-visible:ring-*`) never
  matched, so **moving through the grid with the keyboard showed no focus at
  all**. It now keys off `has-focus-visible:`, so the focused day draws the
  brand ring — a visible change for keyboard users.
