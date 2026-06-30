# Mijn UI — Documentation

Documentation for **Mijn UI (V2)**, generated from the Figma file
[_Mijn UI Design System (V2)_](https://www.figma.com/design/m4ZT4DlFgfYIDkSLZsTkaZ/Mijn-UI-Design-System--V2-)
and cross-referenced with the React packages in
[`packages/`](../packages/).

## Sections

- **[Foundation](./foundation/README.md)** — design tokens: colors, typography,
  spacing, radius, shadow, focus ring, outline, iconography.
- **[Components](./components/README.md)** — the 19 components from the Figma
  **❖ Components** page, each mapped to its code package where one exists.
- **[Tailwind v4 Migration](./tailwind-v4-migration.md)** — step-by-step guide
  for upgrading your project from Tailwind CSS v3 to v4 with Mijn UI.

## Source

| | |
|---|---|
| Figma file | `m4ZT4DlFgfYIDkSLZsTkaZ` — _Mijn UI Design System (V2)_ |
| Pages | **◉ Foundation** (tokens) · **❖ Components** (components) |
| Token source of truth (code) | [`packages/core/src/theme.css`](../packages/core/src/theme.css) |
| Component packages | [`packages/components/`](../packages/components/) |

> Screenshots and token values in these docs were pulled directly from Figma via
> the Figma MCP; component anatomy and prop types come from the actual package
> source. Where a Figma component has no code package yet, the page says so and
> shows how to compose it.
