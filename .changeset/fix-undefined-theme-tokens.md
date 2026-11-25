---
"@mijn-ui/react-breadcrumb": patch
"@mijn-ui/react-progress": patch
"@mijn-ui/react-toast": patch
---

Fix three components that styled themselves with class names the theme does not
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
