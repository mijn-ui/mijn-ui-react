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
  const MAX_VALUE = 100
  const [value, setValue] = React.useState<number>(0)
  const intervalRef = React.useRef<number | null>(null)

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
      <div className="text-foreground text-small flex items-center justify-between font-medium">
        <h5>Progress Label</h5>
        <p>{value}%</p>
      </div>
      <Progress
        value={value}
        classNames={
          args.unstyled
            ? {
                base: "h-2 overflow-hidden",
                indicator: "bg-muted size-full",
              }
            : {}
        }
        {...args}
      />
      <div className="text-muted-foreground text-tiny flex items-center justify-between">
        <p>min</p>
        <p>max</p>
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
