---
"@mijn-ui/react-accordion": patch
"@mijn-ui/react-alert-dialog": patch
"@mijn-ui/react-autocomplete": patch
"@mijn-ui/react-avatar": patch
"@mijn-ui/react-button": patch
"@mijn-ui/react-checkbox": patch
"@mijn-ui/react-collapsible": patch
"@mijn-ui/react-dialog": patch
"@mijn-ui/react-dropdown-menu": patch
"@mijn-ui/react-label": patch
"@mijn-ui/react-popover": patch
"@mijn-ui/react-progress": patch
"@mijn-ui/react-radio-group": patch
"@mijn-ui/react-scroll-area": patch
"@mijn-ui/react-segmented-control": patch
"@mijn-ui/react-select": patch
"@mijn-ui/react-separator": patch
"@mijn-ui/react-slider": patch
"@mijn-ui/react-switch": patch
"@mijn-ui/react-tabs": patch
"@mijn-ui/react-tooltip": patch
"@mijn-ui/react": patch
---

Align every `@radix-ui/*` dependency on one release set (the 2026-10-12 set:
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
