import * as React from "react"
import { Label } from "@mijn-ui/react-label"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Slider, SliderProps } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A control for choosing a value, or a range of values, from a continuous interval. One thumb is rendered per value, so passing two values gives a range slider.",
      },
    },
  },
  args: {
    unstyled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    defaultValue: [50],
  },
}

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    thumbAriaLabels: ["Minimum", "Maximum"],
  },
}

export const Steps: Story = {
  args: {
    defaultValue: [40],
    step: 10,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    disabled: true,
  },
}

export const Vertical: Story = {
  args: {
    defaultValue: [50],
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div className="flex h-56 items-center justify-center">
        <Story />
      </div>
    ),
  ],
}

const ControlledTemplate = (args: SliderProps) => {
  const [value, setValue] = React.useState([30])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="opacity">Opacity</Label>
        <span className="text-fg-secondary text-sm tabular-nums">
          {value[0]}%
        </span>
      </div>
      <Slider {...args} id="opacity" value={value} onValueChange={setValue} />
    </div>
  )
}

export const Controlled: Story = {
  render: ControlledTemplate,
}

export const Unstyled: Story = {
  args: {
    unstyled: true,
    defaultValue: [50],
    className: "relative flex w-full items-center",
    classNames: {
      track: "relative h-1 w-full grow rounded bg-bg-tertiary",
      range: "absolute h-full rounded bg-bg-success",
      thumb: "block size-3 rounded-full bg-bg-success",
    },
  },
}
