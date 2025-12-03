import type { Meta, StoryObj } from "@storybook/react"
import { Button, ButtonProps } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
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
      options: ["default", "primary", "danger", "ghost"],
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
    <div className="flex flex-col items-center gap-8 sm:flex-row">
      <Button {...args}>
        <CircleIcon />
        <p className="px-1">Default</p>
        <CircleIcon />
      </Button>
      <Button {...args} variant="primary">
        <CircleIcon />
        <p className="px-1">Primary</p>
        <CircleIcon />
      </Button>
      <Button {...args} variant="secondary">
        <CircleIcon />
        <p className="px-1">Secondary</p>
        <CircleIcon />
      </Button>
      <Button {...args} variant="success">
        <CircleIcon />
        <p className="px-1">Success</p>
        <CircleIcon />
      </Button>
      <Button {...args} variant="warning">
        <CircleIcon />
        <p className="px-1">Warning</p>
        <CircleIcon />
      </Button>
      <Button {...args} variant="danger">
        <CircleIcon />
        <p className="px-1">Danger</p>
        <CircleIcon />
      </Button>
      <Button {...args} variant="outlined">
        <CircleIcon />
        <p className="px-1">Outlined</p>
        <CircleIcon />
      </Button>
      <Button {...args} variant="ghost">
        <CircleIcon />
        <p className="px-1">Ghost</p>
        <CircleIcon />
      </Button>
    </div>
  )
}

const ButtonSizes = (args: ButtonProps) => {
  return (
    <div className="flex items-center gap-8">
      <Button {...args} size="sm">
        <CircleIcon />
        <p className="px-1">Button</p>
        <CircleIcon />
      </Button>
      <Button {...args} size="md">
        <CircleIcon />
        <p className="px-1">Button</p>
        <CircleIcon />
      </Button>
      <Button {...args} size="lg">
        <CircleIcon />
        <p className="px-1">Button</p>
        <CircleIcon />
      </Button>
    </div>
  )
}

const ButtonIconOnly = (args: ButtonProps) => {
  return (
    <div className="flex items-center gap-8">
      <Button {...args} size="sm">
        <CircleIcon />
      </Button>
      <Button {...args} size="md">
        <CircleIcon />
      </Button>
      <Button {...args} size="lg">
        <CircleIcon />
      </Button>
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
