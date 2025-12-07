import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonProps } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "filled",
    color: "default",
    size: "md",
    iconOnly: false,
    loading: false,
    disabled: false,
    unstyled: false,
    asChild: false,
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
    size: {
      type: "string",
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

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

const ButtonTemplate = (args: ButtonProps) => {
  return (
    <Button {...args}>
      <CircleIcon />
      <p className="px-1">Button</p>
      <CircleIcon />
    </Button>
  )
}

const ButtonVariants = (args: ButtonProps) => {
  return (
    <div className="flex flex-col gap-16">
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          className="flex flex-col items-center gap-8 sm:flex-row"
        >
          {COLORS.map((color) => (
            <Button key={color} {...args} variant={variant} color={color}>
              <CircleIcon />
              <p className="px-1 capitalize">{color}</p>
              <CircleIcon />
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

const ButtonSizes = (args: ButtonProps) => {
  return (
    <div className="flex items-center gap-8">
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          <CircleIcon />
          <p className="px-1">Button</p>
          <CircleIcon />
        </Button>
      ))}
    </div>
  )
}

const ButtonIconOnly = (args: ButtonProps) => {
  return (
    <div className="flex items-center gap-8">
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          <CircleIcon />
        </Button>
      ))}
    </div>
  )
}

const ButtonUnstyled = (args: ButtonProps) => {
  return (
    <ButtonTemplate
      {...args}
      className="bg-bg-tertiary flex items-center gap-2 px-4 py-2 disabled:pointer-events-none disabled:opacity-80 disabled:brightness-75"
    />
  )
}

export const Default: Story = {
  render: ButtonTemplate,
}

export const Variants: Story = {
  render: ButtonVariants,
}

export const Sizes: Story = {
  render: ButtonSizes,
  args: {
    size: "sm",
  },
}

export const IconOnly: Story = {
  render: ButtonIconOnly,
  args: {
    size: "sm",
    iconOnly: true,
  },
}

export const Loading: Story = {
  render: ButtonTemplate,
  args: {
    loading: true,
  },
}

export const Unstyled: Story = {
  render: ButtonUnstyled,
  args: {
    unstyled: true,
  },
}

const CircleIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2010_3409)">
      <circle
        cx="9.99984"
        cy="9.99996"
        r="8.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2010_3409">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
