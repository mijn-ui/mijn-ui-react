import { Button } from "@mijn-ui/react-button"
import type { Meta, StoryObj } from "@storybook/react"
import { Label, LabelProps } from "./label"

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Label>

const LabelTemplate = (args: LabelProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="comment" {...args}>
        Feedback
      </Label>
      <textarea
        className="focus-visible:ring-offset-bg-default bg-bg-secondary placeholder:text-fg-tertiary focus-visible:ring-outline-brand flex min-h-32 w-80 rounded-md border px-3 py-2 text-sm outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        id="comment"
        name="comment"
        placeholder="Enter your feedback ..."
      ></textarea>
      <Button
        color="primary"
        unstyled={args.unstyled}
        className={args.unstyled ? "bg-accent w-full py-2" : ""}
      >
        Submit
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: LabelTemplate,
}

export const Unstyled: Story = {
  render: LabelTemplate,
  args: {
    unstyled: true,
  },
}
