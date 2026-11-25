# Shadow

[← Foundation](./README.md)

> Shadows add depth and realism by positioning elements on the z-axis. Use a
> larger shadow to lift an element further off the surface.

![Shadow scale](./assets/shadow.png)

## Elevation scale

All shadows share the same shadow color (`rgba(16, 24, 40, …)` — a deep slate)
and grow in offset, blur, and opacity as elevation increases. Values match
[`theme.css`](../../packages/core/src/theme.css) exactly.

| Figma token | CSS variable | Value |
|-------------|--------------|-------|
| `shadow/drop/xs`  | `--mijn-shadow-xs`  | `0 1px 2px rgba(16,24,40,0.05)` |
| `shadow/drop/sm`  | `--mijn-shadow-sm`  | `0 1px 3px rgba(16,24,40,0.1)`, `0 1px 2px rgba(16,24,40,0.06)` |
| `shadow/drop/md`  | `--mijn-shadow-md`  | `0 4px 8px rgba(16,24,40,0.1)`, `0 2px 4px rgba(16,24,40,0.06)` |
| `shadow/drop/lg`  | `--mijn-shadow-lg`  | `0 12px 16px rgba(16,24,40,0.08)`, `0 4px 6px rgba(16,24,40,0.03)` |
| `shadow/drop/xl`  | `--mijn-shadow-xl`  | `0 20px 24px rgba(16,24,40,0.08)`, `0 8px 8px rgba(16,24,40,0.03)` |
| `shadow/drop/2xl` | `--mijn-shadow-2xl` | `0 24px 48px rgba(16,24,40,0.18)` |
| `shadow/drop/3xl` | `--mijn-shadow-3xl` | `0 32px 64px rgba(16,24,40,0.14)` |

> `sm` through `xl` are **two-layer** shadows (a soft ambient layer + a tighter
> contact layer); `xs`, `2xl`, and `3xl` are single-layer.

The tokens carry a `mijn-` prefix so they never collide with Tailwind's own
shadow scale: `shadow-sm`, `shadow-lg` … in your app keep Tailwind's values.

## Suggested elevation mapping

| Level | Token | Typical use |
|-------|-------|-------------|
| Flat / hairline | `xs` | Cards, inputs at rest |
| Raised | `sm` / `md` | Hovered cards, dropdowns, small popovers |
| Floating | `lg` / `xl` | Popovers, menus, tooltips |
| Overlay | `2xl` / `3xl` | Dialogs, modals, command palette |

## Usage

```tsx
<div className="shadow-(--mijn-shadow-xs) rounded-(--mijn-radius-base)">Resting card</div>
<div className="shadow-(--mijn-shadow-lg) rounded-(--mijn-radius-lg)">Popover</div>
<div className="shadow-(--mijn-shadow-2xl) rounded-(--mijn-radius-lg)">Modal</div>
```

## Tailwind's scale is not changed

Up to `@mijn-ui/react-core` 0.5, `theme.css` redefined Tailwind's
`--shadow-xs` … `--shadow-2xl` with the values above, so importing it changed
`shadow-*` across your whole app. It no longer does: `shadow-xs` …
`shadow-2xl` in your code are Tailwind's defaults again (black rather than
slate, and `md` / `lg` / `xl` / `2xl` with smaller offsets and negative
spread). `shadow-3xl`, which Tailwind does not have, is still defined. To keep
the old values in your own code, put them back in your `@theme`; Mijn UI
components are not affected either way:

```css
@theme {
  --shadow-xs: 0 1px 2px rgba(16, 24, 40, 0.05);
  --shadow-sm: 0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06);
  --shadow-md: 0 4px 8px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06);
  --shadow-lg: 0 12px 16px rgba(16, 24, 40, 0.08), 0 4px 6px rgba(16, 24, 40, 0.03);
  --shadow-xl: 0 20px 24px rgba(16, 24, 40, 0.08), 0 8px 8px rgba(16, 24, 40, 0.03);
  --shadow-2xl: 0 24px 48px rgba(16, 24, 40, 0.18);
}
```
