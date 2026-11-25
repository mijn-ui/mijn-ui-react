---
"@mijn-ui/react-badge": minor
---

Badge renders inline, gains `asChild`, and loses its button-like states.

- **`asChild`** (new): renders the badge's styling onto its only child instead
  of its own element — `<Badge asChild><a href="…">INV-42</a></Badge>`.
- **Inline by default.** The badge is now a `<span>` with `inline-flex`
  instead of a `<div>` with `flex`, so it can sit inside a sentence, a `<p>`
  or a `<button>` without invalid nesting. Inside a flex or grid container
  the browser blockifies `inline-flex` to `flex`, so badges in a row look
  exactly as before. What changes: **a badge on its own in a block container
  no longer stretches to the full width** — it shrinks to its content. Add
  `className="flex"` (or `w-full`) where the old stretch was wanted.
- **No hover, press or disabled states.** Every variant carried button-style
  `hover:` and `active:` colour changes (some swapped to the solid colour on
  hover), so a static label looked clickable. They are gone; the
  `focus-visible` ring stays, for `asChild` links.
- `BadgeProps` is now based on `ComponentPropsWithRef<"span">` (it was
  `HTMLAttributes<HTMLDivElement>`), so a `ref` is accepted and typed.
