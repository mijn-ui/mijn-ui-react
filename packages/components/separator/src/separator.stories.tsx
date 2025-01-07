import type { Meta, StoryObj } from "@storybook/react"
import { Separator, SeparatorProps } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  args: {
    orientation: "horizontal",
    decorative: true,
    unstyled: false,
  },
  argTypes: {
    orientation: {
      type: "string",
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Separator>

const SelectTemplate = (args: SeparatorProps) => {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-small font-medium leading-none">
          Radix Primitives
        </h4>
        <p className="text-muted-foreground text-small">
          An open-source UI component library.
        </p>
      </div>
      <Separator {...args} className="my-4" />
      <div className="text-small flex h-5 items-center space-x-4">
        <div>Blog</div>
        <Separator {...args} orientation="vertical" />
        <div>Docs</div>
        <Separator {...args} orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}

const SelectUnstyled = (args: SeparatorProps) => {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-small font-medium leading-none">
          Radix Primitives
        </h4>
        <p className="text-muted-foreground text-small">
          An open-source UI component library.
        </p>
      </div>
      <Separator {...args} className="bg-foreground my-4 h-px w-full" />
      <div className="text-small flex h-5 items-center space-x-4">
        <div>Blog</div>
        <Separator
          {...args}
          className="bg-foreground h-full w-px"
          orientation="vertical"
        />
        <div>Docs</div>
        <Separator
          {...args}
          className="bg-foreground h-full w-px"
          orientation="vertical"
        />
        <div>Source</div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: SelectTemplate,
}

export const Unstyled: Story = {
  render: SelectUnstyled,
  args: {
    unstyled: true,
  },
}
