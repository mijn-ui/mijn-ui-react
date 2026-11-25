# @mijn-ui/react-segmented-control

A row of mutually exclusive choices in one pill: "This month · Last 30 days ·
Last 7 days", "To check · Fixed · Not a conflict". One tab stop; the arrow keys
move between the options and select as they go, skipping unavailable ones.

[Documentation](https://mijn-ui.vercel.app/react/docs/components/segmented-control)

## Installation

```sh
npm install @mijn-ui/react-segmented-control
```

## Usage

Name the control with `aria-label` or `aria-labelledby`. It is controlled with
`value` / `onValueChange`, or uncontrolled with `defaultValue`.

### An answer the user gives

`semantics="radio"` is the default: a `radiogroup` of `radio`s.

```tsx
<SegmentedControl
  aria-labelledby={labelId}
  value={mode}
  onValueChange={setMode}
>
  <SegmentedControlItem value="existing">Add to existing</SegmentedControlItem>
  <SegmentedControlItem value="new">Start new category</SegmentedControlItem>
</SegmentedControl>
```

A question that has not been answered yet takes `value={null}`. Nothing is
checked, Tab lands on the first enabled option without choosing it, and Space or
an arrow key answers it. (`undefined` means uncontrolled, as it does for React's
own inputs, so it cannot also mean "unanswered".)

The value type follows `value`, so a union stays a union:
`<SegmentedControl<Decision> value={decision} onValueChange={setDecision}>`.

### A filter that switches what a list shows

`semantics="tabs"` makes it a `tablist` of `tab`s. Point `aria-controls` at
the list it filters if you want that relationship announced.

```tsx
<SegmentedControl
  semantics="tabs"
  aria-label="Status"
  value={status}
  onValueChange={setStatus}
>
  <SegmentedControlItem value="open" count={counts.open.toLocaleString("en")}>
    To check
  </SegmentedControlItem>
  <SegmentedControlItem value="fixed" count={counts.fixed.toLocaleString("en")}>
    Fixed
  </SegmentedControlItem>
</SegmentedControl>
```

`count` is shown after the label, muted, and is part of the option's name
("To check 3"). Format it yourself. The component picks no locale, so the
server and the client render the same text.

### An option that is unavailable, and why

`disabledReason` disables the option and makes the reason its accessible
description. The visible tooltip is composed with `@mijn-ui/react-tooltip`
(or your app's own tooltip):

```tsx
<SegmentedControl
  aria-label="What to do with handbook.pdf"
  value={decision}
  onValueChange={setDecision}
>
  <SegmentedControlItem value="skip">Skip</SegmentedControlItem>
  <Tooltip>
    <TooltipTrigger asChild>
      <SegmentedControlItem value="replace" disabledReason={REASON}>
        Replace
      </SegmentedControlItem>
    </TooltipTrigger>
    <TooltipContent>{REASON}</TooltipContent>
  </Tooltip>
</SegmentedControl>
```

`disabled` alone does the same without a reason.

### Sizes

`size="sm"` (default) is 32px tall overall, the height of `<Button size="sm">`.
`size="xs"` is 24px, for a control repeated on every row of a list.

## Keyboard

- **Tab** lands on the selected option, or on the first enabled one when
  nothing is selected, and **Tab** again leaves. The whole control is one
  tab stop.
- **Arrow keys** move focus and select the option they land on. They wrap
  around and skip unavailable options. A radio group answers all four arrows;
  a tablist is horizontal and answers Left and Right only, as the ARIA
  practices describe.
- **Space** selects the focused option.

## Design decisions

### Tabs semantics are built in, on Radix Tabs

The first consumer has 17 call sites and 11 of them are filters that need
tabs semantics. The look and the keyboard model are the same either way, so it
is one component with a `semantics` prop rather than two.

Composing mijn-ui `Tabs` instead was considered. `TabsTrigger` is the
underlined, page-level tab, so every call site would restyle it into
segments and rebuild the count and the unavailable state. That is the
app-local code this package exists to replace.

Each semantics sits on the Radix primitive built for it:
`@radix-ui/react-radio-group` for radio and `@radix-ui/react-tabs` for tabs.
The other route was one radio group with its roles overwritten, which would
leave radio-only behaviour behind: a hidden `<input type="radio">` inside
forms, and `aria-required` on a tablist. Both primitives use Radix's
roving-focus group, so the keyboard handling is the same code.
`@radix-ui/react-tabs` is already in this repo through `@mijn-ui/react-tabs`.

There are no tab panels. Radix points every tab's `aria-controls` at a panel
it would render with `Tabs.Content`, but a segmented filter re-renders one list
rather than switching between panels, so that default would be a reference to
an element that does not exist. It is dropped unless you pass your own. If
each choice really has its own panel, use `Tabs` from `@mijn-ui/react-tabs`.

A tablist always has a selection: focusing a tab selects it. `value={null}`
is for radio. In tabs it just means no tab is selected until one gets focus.

### Disabled with a reason: the description is built in, the tooltip is composed

The package does not depend on `@mijn-ui/react-tooltip`:

- A mijn-ui `Tooltip` throws without a `TooltipProvider` above it. If this
  package rendered one, a page that never mounted the provider would work
  until the first time an option became unavailable, for example for a user
  without a permission, and then crash.
- It would add Radix Tooltip and its positioning engine to every install,
  for a case one call site in seventeen uses.
- Apps already have a tooltip, and this way they keep using it.

The package does own the parts that are easy to get wrong:

- The option gets `aria-disabled`, not the native `disabled` attribute. A
  natively disabled button receives no pointer events in most browsers, so
  no tooltip can open on it.
- It is still unavailable: the arrow keys skip it, and click, Space and Enter
  do not select it.
- The reason is wired up as the option's description through
  `aria-describedby`, and it is there all the time. A Radix tooltip describes
  its trigger only while it is open, and keyboard users never open this one,
  since the arrow keys pass the option by.
- The selected look is keyed on `aria-checked` / `aria-selected`, not
  `data-state`. A `TooltipTrigger` writes its own `data-state` onto the
  element it wraps.

The cost is that the reason is written twice, once in `disabledReason` and
once in `TooltipContent`. An app with many such options can wrap the pair in
a few lines of its own.

### Colours

The track is `bg-bg-secondary` and the selected segment `bg-bg-default-alt`,
the raised-surface token. In dark mode that is lighter than the track, while
`bg-bg-default` would sink below it. Unselected labels and counts are
`text-fg-secondary`. `text-fg-tertiary` is the usual muted tone, but at 4.43:1
on the light track and 3.65:1 on the dark one it is under the 4.5:1 that text
this small needs.

## License

This project is licensed under the terms of the [MIT license.](https://github.com/mijn-ui/mijn-ui-react/blob/main/LICENSE)
