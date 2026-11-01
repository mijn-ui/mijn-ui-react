import { Label } from "@mijn-ui/react-label"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea, TextareaProps } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A multi-line input field for larger text entry.",
      },
    },
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
    <div className="flex w-full max-w-80 flex-col gap-2">
      <Label htmlFor="message" unstyled={args.unstyled}>
        Text Area
      </Label>
      <Textarea name="message" className="w-80" id="message" {...args} />
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
