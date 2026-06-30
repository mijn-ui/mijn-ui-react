# Mijn UI — Foundation

Design-system foundations for **Mijn UI (V2)**, documented directly from the
Figma file [_Mijn UI Design System (V2)_](https://www.figma.com/design/m4ZT4DlFgfYIDkSLZsTkaZ/Mijn-UI-Design-System--V2-)
and cross-referenced against the runtime token source in
[`packages/core/src/theme.css`](../../packages/core/src/theme.css).

> **Scope.** The V2 Figma file is a **Foundation** file — it documents design
> tokens (color, type, spacing, etc.), **not** individual components. These
> pages therefore describe the token system. Component packages live under
> [`packages/components/`](../../packages/components/) and consume these tokens.

## Pages

| Page | What it covers |
|------|----------------|
| [Colors](./colors.md) | Primitive palette, background / on-background / foreground / outline color roles, light + dark |
| [Typography](./typography.md) | Inter type scale (xs–4xl) in regular / medium / semi-bold |
| [Spacing](./spacing.md) | 8px-based number system, 1px–80px, positive and negative |
| [Corner Radius](./radius.md) | Radius scale 2px → full |
| [Shadow](./shadow.md) | Drop-shadow elevation scale xs → 3xl |
| [Focus Ring](./focus-ring.md) | Focus indicator styles (brand / success / warning / danger) |
| [Outline](./outline.md) | Outline (border) width scale base / medium / bold |
| [Iconography](./iconography.md) | Icon set (~160 icons, stroke + solid variants) |

## Token naming: Figma vs. code

The Figma variables and the CSS variables in `theme.css` describe the same
system but use **two conventions you should know about**:

| Concept | Figma variable | CSS variable (code) |
|---------|----------------|---------------------|
| Neutral default role | `color/*/primary` | `--color-*-default` |
| Secondary role | `color/*/secondary` | `--color-*-secondary` |
| Color format | Hex (`#f05023`) | HSL (`hsl(21 90% 48%)`) |
| Spacing token | `space/positive/*` (and numeric `number/positive/*`) | Tailwind spacing scale |
| Radius / Shadow | `radius/*`, `shadow/drop/*` | `--radius-*`, `--shadow-*` (identical values) |

So Figma's `color/bg/primary` (`#ffffff`) is the code's `--color-bg-default`
(`hsl(0 0 100%)`). Radius and shadow values match exactly between the two.

> **Note on labels in Figma.** A couple of layer labels in the file contain
> typos — `Semitic` (means _Semantic_) and `foucs-ring` (means _focus-ring_).
> These pages use the corrected spellings in prose.

## Themes

Tokens are defined for **light** (`@theme` / `:root`) and **dark** (`.dark`)
modes in `theme.css`. The Figma file shows light-mode swatches with paired
light/dark cells in the color sections; the dark values quoted in these docs
come from the code, which is the source of truth for dark mode.
