import React from "react"

import { Separator } from "@mijn-ui/react-separator"
import type { Meta, StoryObj } from "@storybook/react"

import { ScrollArea, ScrollAreaProps } from "./scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v0.0.1-beta.${a.length - i}`,
)

const ScrollAreaTemplate = (args: ScrollAreaProps) => {
  return (
    <ScrollArea
      className="bg-surface h-72 w-48 overflow-y-auto rounded-medium border"
      {...args}
    >
      <div className="p-4">
        <h4 className="mb-4 text-small font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div key={tag} className="text-small">
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}

export const Default: Story = {
  render: ScrollAreaTemplate,
}

export const Unstyled: Story = {
  render: ScrollAreaTemplate,
  args: {
    unstyled: true,
  },
}
