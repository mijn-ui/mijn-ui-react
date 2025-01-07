import { Label } from "@mijn-ui/react-label"
import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox, CheckboxProps } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  args: {
    color: "default",
    size: "md",
    unstyled: false,
  },
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
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
    size: {
      type: "string",
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

const CheckboxTemplate = (args: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms" unstyled={args.unstyled}>
        Accept terms and conditions
      </Label>
    </div>
  )
}

const CheckboxColors = (args: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="default" color="default" {...args} />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="primary" color="primary" />
        <Label htmlFor="primary">Primary</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="secondary" color="secondary" />
        <Label htmlFor="secondary">Secondary</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="success" color="success" />
        <Label htmlFor="success">Success</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="info" color="info" />
        <Label htmlFor="info">Info</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="warning" color="warning" />
        <Label htmlFor="warning">Warning</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="danger" color="danger" />
        <Label htmlFor="danger">Danger</Label>
      </div>
    </div>
  )
}

const CheckboxSizes = (args: CheckboxProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="sm" size="sm" {...args} />
        <Label htmlFor="sm">Small</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="md" size="md" />
        <Label htmlFor="md">Medium/Default</Label>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox defaultChecked id="lg" size="lg" />
        <Label htmlFor="lg">Large</Label>
      </div>
    </div>
  )
}

const CheckboxUnstyled = (args: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        classNames={{
          base: "border-small size-5",
          indicator: "flex justify-center",
        }}
        {...args}
      />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}

export const Default: Story = {
  render: CheckboxTemplate,
}

export const Colors: Story = {
  render: CheckboxColors,
}

export const Sizes: Story = {
  render: CheckboxSizes,
}

export const Unstyled: Story = {
  render: CheckboxUnstyled,
  args: {
    unstyled: true,
  },
}
