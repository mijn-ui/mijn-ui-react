import type { Meta, StoryObj } from "@storybook/react"
import { Label, LabelProps } from "./label"
import { Button } from "@mijn-ui/react-button"

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
        id="comment"
        name="comment"
        className={
          args.unstyled
            ? "indent-2"
            : "border-input placeholder:text-muted-text focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
        }
        placeholder="Enter your feedback ..."
      ></textarea>
      <Button
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
