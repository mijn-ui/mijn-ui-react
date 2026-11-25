import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@mijn-ui/react-tooltip"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlProps,
} from "./segmented-control"

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'A row of mutually exclusive choices in one pill, with one tab stop; the arrow keys move and select. `semantics="radio"` (the default) is for an answer the user gives, and may start unanswered with `value={null}`; `semantics="tabs"` is for a filter that switches what a list shows.',
      },
    },
  },
  args: {
    unstyled: false,
    size: "sm",
    semantics: "radio",
  },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "xs"] },
    semantics: { control: "inline-radio", options: ["radio", "tabs"] },
  },
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

/**
 * The controls that change how a story looks. The examples below own their
 * values, typed to their own unions, so they take only these from the args.
 */
const look = ({ size, unstyled, semantics }: SegmentedControlProps) => ({
  size,
  unstyled,
  semantics,
})

export const Default: Story = {
  render: (args: SegmentedControlProps) => (
    <SegmentedControl aria-label="Density" defaultValue="comfortable" {...args}>
      <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
      <SegmentedControlItem value="comfortable">
        Comfortable
      </SegmentedControlItem>
      <SegmentedControlItem value="spacious">Spacious</SegmentedControlItem>
    </SegmentedControl>
  ),
}

/* -------------------------------------------------------------------------- */

const PERIODS = {
  month: "This month",
  "30d": "Last 30 days",
  "7d": "Last 7 days",
  custom: "Custom",
} as const
type Period = keyof typeof PERIODS

const PeriodSelectorExample = (args: SegmentedControlProps) => {
  const [period, setPeriod] = React.useState<Period>("month")

  return (
    <div className="flex flex-col items-start gap-3">
      <SegmentedControl<Period>
        {...look(args)}
        aria-label="Reporting period"
        value={period}
        onValueChange={setPeriod}
      >
        {Object.entries(PERIODS).map(([value, label]) => (
          <SegmentedControlItem key={value} value={value}>
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <p className="text-fg-secondary text-sm">
        Credits used — {PERIODS[period].toLowerCase()}
      </p>
    </div>
  )
}

/** A single choice that sets what the figures cover. */
export const PeriodSelector: Story = {
  render: (args: SegmentedControlProps) => <PeriodSelectorExample {...args} />,
}

/* -------------------------------------------------------------------------- */

const CONFLICTS = [
  ...Array.from({ length: 3 }, (_, i) => ({ status: "open", id: i })),
  ...Array.from({ length: 12 }, (_, i) => ({ status: "fixed", id: 100 + i })),
  ...Array.from({ length: 1204 }, (_, i) => ({
    status: "ignored",
    id: 1e4 + i,
  })),
]
const STATUSES = [
  { value: "open", label: "To check" },
  { value: "fixed", label: "Fixed" },
  { value: "ignored", label: "Not a conflict" },
]

const FilterWithCountsExample = (args: SegmentedControlProps) => {
  const [status, setStatus] = React.useState("open")
  const listId = React.useId()
  const shown = CONFLICTS.filter((c) => c.status === status)

  return (
    <div className="flex w-80 flex-col items-start gap-3">
      <SegmentedControl
        {...look(args)}
        semantics="tabs"
        aria-label="Status"
        value={status}
        onValueChange={setStatus}
      >
        {STATUSES.map(({ value, label }) => (
          <SegmentedControlItem
            key={value}
            value={value}
            aria-controls={listId}
            count={CONFLICTS.filter(
              (c) => c.status === value,
            ).length.toLocaleString("en")}
          >
            {label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <ul
        id={listId}
        aria-label="Conflicts"
        className="text-fg-secondary w-full space-y-1 text-sm"
      >
        {shown.slice(0, 4).map((c) => (
          <li key={c.id} className="bg-bg-secondary rounded-sm px-2 py-1">
            Conflict #{c.id}
          </li>
        ))}
        {shown.length > 4 && <li>…and {shown.length - 4} more</li>}
      </ul>
    </div>
  )
}

/**
 * `semantics="tabs"`: the choice switches what the list shows. Each item
 * points `aria-controls` at the list it filters; the counts are formatted by
 * the caller.
 */
export const FilterWithCounts: Story = {
  render: (args: SegmentedControlProps) => (
    <FilterWithCountsExample {...args} />
  ),
}

/* -------------------------------------------------------------------------- */

const REPLACE_NEEDS_UPDATE =
  "Replacing a page's file needs permission to edit knowledge."

/**
 * `disabledReason` disables the option and makes the reason its accessible
 * description. The visible tooltip is composed with `@mijn-ui/react-tooltip`;
 * the option is `aria-disabled`, not natively disabled, so it still gets the
 * hover that opens it.
 */
export const DisabledWithReason: Story = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  render: (args: SegmentedControlProps) => (
    <SegmentedControl
      aria-label="What to do with handbook.pdf"
      defaultValue="skip"
      {...args}
    >
      <SegmentedControlItem value="skip">Skip</SegmentedControlItem>
      <SegmentedControlItem value="keep">Keep both</SegmentedControlItem>
      <Tooltip>
        <TooltipTrigger asChild>
          <SegmentedControlItem
            value="replace"
            disabledReason={REPLACE_NEEDS_UPDATE}
          >
            Replace
          </SegmentedControlItem>
        </TooltipTrigger>
        <TooltipContent>{REPLACE_NEEDS_UPDATE}</TooltipContent>
      </Tooltip>
    </SegmentedControl>
  ),
}

/* -------------------------------------------------------------------------- */

const FILES = ["handbook.pdf", "pricing.md", "faq.docx", "onboarding.md"]
type Decision = "skip" | "keep" | "replace"

const UnsetAnswerExample = (args: SegmentedControlProps) => {
  const [all, setAll] = React.useState<Decision | null>(null)
  const [own, setOwn] = React.useState<Record<string, Decision>>({})
  const undecided = FILES.filter((f) => !(own[f] ?? all)).length

  return (
    <div className="flex w-96 flex-col gap-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-fg-secondary">For all {FILES.length} files</span>
        <SegmentedControl<Decision>
          {...look(args)}
          aria-label={`Exact duplicates: for all ${FILES.length} files`}
          value={all}
          onValueChange={setAll}
        >
          <SegmentedControlItem value="skip">Skip</SegmentedControlItem>
          <SegmentedControlItem value="keep">Keep both</SegmentedControlItem>
          <SegmentedControlItem value="replace">Replace</SegmentedControlItem>
        </SegmentedControl>
      </div>
      <p className={undecided ? "text-fg-warning" : "text-fg-success"}>
        {undecided
          ? `Choose what to do with ${undecided} of ${FILES.length} files.`
          : "Every file has an answer."}
      </p>
      <ul className="divide-y">
        {FILES.map((file) => (
          <li key={file} className="flex items-center justify-between py-2">
            <span>{file}</span>
            <SegmentedControl<Decision>
              {...look(args)}
              size="xs"
              aria-label={`What to do with ${file}`}
              value={own[file] ?? all}
              onValueChange={(decision) =>
                setOwn((prev) => ({ ...prev, [file]: decision }))
              }
            >
              <SegmentedControlItem value="skip">Skip</SegmentedControlItem>
              <SegmentedControlItem value="keep">
                Keep both
              </SegmentedControlItem>
              <SegmentedControlItem value="replace">
                Replace
              </SegmentedControlItem>
            </SegmentedControl>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * `value={null}`: a question not answered yet. Nothing is checked, and Tab
 * lands on the first enabled option without choosing it.
 */
export const UnsetAnswer: Story = {
  render: (args: SegmentedControlProps) => <UnsetAnswerExample {...args} />,
}

/* -------------------------------------------------------------------------- */

const TwoOptionsExample = (args: SegmentedControlProps) => {
  const [mode, setMode] = React.useState("existing")
  const labelId = React.useId()

  return (
    <div className="flex flex-col gap-1.5">
      <span id={labelId} className="text-sm font-medium">
        Unit category
      </span>
      <SegmentedControl
        {...look(args)}
        aria-labelledby={labelId}
        value={mode}
        onValueChange={setMode}
      >
        <SegmentedControlItem value="existing">
          Add to existing
        </SegmentedControlItem>
        <SegmentedControlItem value="new">
          Start new category
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  )
}

/** A two-option field in a form, named by its visible label. */
export const TwoOptions: Story = {
  render: (args: SegmentedControlProps) => <TwoOptionsExample {...args} />,
}

export const Sizes: Story = {
  render: (args: SegmentedControlProps) => (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "xs"] as const).map((size) => (
        <SegmentedControl
          key={size}
          {...args}
          size={size}
          aria-label={`Size ${size}`}
          defaultValue="day"
        >
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month" count={3}>
            Month
          </SegmentedControlItem>
        </SegmentedControl>
      ))}
    </div>
  ),
}

export const Unstyled: Story = {
  args: {
    unstyled: true,
  },
  render: (args: SegmentedControlProps) => (
    <SegmentedControl
      aria-label="Plan"
      defaultValue="yearly"
      classNames={{
        base: "inline-flex gap-2",
        item: "border-outline-default text-fg-secondary aria-checked:border-outline-brand aria-checked:text-fg-brand rounded-full border px-4 py-1.5 text-sm",
      }}
      {...args}
    >
      <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
      <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
    </SegmentedControl>
  ),
}
