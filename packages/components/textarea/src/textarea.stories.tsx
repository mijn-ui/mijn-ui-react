import { Label } from "@mijn-ui/react-label"
import type { Meta, StoryObj } from "@storybook/react"
import { Textarea, TextareaProps } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "Type your message here...",
    disabled: false,
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

const TextareaTemplate = (args: TextareaProps) => {
  return (
    <div className="flex w-full max-w-80 flex-col gap-1">
      <Label htmlFor="message" unstyled={args.unstyled}>
        Text Area
      </Label>
      <Textarea name="message" id="message" {...args} />
    </div>
  )
}

export const Default: Story = {
  render: TextareaTemplate,
}

export const Unstyled: Story = {
  render: TextareaTemplate,
  args: {
    unstyled: true,
  },
}
