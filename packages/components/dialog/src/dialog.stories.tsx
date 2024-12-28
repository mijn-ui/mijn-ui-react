import type { Meta, StoryObj } from "@storybook/react"
import {
  Dialog,
  DialogProps,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Input } from "@mijn-ui/react-input"
import { Button } from "@mijn-ui/react-button"
import { LuX } from "react-icons/lu"

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
      <DialogContent className="bg-main relative">
        <DialogClose className="text-muted-text hover:text-main-text absolute right-4 top-4 border-none p-2 text-lg">
          <LuX />
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
          <Input type="email" label="Email" autoFocus />
          <Input label="Password" type="password" />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <DialogClose>Close</DialogClose>
          <DialogClose asChild unstyled>
            <Button>Submit</Button>
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
      <DialogContent className="bg-main relative border-2 p-4">
        <DialogClose className="text-muted-text hover:text-main-text absolute right-4 top-4 border-none p-2 text-lg">
          <LuX />
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
