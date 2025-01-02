import { LuX } from "react-icons/lu"

import { Button } from "@mijn-ui/react-button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@mijn-ui/react-dialog"
import { Input } from "@mijn-ui/react-input"

type DialogExampleProps = {
  unstyled?: boolean
}

const DialogExample = ({ unstyled = false }: DialogExampleProps) => {
  return (
    <Dialog unstyled={unstyled}>
      <DialogTrigger>Sign In</DialogTrigger>
      <DialogContent className="relative ">
        <DialogClose className="absolute right-4 top-4 border-none p-2 text-large text-muted-text hover:text-main-text">
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
          <Input
            unstyled={unstyled}
            type="email"
            classNames={{ label: "peer-focus:bg-surface" }}
            label="Email..."
            autoFocus
          />
          <Input
            unstyled={unstyled}
            label="Password..."
            type="password"
            classNames={{ label: "peer-focus:bg-surface" }}
          />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <DialogClose>Close</DialogClose>
          <DialogClose asChild unstyled>
            <Button unstyled={unstyled}>Submit</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogExample
