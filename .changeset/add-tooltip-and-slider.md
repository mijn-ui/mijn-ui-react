---
"@mijn-ui/react-tooltip": minor
"@mijn-ui/react-slider": minor
"@mijn-ui/react": minor
---

Add `Tooltip` and `Slider`, two primitives the library did not ship.

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
