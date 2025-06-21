import type { Meta, StoryObj } from "@storybook/react"
import { Badge, BadgeProps } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    radius: "full",
    unstyled: false,
  },
  argTypes: {
    variant: {
      type: "string",
      control: "select",
      options: [
        "default",
        "primary",
        "primary-subtle",
        "success",
        "success-subtle",
        "warning",
        "warning-subtle",
        "danger",
        "danger-subtle",
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

const BadgeTemplate = (args: BadgeProps) => {
  return (
    <Badge {...args}>
      <CheckIcon />
      <SquareIcon />
      Badge
      <XIcon />
    </Badge>
  )
}

const BadgeVariants = (args: BadgeProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge {...args}>
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="primary">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="success">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="warning">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="danger">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="default-subtle">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="primary-subtle">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="success-subtle">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="warning-subtle">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>

      <Badge {...args} variant="danger-subtle">
        <CheckIcon />
        Badge
        <XIcon />
      </Badge>
    </div>
  )
}

const BadgeRadius = (args: BadgeProps) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-center gap-4">
        <Badge {...args}>
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} variant="default-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} variant="success-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} variant="warning-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} variant="danger-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Badge {...args} radius="full">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} radius="full" variant="default-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} radius="full" variant="success-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} radius="full" variant="warning-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>

        <Badge {...args} radius="full" variant="danger-subtle">
          <CheckIcon />
          Badge
          <XIcon />
        </Badge>
      </div>
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

export const Radius: Story = {
  render: BadgeRadius,
  args: {
    radius: "default",
  },
}

export const Variants: Story = {
  render: BadgeVariants,
  args: {
    variant: "default",
  },
}

export const Unstyled: Story = {
  render: BadgeUnstyled,
  args: {
    unstyled: true,
  },
}

const CheckIcon = () => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 7L4.25 8.75L9.5 3.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const SquareIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4C2 2.89543 2.89543 2 4 2H8C9.10457 2 10 2.89543 10 4V8C10 9.10457 9.10457 10 8 10H4C2.89543 10 2 9.10457 2 8V4Z"
      fill="currentColor"
    />
  </svg>
)

const XIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 3L6 6M6 6L3 9M6 6L9 9M6 6L3 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
