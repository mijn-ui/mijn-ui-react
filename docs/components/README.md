# Mijn UI — Components

Per-component documentation for **Mijn UI (V2)**, sourced from the **❖ Components**
page of the Figma file
[_Mijn UI Design System (V2)_](https://www.figma.com/design/m4ZT4DlFgfYIDkSLZsTkaZ/Mijn-UI-Design-System--V2-?node-id=153-152)
and cross-referenced with the React packages under
[`packages/components/`](../../packages/components/).

Each page lists the component's **Figma variant properties** (the design spec),
a **screenshot** of the component set, and—where one exists—the matching **code
package** with its anatomy (compound parts) and prop types. Components consume
the [Foundation tokens](../foundation/README.md) (color, spacing, radius, etc.).

## Components in the Figma file

| Component | Figma variants | Code package |
|-----------|----------------|--------------|
| [Accordion](./accordion.md) | Intent, Size, State, isOpened, isHovered | `@mijn-ui/react-accordion` |
| [Avatar](./avatar.md) | Size (2xs–xl), hasImage | `@mijn-ui/react-avatar` |
| [Badge](./badge.md) | Type, Tone, Shape, Size, State | `@mijn-ui/react-badge` |
| [Breadcrumb](./breadcrumb.md) | State | — _(Figma only)_ |
| [Button](./button.md) | Type, Size, State, Icon Only | `@mijn-ui/react-button` |
| [Calendar](./calendar.md) | Type, State, isEnabled | `@mijn-ui/react-calendar` |
| [Checkbox](./checkbox.md) | Type (Check/Indeterminate/Radio), isChecked, isEnabled | `@mijn-ui/react-checkbox` (+ `react-radio-group`) |
| [Date Picker](./date-picker.md) | Type, Active, Alignment, isOpened | — _(composed)_ |
| [Dialog](./dialog.md) | (compound) | `@mijn-ui/react-dialog` |
| [Dropdown](./dropdown.md) | Alignment, isOpened | `@mijn-ui/react-dropdown-menu` |
| [Helper Tooltip](./helper-tooltip.md) | Align (6), isOpen | — _(composed)_ |
| [Input](./input.md) | Type, Size, State, isError | `@mijn-ui/react-input` |
| [Pagination](./pagination.md) | Type, State | `@mijn-ui/react-pagination` |
| [Progress](./progress.md) | Percent (0–100%) | `@mijn-ui/react-progress` |
| [Row Item](./row-item.md) | Size, State | — _(≈ menu item)_ |
| [Segmented Control](./segmented-control.md) | Size, isActive, Only Icon | — _(≈ tabs)_ |
| [Switch](./switch.md) | isOn, isEnabled | `@mijn-ui/react-switch` |
| [Tab](./tab.md) | State | `@mijn-ui/react-tabs` |
| [Toast](./toast.md) | (single) | — _(Figma only)_ |

## Code packages not in this Figma file

These ship as React packages but don't have a dedicated section on the V2
Components page (they may be planned, or composed from primitives):

`@mijn-ui/react-alert` · `react-alert-dialog` · `react-autocomplete` ·
`react-card` · `react-collapsible` · `react-command` · `react-label` ·
`react-popover` · `react-radio-group` · `react-scroll-area` · `react-select` ·
`react-separator` · `react-skeleton` · `react-table` · `react-textarea`

## Conventions

- **Variant property → code prop.** Figma encodes variants in layer names like
  `Type=Brand, Size=Large, State=Default`. In code these map to component props
  (e.g. `variant`, `size`) plus interaction states handled at runtime
  (`State=Hovered/Focused/Disabled` → `:hover` / `:focus-visible` / `disabled`).
- **Tone naming.** Figma `Type=Error` / `Tone=Error` corresponds to the
  `danger` color role in [Foundation → Colors](../foundation/colors.md). `Brand`
  maps to the brand role.
- **Anatomy.** Components are built as **compound components** (e.g. `Dialog` +
  `DialogTrigger` + `DialogContent`), with styling exposed through per-slot
  classes (the `*Slots` types).
