import type { Meta, StoryObj } from "@storybook/react-vite"
import { Plus } from "lucide-react"
import { Input, InputProps } from "./input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: { component: "A basic input field for user text entry." },
    },
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

export const Bare: Story = {
  render: (args: InputProps) => (
    <form className="grid w-80 grid-cols-[auto_1fr] items-center gap-2 text-sm">
      <label htmlFor="bare-amount">Amount</label>
      <Input {...args} id="bare-amount" />
      <label htmlFor="bare-reference">Reference</label>
      <Input {...args} id="bare-reference" placeholder="INV-0042" />
    </form>
  ),
  args: {
    bare: true,
    placeholder: "0.00",
  },
}

export const Unstyled: Story = {
  render: InputTemplate,
  args: {
    unstyled: true,
    classNames: { base: "indent-2 py-1" },
  },
}
