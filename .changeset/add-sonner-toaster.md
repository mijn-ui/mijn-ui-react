---
"@mijn-ui/react-sonner": minor
---

Add `@mijn-ui/react-sonner` — a [`sonner`](https://sonner.emilkowal.ski)
`<Toaster />` dressed in the mijn-ui theme, mapping sonner's surface variables
(`--normal-bg`, `--success-bg`, …) onto the theme tokens so toasts follow
light/dark and any re-themed palette with no per-app restyling.

`sonner` is a **peer** dependency rather than a bundled one. Its queue is module
state, so a second copy would accept `toast()` calls into a store the mounted
`<Toaster />` is not rendering — the toasts would never appear, with no error to
explain it. As a peer there is exactly one copy, so importing `toast` from this
package or straight from `sonner` reaches the same queue.

For the same reason the package is **not** re-exported from the
`@mijn-ui/react` barrel: that barrel is a single entry with no subpaths, so
re-exporting it would pull sonner's bytes, and its peer requirement, into every
app importing anything from `@mijn-ui/react`. Install it directly:

```sh
npm install @mijn-ui/react-sonner sonner
```
