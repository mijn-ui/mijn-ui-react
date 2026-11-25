---
"@mijn-ui/react-button": minor
---

Add a `link` variant to Button: brand-coloured text that underlines on hover,
with no fill, border or shadow — what apps were building out of
`brand-plain` minus its hover fill. It keeps the button's height and padding
(from `size`), so it lines up next to other buttons, and works with `asChild`
to render an `<a>`:

```tsx
<Button variant="link">Cancel</Button>
<Button variant="link" asChild>
  <a href="/help">Read the guide</a>
</Button>
```

Existing variants are unchanged.
