---
"@mijn-ui/react-tabs": patch
---

Fix the active tab having no colour, and give triggers a visible focus ring.

- The active trigger used `text-fg-brand-emphasis`, a token `theme.css` never
  defined, so the class compiled to nothing and the active tab kept the
  inactive `text-fg-secondary` colour. It now uses `text-fg-brand` (also on
  hover), so **the active tab renders in the brand colour** — a visible change.
- Triggers only changed background on keyboard focus. They now also draw a
  2px `ring-outline-brand` ring, inset so it stays inside the tab strip rather
  than overlapping the neighbouring triggers and the underline.
