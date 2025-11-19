import type { Meta, StoryObj } from "@storybook/react"
import { Switch, SwitchProps } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Switch>

const SwitchTemplate = (args: SwitchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Switch {...args} />
        <div className="py-1">
          <h5 className="text-fg-default text-sm font-medium">
            Email Notifications
          </h5>
          <p className="text-fg-secondary text-sm font-normal">
            Receive notifications for new messages and updates.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Switch {...args} />
        <div className="py-1">
          <h5 className="text-fg-default text-sm font-medium">Dark Mode</h5>
          <p className="text-fg-secondary text-sm font-normal">
            Enable a dark theme to reduce eye strain in low light.
          </p>
        </div>
      </div>
    </div>
  )
}

const SwitchCustom = (args: SwitchProps) => {
  return (
    <Switch
      {...args}
      classNames={{
        base: "data-[state=checked]:bg-bg-success rounded-lg shadow-[inset_-2px_2px_0_rgb(0,0,0,0.2)]",
        thumb: "rounded-md shadow-[-2px_4px_0_rgb(0,0,0,0.1)]",
      }}
    />
  )
}

export const Default: Story = {
  render: SwitchTemplate,
}

export const CustomStyles: Story = {
  render: SwitchCustom,
}

export const Unstyled: Story = {
  render: SwitchTemplate,
  args: {
    unstyled: true,
  },
}
