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
    variant: "filled",
    color: "default",
  },
  argTypes: {
    variant: {
      type: "string",
      control: "select",
      options: ["filled", "outlined", "subtle", "ghost", "light"],
    },
    color: {
      type: "string",
      control: "select",
      options: [
        "default",
        "brand",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

const VARIANTS = ["filled", "outlined", "subtle", "ghost", "light"] as const
const COLORS = [
  "default",
  "secondary",
  "brand",
  "success",
  "warning",
  "danger",
  "inverse",
] as const
const SIZES = ["sm", "md", "lg"] as const
const RADII = ["default", "full"] as const

const BadgeTemplate = (args: BadgeProps) => {
  return (
    <Badge {...args} variant="filled" color="default">
      <CheckIcon />
      <SquareIcon />
      Badge
      <XIcon />
    </Badge>
  )
}

const BadgeVariants = (args: BadgeProps) => {
  return (
    <div className="flex flex-col gap-16">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-4">
          {COLORS.map((color) => (
            <Badge key={color} {...args} variant={variant} color={color}>
              <CheckIcon />
              Badge
              <XIcon />
            </Badge>
          ))}
        </div>
      ))}
    </div>
  )
}

const BadgeRadius = (args: BadgeProps) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-center gap-4">
        {RADII.map((radius) => (
          <Badge key={radius} {...args} radius={radius}>
            <CheckIcon />
            Badge
            <XIcon />
          </Badge>
        ))}
      </div>
    </div>
  )
}

const BadgeSize = (args: BadgeProps) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-center gap-4">
        {SIZES.map((size) => (
          <Badge key={size} {...args} size={size}>
            <CheckIcon />
            Badge
            <XIcon />
          </Badge>
        ))}
      </div>
    </div>
  )
}

const BadgeUnstyled = (args: BadgeProps) => {
  return (
    <Badge {...args} className="bg-bg-tertiary px-3">
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

export const Size: Story = {
  render: BadgeSize,
  args: {
    radius: "default",
  },
}

export const Variants: Story = {
  render: BadgeVariants,
  args: {
    variant: "filled",
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
