import { Button } from "@mijn-ui/react-button"
import type { Meta, StoryObj } from "@storybook/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogProps,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof AlertDialog>

const AlertDialogTemplate = (args: AlertDialogProps) => {
  return (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button>Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Account Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Deleting your account is irreversible. All your account information,
            including data and settings, will be permanently erased. Are you
            absolutely sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const AlertDialogUnstyled = (args: AlertDialogProps) => {
  return (
    <AlertDialog {...args}>
      <AlertDialogTrigger className="bg-muted text-muted-foreground p-2">
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-accent flex w-1/2 flex-col p-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">
            Confirm Account Deletion
          </AlertDialogTitle>
          <AlertDialogDescription>
            Deleting your account is irreversible. All your account information,
            including data and settings, will be permanently erased. Are you
            absolutely sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="ml-auto flex gap-4">
          <AlertDialogCancel className="p-2">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-primary text-primary-foreground p-2">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const Default: Story = {
  render: AlertDialogTemplate,
}

export const Unstyled: Story = {
  render: AlertDialogUnstyled,
  args: {
    unstyled: true,
  },
}
