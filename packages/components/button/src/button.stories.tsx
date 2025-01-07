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
    radius: "md",
    size: "md",
    loading: false,
    disabled: false,
    unstyled: false,
    asChild: false,
  },
  argTypes: {
    variant: {
      type: "string",
      control: "select",
      options: ["filled", "outlined", "ghost"],
    },
    color: {
      type: "string",
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
      ],
    },
    radius: {
      type: "string",
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      type: "string",
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

const ButtonTemplate = (args: ButtonProps) => {
  return <Button {...args}>Button</Button>
}

const ButtonColors = (args: ButtonProps) => {
  return (
    <div className="flex items-center gap-8">
      <Button {...args}>Default</Button>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="secondary">
        Secondary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="info">
        Info
      </Button>
      <Button {...args} color="warning">
        Warning
      </Button>
      <Button {...args} color="danger">
        Danger
      </Button>
    </div>
  )
}

const ButtonVariants = (args: ButtonProps) => {
  return (
    <div className="flex flex-col items-center gap-12">
      <div>
        <h3 className="text-muted-foreground mb-3 w-full text-start font-semibold">
          Filled
        </h3>
        <ButtonColors variant="filled" {...args} />
      </div>
      <div>
        <h3 className="text-muted-foreground mb-3 w-full text-start font-semibold">
          Outlined
        </h3>
        <ButtonColors variant="outlined" />
      </div>
      <div>
        <h3 className="text-muted-foreground mb-3 w-full text-start font-semibold">
          Ghost
        </h3>
        <ButtonColors variant="ghost" />
      </div>
    </div>
  )
}

const ButtonRadius = (args: ButtonProps) => {
  return (
    <div className="flex items-center gap-8">
      <Button {...args} className="px-5">
        none
      </Button>
      <Button {...args} radius="sm" className="px-6">
        sm
      </Button>
      <Button {...args} radius="md" className="px-6">
        md
      </Button>
      <Button {...args} radius="lg" className="px-7">
        lg
      </Button>
      <Button {...args} radius="full" className="px-6">
        full
      </Button>
    </div>
  )
}

const ButtonSizes = (args: ButtonProps) => {
  return (
    <div className="flex items-center gap-8">
      <Button {...args} className="px-6">
        sm
      </Button>
      <Button {...args} size="md" className="px-6">
        md
      </Button>
      <Button {...args} size="lg">
        lg
      </Button>
      <Button {...args} size="icon">
        icon
      </Button>
    </div>
  )
}

const ButtonUnstyled = (args: ButtonProps) => {
  return (
    <ButtonTemplate
      {...args}
      className="bg-muted flex gap-2 px-4 py-2 disabled:pointer-events-none disabled:opacity-80 disabled:brightness-75"
    />
  )
}

export const Default: Story = {
  render: ButtonTemplate,
}

export const Colors: Story = {
  render: ButtonColors,
}

export const Variants: Story = {
  render: ButtonVariants,
}

export const Radius: Story = {
  render: ButtonRadius,
  args: {
    radius: "none",
  },
}

export const Sizes: Story = {
  render: ButtonSizes,
  args: {
    size: "sm",
  },
}

export const Unstyled: Story = {
  render: ButtonUnstyled,
  args: {
    unstyled: true,
  },
}
