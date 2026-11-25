---
"@mijn-ui/react-select": patch
---

Fix Select's trigger icon styling, trigger minimum width and content width.

- **Trigger icons**: `[&_svg]:size-4 [&_svg]:opacity-50` hit every icon in
  the trigger, so an icon in the selected value (a status dot, a flag) was
  dimmed and resized. Now only the chevron (`data-slot="select-trigger-icon"`,
  including a custom `icon`) is dimmed, and the 16px default size applies only
  to icons without their own `size-*` class. **Icons in the selected value
  render at full opacity**, and a custom `icon` keeps its own `size-*`.
- **Trigger width**: the trigger had `min-w-44` (176px), so it could not be
  made narrower. Removed. **A trigger in a tight or content-sized container
  can now be narrower than 176px**; add `className="min-w-44"` to keep the old
  floor.
- **Content width**: the content was a fixed `w-60` (240px) with
  `overflow-hidden`, so under a trigger wider than 240px the options were
  clipped, and under a narrow one the list was wider than the trigger. In
  popper mode (the default) it is now at least as wide as the trigger
  (`--radix-select-trigger-width`), grows for a longer option, and stops at
  the viewport edge (`--radix-select-content-available-width`). In
  `item-aligned` mode it takes Radix's own trigger-based minimum width. **The
  list now lines up with its trigger** instead of always being 240px.
- `SelectContent` merges its `className` outside the slot call, so the popper
  classes (sizing and side offsets) no longer disappear when a `className` is
  passed with `@mijn-ui/react-core` 0.5.1 or earlier.
