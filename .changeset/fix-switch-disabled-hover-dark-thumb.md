---
"@mijn-ui/react-switch": patch
---

Fix the disabled switch swallowing hover, and the thumb disappearing in dark
mode.

- **Disabled**: `disabled:pointer-events-none` meant a disabled switch never
  received hover, so a `title` explaining why it is disabled never showed. It
  now uses `disabled:cursor-not-allowed` instead. **A disabled switch shows a
  not-allowed cursor and its `title` tooltip on hover**; it still cannot be
  toggled (the native `disabled` attribute does that).
- **Dark mode**: the unchecked thumb was `bg-default`, which in dark mode is
  near-black — about the darkness of the unchecked track (contrast ~1.3:1),
  and the shadow that sets it off in light mode is invisible on a dark page.
  Under `.dark` the unchecked thumb is now `fg-default` (white), ~15:1 against
  the track. Light mode and the checked thumb are unchanged. The override keys
  off a `.dark` ancestor, the same class theme.css switches its tokens on.
