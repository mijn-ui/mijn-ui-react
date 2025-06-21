import type { Meta, StoryObj } from "@storybook/react"
import { Plus } from "lucide-react"
import { Input, InputProps } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Username...",
    disabled: false,
    unstyled: false,
  },
  argTypes: {
    label: {
      type: "string",
    },
    placeholder: {
      type: "string",
    },
    startIcon: {
      table: {
        disable: true,
      },
    },
    endIcon: {
      table: {
        disable: true,
      },
    },
    classNames: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

const InputTemplate = (args: InputProps) => {
  return <Input className="w-80" {...args} />
}

const InputVariants = (args: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Input className="w-80" {...args} variant="default" />
      <Input className="w-80" {...args} variant="underline" />
      <Input className="w-80" {...args} variant="danger" />
    </div>
  )
}

const InputWithIcons = (args: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Input className="w-80" {...args} endIcon={undefined} />
      <Input className="w-80" {...args} startIcon={undefined} />
      <Input className="w-80" {...args} />
    </div>
  )
}

export const Default: Story = {
  render: InputTemplate,
}

export const Variants: Story = {
  render: InputVariants,
}

export const WithIcon: Story = {
  render: InputWithIcons,
  args: {
    startIcon: <Plus />,
    endIcon: <Plus />,
  },
}

export const WithFloatingLabel: Story = {
  render: InputTemplate,
  args: {
    placeholder: "",
    label: "Username",
  },
}

export const WithFloatingLabelAndIcon: Story = {
  render: InputWithIcons,
  args: {
    placeholder: "",
    label: "Username",
    startIcon: <Plus />,
    endIcon: <Plus />,
  },
}

export const Unstyled: Story = {
  render: InputTemplate,
  args: {
    unstyled: true,
    classNames: { base: "indent-2 py-1" },
  },
}
