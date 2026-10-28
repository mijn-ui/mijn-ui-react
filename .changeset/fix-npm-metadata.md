---
"@mijn-ui/react-accordion": patch
"@mijn-ui/react-alert-dialog": patch
"@mijn-ui/react-alert": patch
"@mijn-ui/react-autocomplete": patch
"@mijn-ui/react-avatar": patch
"@mijn-ui/react-badge": patch
"@mijn-ui/react-breadcrumb": patch
"@mijn-ui/react-button": patch
"@mijn-ui/react-calendar": patch
"@mijn-ui/react-card": patch
"@mijn-ui/react-charts": patch
"@mijn-ui/react-checkbox": patch
"@mijn-ui/react-collapsible": patch
"@mijn-ui/react-command": patch
"@mijn-ui/react-core": patch
"@mijn-ui/react-dialog": patch
"@mijn-ui/react-dropdown-menu": patch
"@mijn-ui/react-input": patch
"@mijn-ui/react-label": patch
"@mijn-ui/react-pagination": patch
"@mijn-ui/react": patch
"@mijn-ui/react-popover": patch
"@mijn-ui/react-progress": patch
"@mijn-ui/react-radio-group": patch
"@mijn-ui/react-scroll-area": patch
"@mijn-ui/react-select": patch
"@mijn-ui/react-separator": patch
"@mijn-ui/react-skeleton": patch
"@mijn-ui/react-switch": patch
"@mijn-ui/react-table": patch
"@mijn-ui/react-tabs": patch
"@mijn-ui/react-textarea": patch
"@mijn-ui/react-toast": patch
"@mijn-ui/shared-icons": patch
---

Fix package metadata on npm

- Point the README "Documentation" link and the `homepage` field at the live docs site (`https://mijnui.vercel.app/docs/react`); the old `mijn-ui.vercel.app` domain returns 404.
- Add READMEs and descriptions to `@mijn-ui/react`, `@mijn-ui/react-core`, `@mijn-ui/react-breadcrumb` and `@mijn-ui/react-toast`, which showed "No README" on npm.
- Correct `repository.directory` for `react`, `react-core`, `react-alert-dialog` and `shared-icons`.

No code changes.
