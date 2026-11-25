---
"@mijn-ui/react-input": minor
---

Add a `bare` mode to Input, and stop forcing an `id` and an empty
`placeholder` onto inputs that have no label.

- **`bare`** (new): `<Input bare … />` renders the `<input>` alone — no
  wrapper `<div>`, no generated `id`, no `placeholder=""` — so it can replace a
  plain `<input>` in a form that already lays out and labels its own fields.
  Every prop passes through to the input (`id`, `placeholder`, `name`, `ref`,
  …). The wrapper's disabled look (`opacity-50`, not-allowed cursor) moves
  onto the input. `bare` is ignored when `startIcon`, `endIcon` or `label` is
  set, because those are positioned against the wrapper. Without `bare`
  nothing changes structurally: the wrapper stays.
- **Attribute change (no visual change)**: a wrapped input **without a
  `label`** no longer gets a generated `id` or `placeholder=""`. Both existed
  only for the floating label (the `htmlFor` link, and `:placeholder-shown`
  for its position), and are still set whenever `label` is. Your own `id` and
  `placeholder` are always passed through. If you styled an unlabelled
  `Input` with `:placeholder-shown`, pass `placeholder=""` yourself.
- Removes two classes that compiled to nothing: `rtl:left` on the floating
  label and `border-b-sm` on the `underline` variant (the `border-b` next to
  it already draws that border). No visual change.
