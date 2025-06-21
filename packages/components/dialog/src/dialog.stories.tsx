import { Button } from "@mijn-ui/react-button"
import { Input } from "@mijn-ui/react-input"
import type { Meta, StoryObj } from "@storybook/react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

const DialogTemplate = (args: DialogProps) => {
  return (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent className="relative">
        <DialogClose unstyled asChild>
          <Button
            iconOnly
            size="sm"
            variant="ghost"
            className="absolute right-1.5 top-1.5 rounded-full [&_svg]:size-4"
          >
            <XIcon />
          </Button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Rate Your Experience</DialogTitle>
          <DialogDescription>
            Please select your feedback rating and share your story in the text
            box below before confirming or canceling.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex w-full items-center gap-2">
            <Button className="w-full">🙁 Bad</Button>
            <Button className="w-full">🙂 Fine</Button>
            <Button className="w-full">😍 Good</Button>
          </div>
          <textarea
            className="focus-visible:ring-offset-background bg-secondary placeholder:text-muted-foreground focus-visible:ring-primary flex min-h-32 w-full resize-none rounded-md border px-3 py-2 text-sm outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Tell us your story"
          ></textarea>
        </div>

        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <DialogClose asChild unstyled>
            <Button variant="primary">Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const DialogUnstyled = (args: DialogProps) => {
  return (
    <Dialog {...args}>
      <DialogTrigger className="bg-accent p-2">Sign In</DialogTrigger>
      <DialogContent className="bg-background border-medium relative  p-4">
        <DialogClose className="text-muted-foreground hover:text-foreground absolute right-4 top-4 border-none p-2 text-lg">
          <X />
        </DialogClose>
        <div>
          <DialogTitle className="text-lg font-semibold">SignIn</DialogTitle>
          <DialogDescription>
            Don&apos;t have an account yet?{" "}
            <a href="#" className="text-blue-500 underline">
              Sign up
            </a>
            .
          </DialogDescription>
        </div>
        <div className="mt-4 space-y-2">
          <Input
            unstyled={args.unstyled}
            type="email"
            placeholder="Email"
            autoFocus
          />
          <Input
            unstyled={args.unstyled}
            placeholder="Password"
            type="password"
          />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <DialogClose className="p-2">Close</DialogClose>
          <DialogClose asChild unstyled>
            <Button unstyled={args.unstyled} className="bg-muted p-2">
              Submit
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const Default: Story = {
  render: DialogTemplate,
}

export const Unstyled: Story = {
  render: DialogUnstyled,
  args: {
    unstyled: true,
  },
}

const XIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L8 8M8 8L4 12M8 8L12 12M8 8L4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
