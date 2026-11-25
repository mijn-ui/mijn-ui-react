---
"@mijn-ui/react-accordion": patch
"@mijn-ui/react-badge": patch
"@mijn-ui/react-button": patch
"@mijn-ui/react-calendar": patch
"@mijn-ui/react-input": patch
"@mijn-ui/react-pagination": patch
"@mijn-ui/react-tabs": patch
"@mijn-ui/react-textarea": patch
"@mijn-ui/react": patch
---

Components that draw a border now name its colour (`border-outline-default`)
instead of relying on the `* { border-color }` rule in `theme.css`'s base
layer: Button (`default` variant, `filled` + `default`, `outlined` +
`default`), Badge (the same three plus `modern` + `default`), Input
(`default` and `underline`), Textarea, Tabs (trigger underline), Pagination
(current page), Calendar (previous / next month buttons) and Accordion
(`outline` items, `solid` frame and dividers; the `solid` divider class was
misspelt `divide-y-outline-default` and generated nothing).

With `theme.css`'s base rule in place nothing looks different. Apps that
load the components without that rule used to get Tailwind v4's
`currentColor` borders (dark text-coloured outlines) on these components,
and apps whose own base rule sets a different border colour used to have it
show through on them; both now get the theme's `outline-default`.
