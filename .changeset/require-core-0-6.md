---
"@mijn-ui/react-alert-dialog": patch
"@mijn-ui/react-avatar": patch
"@mijn-ui/react-autocomplete": patch
"@mijn-ui/react-alert": patch
"@mijn-ui/react-accordion": patch
"@mijn-ui/react-breadcrumb": patch
"@mijn-ui/react-badge": patch
"@mijn-ui/react-card": patch
"@mijn-ui/react-command": patch
"@mijn-ui/react-checkbox": patch
"@mijn-ui/react-scroll-area": patch
"@mijn-ui/react-button": patch
"@mijn-ui/react-tabs": patch
"@mijn-ui/react-dropdown-menu": patch
"@mijn-ui/react-input": patch
"@mijn-ui/react-calendar": patch
"@mijn-ui/react-radio-group": patch
"@mijn-ui/react-progress": patch
"@mijn-ui/react-popover": patch
"@mijn-ui/react-select": patch
"@mijn-ui/react-separator": patch
"@mijn-ui/react-switch": patch
"@mijn-ui/react-table": patch
"@mijn-ui/react-segmented-control": patch
"@mijn-ui/react-pagination": patch
"@mijn-ui/react-label": patch
"@mijn-ui/react-toast": patch
"@mijn-ui/react-slider": patch
"@mijn-ui/react-tooltip": patch
"@mijn-ui/react-charts": patch
"@mijn-ui/react-sonner": patch
"@mijn-ui/react-skeleton": patch
"@mijn-ui/react-dialog": patch
"@mijn-ui/react-textarea": patch
---

Require `@mijn-ui/react-core` `^0.6.0` (was `^0.5.0`). The components now
read the `--mijn-radius-*` / `--mijn-shadow-*` tokens and the
`mijn-focus-ring` utility, which only `theme.css` from 0.6 defines; with an
older `theme.css` they would lose their corner radius, shadow and focus ring.
