---
"@mijn-ui/react-progress": patch
---

Forward `value` and `max` to the Radix root, so the progress bar is
announced, and fill the bar relative to `max`.

- `Progress` took `value` out of its props to size the indicator and never
  passed it on, so Radix always saw no value: no `aria-valuenow`, no
  `aria-valuetext`, and `data-state="indeterminate"` at every value. Both
  `value` and `max` now reach the root. **Screen readers announce the value**
  (e.g. "40%"), and **`data-state` is `loading` / `complete`** (still
  `indeterminate` without a value); `data-value` / `data-max` are set too. If
  you styled `data-[state=indeterminate]:` expecting it at every value, it now
  only matches a progress bar without one.
- The indicator assumed `max` was 100. **With another `max` the bar now fills
  to the right fraction** — `value={40} max={200}` fills 20%, not 40%. A value
  outside `0..max` is clamped for the bar (Radix still logs it and reports it
  as indeterminate).
