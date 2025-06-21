import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Progress, ProgressProps } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Progress>

const ProgressTemplate = (args: ProgressProps) => {
  const MAX_VALUE = 25
  const [value, setValue] = React.useState<number>(0)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setValue((val) => {
        if (val >= MAX_VALUE) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return val
        }
        return val + 1
      })
    }, 20)

    // Clear the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="w-80 space-y-1">
      <h5 className="text-foreground flex items-center justify-between text-sm font-medium leading-none">
        Downloading
      </h5>
      <div className="flex items-center gap-2">
        <Progress value={value} {...args} />
        <p className="text-foreground text-xs font-medium">{value}%</p>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: (args: ProgressProps) => <ProgressTemplate {...args} />,
}

export const Unstyled: Story = {
  render: (args: ProgressProps) => <ProgressTemplate {...args} />,
  args: {
    unstyled: true,
  },
}
