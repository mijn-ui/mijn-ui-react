---
"@mijn-ui/react-calendar": minor
"@mijn-ui/react": minor
---

`Calendar` no longer wraps `react-day-picker`: it is its own implementation,
and depends only on React, `@mijn-ui/react-core`, `@mijn-ui/shared-icons` and
the `tailwind-variants` / `tailwind-merge` peers, like every other component.

`react-day-picker` was the only reason mijn-ui installed `date-fns`,
`@date-fns/tz` and `date-fns-jalali` (and, from react-day-picker 9.14 on,
`@tabby_ai/hijri-converter`) — packages without npm provenance — and loading
date-fns's locales made `import "@mijn-ui/react"` take about two seconds in
Node. All of them are gone from the dependency tree.

The props keep react-day-picker 9's names, value shapes and range behaviour, so
most calendars need no change:

- `mode` (`"single"`, `"multiple"`, `"range"`), `selected`, `onSelect`,
  `required`, `min`, `max`; `DateRange` and `Matcher` are now exported from
  `@mijn-ui/react-calendar` (and `@mijn-ui/react`).
- `disabled` and `hidden` with the same matchers.
- `month`, `defaultMonth`, `onMonthChange`, `startMonth`, `endMonth`,
  `numberOfMonths`, `showOutsideDays` (still `true` by default), `fixedWeeks`,
  `weekStartsOn`, `today`, `captionLayout` (`"label"` or `"dropdown"`, now
  native `<select>`s), `autoFocus`.
- `className`, `classNames`, `unstyled`, `data-slot="calendar"`, and the
  default look: apart from the weekday names (below), the calendar renders
  pixel for pixel as before.

Keyboard support follows the WAI-ARIA date picker grid: one tab stop, arrow
keys, Home / End, Page Up / Page Down (Shift for years), Enter / Space, with
disabled days skipped and focus following into the next month.

**Migrating**

- `locale` is now a BCP 47 language tag (`locale="nl-NL"`), not a date-fns
  locale object. It defaults to `"en-US"`, and it no longer sets the first day
  of the week: pass `weekStartsOn={1}` for Monday.
- `labels` now takes strings — `previousMonth`, `nextMonth`, `monthDropdown`,
  `yearDropdown`, `navigation` — instead of react-day-picker's `labelPrevious`
  / `labelNext` / … functions. The English defaults are unchanged.
- `classNames` takes this package's slot names (`base`, `months`, `month`,
  `month_caption`, `caption_label`, `nav`, `button_previous`, `button_next`,
  `dropdowns`, `dropdown`, `month_grid`, `weekdays`, `weekday`, `weeks`,
  `week`, `day`, `day_button`, `selected`, `range_start`, `range_middle`,
  `range_end`, `today`, `outside`, `disabled`, `hidden`) and is merged into the
  default classes with tailwind-merge, as everywhere else in mijn-ui; with
  react-day-picker a key replaced its default classes. The `rdp-*` class names
  are no longer rendered.
- Import `DateRange` and `Matcher` from `@mijn-ui/react-calendar`. Code that
  imported `react-day-picker` itself relied on it being installed alongside;
  add it to your own dependencies if you still need it.
- These props are removed: `components`, `formatters`, `styles`, `modifiers`,
  `modifiersClassNames`, `modifiersStyles`, `dateLib`, `timeZone`,
  `broadcastCalendar`, `ISOWeek`, `numerals`, `firstWeekContainsDate`,
  `useAdditionalDayOfYearTokens`, `useAdditionalWeekYearTokens`, `footer`,
  `showWeekNumber`, `hideWeekdays`, `hideNavigation`, `disableNavigation`,
  `navLayout`, `reverseMonths`, `reverseYears`, `pagedNavigation`, `animate`,
  `excludeDisabled`, `captionLayout="dropdown-months"` and
  `"dropdown-years"`, `onDayClick`, `onDayFocus`, `onDayBlur`,
  `onDayKeyDown`, `onDayKeyPress`, `onDayKeyUp`, `onDayMouseEnter`,
  `onDayMouseLeave`, `onDayPointerEnter`, `onDayPointerLeave`,
  `onDayTouchStart`, `onDayTouchMove`, `onDayTouchEnd`, `onDayTouchCancel`,
  `onNextClick`, `onPrevClick`, `onWeekNumberClick`, and the deprecated
  `fromDate`, `toDate`, `fromMonth`, `toMonth`, `fromYear`, `toYear` and
  `initialFocus`. The Persian, Hijri, Buddhist, Hebrew and Ethiopic calendars
  are gone too; the grid is always Gregorian. Use `onSelect` (its second
  argument is the clicked day) instead of `onDayClick`, and `onMonthChange`
  instead of `onNextClick` / `onPrevClick`.

**Smaller differences you may notice**

- Weekday headers use `Intl`'s short names: "Sun Mon Tue" rather than
  "Su Mo Tu".
- A day's accessible name is its full date from `Intl` ("Thursday, November
  26, 2026"); today and selection are conveyed by `aria-current="date"` and
  `aria-selected` rather than by "Today, …" and "…, selected" in the name.
- The previous / next buttons at `startMonth` / `endMonth` are now visibly
  dimmed as well as `aria-disabled`.
- Hidden days (`hidden`, the days outside `startMonth` / `endMonth`, and
  outside days with `showOutsideDays={false}`) keep their column; before, an
  empty cell collapsed and the rest of its week slid under the wrong weekday.
- Home / End go to the first / last *enabled* day of the week (react-day-picker
  did nothing when that day was disabled). Shift + arrow keys no longer jump by
  months and years; use (Shift +) Page Up / Page Down.
- With `numberOfMonths` above 1, focus moving past the last month shows the
  next month after the ones already on screen rather than starting the view at
  it, and the first month is kept early enough for all months to fit before
  `endMonth`.
- The time of day of the dates you pass is ignored, and the dates `onSelect`
  returns are at local midnight.
- `onMonthChange` fires only when the month actually changes, and a day click
  no longer stops the click event's propagation.
- In `captionLayout="dropdown"` the month list shows short names ("Nov").
