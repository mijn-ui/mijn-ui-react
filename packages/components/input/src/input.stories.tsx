import type { Meta, StoryObj } from "@storybook/react"
import { Input, InputProps } from "./input"
import { LuPlus } from "react-icons/lu"

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

export const WithIcon: Story = {
  render: InputWithIcons,
  args: {
    startIcon: <LuPlus />,
    endIcon: <LuPlus />,
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
    startIcon: <LuPlus />,
    endIcon: <LuPlus />,
  },
}

export const Unstyled: Story = {
  render: InputTemplate,
  args: {
    unstyled: true,
    classNames: { input: "indent-2 py-1" },
  },
}
