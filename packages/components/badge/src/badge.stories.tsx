import type { Meta, StoryObj } from "@storybook/react"
import { Badge, BadgeProps } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "filled",
    color: "primary",
    radius: "full",
    unstyled: false,
  },
  argTypes: {
    variant: {
      type: "string",
      control: "select",
      options: ["filled", "outlined", "text"],
    },
    color: {
      type: "string",
      control: "select",
      options: ["primary", "secondary", "accent", "muted", "danger"],
    },
    radius: {
      type: "string",
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

const BadgeTemplate = (args: BadgeProps) => {
  return <Badge {...args}>Badge</Badge>
}

const BadgeColors = (args: BadgeProps) => {
  return (
    <div className="flex items-center gap-8">
      <Badge {...args}>Primary</Badge>
      <Badge {...args} color="secondary">
        Secondary
      </Badge>
      <Badge {...args} color="accent">
        Accent
      </Badge>
      <Badge {...args} color="muted">
        Muted
      </Badge>
      <Badge {...args} color="danger">
        Danger
      </Badge>
    </div>
  )
}

const BadgeVariants = (args: BadgeProps) => {
  return (
    <div className="flex flex-col items-center gap-12">
      <div>
        <h3 className="text-muted-text mb-3 w-full text-start font-semibold">
          Filled
        </h3>
        <BadgeColors variant="filled" {...args} />
      </div>
      <div>
        <h3 className="text-muted-text mb-3 w-full text-start font-semibold">
          Outlined
        </h3>
        <BadgeColors variant="outlined" />
      </div>
      <div>
        <h3 className="text-muted-text mb-3 w-full text-start font-semibold">
          Text
        </h3>
        <BadgeColors variant="text" />
      </div>
    </div>
  )
}

const BadgeRadius = (args: BadgeProps) => {
  return (
    <div className="flex items-center gap-8">
      <Badge {...args}>none</Badge>
      <Badge {...args} radius="sm" className="px-4">
        sm
      </Badge>
      <Badge {...args} radius="md" className="px-4">
        md
      </Badge>
      <Badge {...args} radius="lg" className="px-5">
        lg
      </Badge>
      <Badge {...args} radius="full" className="px-4">
        full
      </Badge>
    </div>
  )
}

const BadgeUnstyled = (args: BadgeProps) => {
  return (
    <Badge {...args} className="bg-muted px-3">
      Badge
    </Badge>
  )
}

export const Default: Story = {
  render: BadgeTemplate,
}

export const Colors: Story = {
  render: BadgeColors,
}

export const Variants: Story = {
  render: BadgeVariants,
}

export const Radius: Story = {
  render: BadgeRadius,
  args: {
    radius: "none",
  },
}

export const Unstyled: Story = {
  render: BadgeUnstyled,
  args: {
    unstyled: true,
  },
}
