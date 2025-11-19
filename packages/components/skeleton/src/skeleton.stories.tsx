import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton, SkeletonProps } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

const SkeletonTemplate = (args: SkeletonProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" {...args} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" {...args} />
        <Skeleton className="h-4 w-[200px]" {...args} />
      </div>
    </div>
  )
}

const SkeletonUnstyled = (args: SkeletonProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="bg-bg-tertiary size-12 rounded-full" {...args} />
      <div className="space-y-2">
        <Skeleton className="bg-bg-tertiary h-4 w-[250px]" {...args} />
        <Skeleton className="bg-bg-tertiary h-4 w-[200px]" {...args} />
      </div>
    </div>
  )
}

export const Default: Story = {
  render: SkeletonTemplate,
}

export const Unstyled: Story = {
  render: SkeletonUnstyled,
  args: {
    unstyled: true,
  },
}
