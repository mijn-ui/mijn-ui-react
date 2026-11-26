# @mijn-ui/react-calendar

A grid of days to pick one date, several dates, or a range from. It depends on
nothing but React and the other mijn-ui packages: dates are plain `Date`s,
names come from the browser's `Intl.DateTimeFormat`.

[Documentation](https://mijn-ui.vercel.app/react/docs/components/calendar)

## Installation

```sh
npm install @mijn-ui/react-calendar
```

## Usage

```tsx
import { Calendar, DateRange } from "@mijn-ui/react-calendar"

const [date, setDate] = React.useState<Date>()
<Calendar mode="single" selected={date} onSelect={setDate} />

const [dates, setDates] = React.useState<Date[]>()
<Calendar mode="multiple" max={5} selected={dates} onSelect={setDates} />

const [range, setRange] = React.useState<DateRange>()
<Calendar mode="range" numberOfMonths={2} selected={range} onSelect={setRange} />
```

`selected` is controlled when `onSelect` is passed too; on its own it is only
the initial selection. `onSelect` receives the new value, the day that was
clicked, what is true of that day (`CalendarDayModifiers`) and the click event.

Every date is read as a calendar day in the browser's time zone: the time of
day of the dates you pass is ignored, and the dates the calendar hands back are
at local midnight.

## Props

Selection:

| Prop       | Type                                                   | Default |
| ---------- | ------------------------------------------------------ | ------- |
| `mode`     | `"single" \| "multiple" \| "range"`                    | —       |
| `selected` | `Date` / `Date[]` / `DateRange` (by mode)              | —       |
| `onSelect` | `(selected, triggerDate, modifiers, event) => void`    | —       |
| `required` | `boolean` — a selection cannot be clicked away         | `false` |
| `min`      | `number` — multiple: fewest days; range: fewest nights | —       |
| `max`      | `number` — multiple: most days; range: most nights     | —       |
| `disabled` | `Matcher \| Matcher[]` — days that cannot be selected  | —       |
| `hidden`   | `Matcher \| Matcher[]` — days left blank               | —       |

Without a `mode` the calendar only shows dates. `DateRange` is
`{ from: Date | undefined; to?: Date | undefined }`.

A range is built the way react-day-picker 9 builds one: the first click sets
`from` (and `to`, on the same day), the next sets the other end; a click before
`from` moves `from`, any later click moves `to`; clicking a one-day range again
clears it unless `required`. `min` and `max` count the nights between `from`
and `to`, so `max={6}` allows a week; a click that breaks them starts a new
range there.

A `Matcher` is any of:

```ts
true                                  // every day
new Date(2026, 11, 25)                // that day
[date1, date2]                        // those days
{ from: date1, to: date2 }            // date1 to date2, both included
{ before: date }                      // days before it
{ after: date }                       // days after it
{ after: date1, before: date2 }       // days between them (exclusive)
{ dayOfWeek: [0, 6] }                 // weekends
(date) => boolean
```

Months:

| Prop              | Type                    | Default       |
| ----------------- | ----------------------- | ------------- |
| `month`           | `Date` (controlled)     | —             |
| `defaultMonth`    | `Date`                  | today's month |
| `onMonthChange`   | `(month: Date) => void` | —             |
| `startMonth`      | `Date`                  | —             |
| `endMonth`        | `Date`                  | —             |
| `numberOfMonths`  | `number`                | `1`           |
| `showOutsideDays` | `boolean`               | `true`        |
| `fixedWeeks`      | `boolean` — always six  | `false`       |
| `weekStartsOn`    | `0`–`6`, Sunday is `0`  | `0`           |
| `today`           | `Date`                  | the date now  |
| `captionLayout`   | `"label" \| "dropdown"` | `"label"`     |

`startMonth` and `endMonth` bound navigation: the previous / next buttons turn
`aria-disabled` at the limits, and days outside them are hidden.
`captionLayout="dropdown"` swaps the caption for native month and year
`<select>`s; without bounds it offers January 100 years ago to December of
this year.

Language and look:

| Prop         | Type                                              | Default   |
| ------------ | ------------------------------------------------- | --------- |
| `locale`     | BCP 47 tag, e.g. `"nl-NL"`                        | `"en-US"` |
| `labels`     | `CalendarLabels` — previous / next button text, … | English   |
| `autoFocus`  | `boolean` — focus the calendar's day on mount     | `false`   |
| `className`  | `string`                                          | —         |
| `classNames` | per-slot classes, merged into the defaults        | —         |
| `unstyled`   | `boolean` — drop the default classes              | `false`   |

The caption ("November 2026"), the weekday names ("Sun") and each day's
accessible name ("Thursday, November 26, 2026") come from
`Intl.DateTimeFormat` in `locale`. The default is a fixed `"en-US"` rather than
the runtime's language, so server and client render the same. The grid is
always Gregorian. `weekStartsOn` does not follow the language: pass
`weekStartsOn={1}` for a Monday start.

`labels` takes `previousMonth`, `nextMonth`, `monthDropdown`, `yearDropdown`
and `navigation` (the `<nav>` around the buttons).

Any other prop goes to the root `<div data-slot="calendar">`, `ref`
included.

Slots for `classNames`: `base`, `months`, `month`, `month_caption`,
`caption_label`, `nav`, `button_previous`, `button_next`, `dropdowns`,
`dropdown`, `month_grid`, `weekdays`, `weekday`, `weeks`, `week`, `day`,
`day_button`, and the day states `selected`, `range_start`, `range_middle`,
`range_end`, `today`, `outside`, `disabled`, `hidden` (classes on the day
cell). Parts also carry `data-slot="calendar-*"`, and day cells
`data-day="yyyy-mm-dd"` plus `data-selected`, `data-today`, `data-outside`,
`data-disabled` and `data-hidden`.

## Keyboard

Each month is a `grid` named by its caption, which is announced when it
changes. One day takes Tab: the day that last had focus, else the first
selected day, else today, else the first day that can be selected.

| Key                    | Moves focus to                       |
| ---------------------- | ------------------------------------ |
| ← / →                  | the previous / next day              |
| ↑ / ↓                  | the same day a week earlier / later  |
| Home / End             | the first / last day of the week     |
| Page Up / Page Down    | the same day a month earlier / later |
| Shift + Page Up / Down | the same day a year earlier / later  |
| Enter / Space          | selects the focused day              |

Disabled and hidden days are skipped. Moving past the months on show moves the
calendar along and keeps focus on the new day; it never moves past
`startMonth` or `endMonth`. In a `dir="rtl"` calendar ← and → swap.

## Coming from react-day-picker

Until 0.5 this package wrapped `react-day-picker` 9. The props above keep its
names and behaviour, so most calendars need no change. What differs:

- **`locale`** is a language tag string, not a date-fns locale object, and
  `weekStartsOn` no longer comes from it.
- **`labels`** takes strings under new keys, not react-day-picker's label
  functions.
- **`classNames`** takes this package's slot names and merges into the default
  classes (react-day-picker's replaced them). The `rdp-*` class names are gone.
- **Removed props**: `components`, `formatters`, `styles`, `modifiers`,
  `modifiersClassNames`, `modifiersStyles`, `dateLib`, `timeZone`,
  `broadcastCalendar`, `ISOWeek`, `numerals`, `firstWeekContainsDate`,
  `useAdditionalDayOfYearTokens`, `useAdditionalWeekYearTokens`, `footer`,
  `showWeekNumber`, `hideWeekdays`, `hideNavigation`, `disableNavigation`,
  `navLayout`, `reverseMonths`, `reverseYears`, `pagedNavigation`, `animate`,
  `excludeDisabled`, `captionLayout="dropdown-months"` /
  `"dropdown-years"`, every `onDay*` handler (`onDayClick`, `onDayFocus`,
  `onDayBlur`, `onDayKeyDown`, `onDayKeyPress`, `onDayKeyUp`,
  `onDayMouseEnter`, `onDayMouseLeave`, `onDayPointerEnter`,
  `onDayPointerLeave`, `onDayTouchStart`, `onDayTouchMove`, `onDayTouchEnd`,
  `onDayTouchCancel`), `onNextClick`, `onPrevClick`, `onWeekNumberClick`, the
  deprecated `fromDate`, `toDate`, `fromMonth`, `toMonth`, `fromYear`,
  `toYear` and `initialFocus`, and the Persian, Hijri, Buddhist, Hebrew and
  Ethiopic calendars.
- `react-day-picker` and date-fns are no longer installed with it: import
  `DateRange` and `Matcher` from `@mijn-ui/react-calendar`.

See the 0.5.0 changelog for the smaller behaviour changes.

## License

This project is licensed under the terms of the [MIT license.](https://github.com/mijn-ui/mijn-ui-react/blob/main/LICENSE)
