---
"@mijn-ui/react-core": minor
"@mijn-ui/react-alert-dialog": patch
"@mijn-ui/react-badge": patch
"@mijn-ui/react-button": patch
"@mijn-ui/react-calendar": patch
"@mijn-ui/react-dialog": patch
"@mijn-ui/react-input": patch
"@mijn-ui/react-pagination": patch
"@mijn-ui/react-popover": patch
"@mijn-ui/react-radio-group": patch
"@mijn-ui/react-select": patch
"@mijn-ui/react-slider": patch
"@mijn-ui/react-textarea": patch
"@mijn-ui/react": patch
---

The focus ring no longer leaves a dark band around controls on raised
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
