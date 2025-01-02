import { Label } from "@mijn-ui/react-label"
import type { Meta, StoryObj } from "@storybook/react"

import { RadioGroup, RadioGroupItem, RadioGroupProps } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const RadioGroupTemplate = (args: RadioGroupProps) => {
  return (
    <RadioGroup defaultValue="comfortable" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}

const RadioGroupUnstyled = (args: RadioGroupProps) => {
  return (
    <RadioGroup
      defaultValue="comfortable"
      classNames={{
        base: "grid gap-2",
        item: "border-small border-primary size-4 rounded-full",
        indicator: "flex justify-center items-center",
        icon: "size-2.5 fill-current",
      }}
      {...args}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1" unstyled={args.unstyled}>
          Default
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2" unstyled={args.unstyled}>
          Comfortable
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3" unstyled={args.unstyled}>
          Compact
        </Label>
      </div>
    </RadioGroup>
  )
}

export const Default: Story = {
  render: RadioGroupTemplate,
}

export const Unstyled: Story = {
  render: RadioGroupUnstyled,
  args: {
    unstyled: true,
  },
}
