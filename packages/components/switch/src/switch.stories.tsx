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
    <Switch
      {...args}
      classNames={
        args.unstyled
          ? {
              base: "bg-accent h-6 w-11 data-[state=checked]:bg-muted",
              thumb:
                "bg-surface block size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1",
            }
          : {}
      }
    />
  )
}

const SwitchCustom = (args: SwitchProps) => {
  return (
    <Switch
      {...args}
      classNames={{
        base: "data-[state=checked]:bg-success rounded-lg shadow-[inset_-2px_2px_0_rgb(0,0,0,0.2)]",
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
