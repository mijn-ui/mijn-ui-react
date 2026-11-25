---
"@mijn-ui/react-core": patch
"@mijn-ui/react": patch
---

Fix `createTVUnstyledSlots` / `useTVUnstyled` dropping a slot's variant props
whenever a `className` was passed alongside them. A call such as
`content({ position: "popper", className })` used to drop the whole props
object, so the variant classes disappeared as soon as a consumer set
`className` or the matching `classNames` slot: Select's content and viewport
lost their `popper` classes, DropdownMenu's `Item` / `Label` / `SubTrigger`
lost `inset`, Pagination lost the `active` page style and Autocomplete the
`selected` item style. Only
`className` (and tailwind-variants' `class` alias) is now split off; the
remaining variant props reach the slot function, and the user classes are
merged after the variant classes so they still win conflicts. `unstyled` still
strips the default and variant classes and keeps only the user classes.

Wrappers that re-applied the popper / inset classes by hand as a workaround
can drop them.
