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
    unstyled: false,
  },
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

const CheckboxTemplate = (args: CheckboxProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox id="subscribe" {...args} />
        <Label
          htmlFor="subscribe"
          unstyled={args.unstyled}
          className="text-foreground text-sm font-medium leading-none"
        >
          Subscribe
        </Label>
      </div>
      <p className="text-secondary-foreground pl-7 text-sm">
        Receive weekly updates and offers.
      </p>
    </div>
  )
}

const CheckboxUnstyled = (args: CheckboxProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="subscribe-2"
          className="size-5 rounded-sm border"
          {...args}
        />
        <Label
          htmlFor="subscribe-2"
          unstyled={args.unstyled}
          className="text-foreground text-sm font-medium leading-none"
        >
          Subscribe
        </Label>
      </div>
      <p className="text-secondary-foreground pl-7 text-sm">
        Receive weekly updates and offers.
      </p>
    </div>
  )
}

export const Default: Story = {
  render: CheckboxTemplate,
}

export const Unstyled: Story = {
  render: CheckboxUnstyled,
  args: {
    unstyled: true,
  },
}
