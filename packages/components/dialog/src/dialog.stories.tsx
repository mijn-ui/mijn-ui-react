import { Button } from "@mijn-ui/react-button"
import { Input } from "@mijn-ui/react-input"
import type { Meta, StoryObj } from "@storybook/react"
import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
      <DialogTrigger>Sign In</DialogTrigger>
      <DialogContent className="bg-background relative">
        <DialogClose className="text-muted-foreground hover:text-foreground text-large absolute right-4 top-4 border-none p-2">
          <X />
        </DialogClose>
        <div>
          <DialogTitle>SignIn</DialogTitle>
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
            type="email"
            label="Email"
            autoFocus
            className="bg-popover"
            classNames={{
              label: "bg-popover peer-focus:bg-popover",
            }}
          />
          <Input
            label="Password"
            type="password"
            className="bg-popover"
            classNames={{
              label: "bg-popover peer-focus:bg-popover",
            }}
          />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <DialogClose>Close</DialogClose>
          <DialogClose asChild unstyled>
            <Button color="primary">Submit</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const DialogUnstyled = (args: DialogProps) => {
  return (
    <Dialog {...args}>
      <DialogTrigger className="bg-accent p-2">Sign In</DialogTrigger>
      <DialogContent className="bg-background border-medium relative  p-4">
        <DialogClose className="text-muted-foreground hover:text-foreground text-large absolute right-4 top-4 border-none p-2">
          <X />
        </DialogClose>
        <div>
          <DialogTitle className="text-large font-semibold">SignIn</DialogTitle>
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
