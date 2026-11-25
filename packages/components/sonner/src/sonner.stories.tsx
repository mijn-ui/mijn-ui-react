import { Button } from "@mijn-ui/react-button"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { MijnToasterProps, Toaster, toast } from "./sonner"

const meta: Meta<typeof Toaster> = {
  title: "Components/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A `sonner` toaster dressed in the mijn-ui theme. Mount one `<Toaster />` near the root of the app; every `toast()` call in the tree renders through it. `sonner` is a peer dependency so there is exactly one queue — see the package README.",
      },
    },
  },
  args: {
    unstyled: false,
    position: "bottom-right",
    closeButton: true,
  },
}

export default meta
type Story = StoryObj<typeof Toaster>

const Template = (args: MijnToasterProps) => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    <Toaster {...args} />
    <Button variant="outlined" onClick={() => toast("Settings saved")}>
      Default
    </Button>
    <Button
      variant="outlined"
      onClick={() => toast.success("Invoice posted to the ledger")}
    >
      Success
    </Button>
    <Button
      variant="outlined"
      onClick={() => toast.error("Could not reach the server")}
    >
      Error
    </Button>
    <Button
      variant="outlined"
      onClick={() => toast.warning("This rate expires in 2 days")}
    >
      Warning
    </Button>
    <Button
      variant="outlined"
      onClick={() => toast.info("3 new documents were imported")}
    >
      Info
    </Button>
  </div>
)

export const Default: Story = {
  render: Template,
}

export const WithDescription: Story = {
  render: (args: MijnToasterProps) => (
    <div className="flex items-center gap-2">
      <Toaster {...args} />
      <Button
        variant="outlined"
        onClick={() =>
          toast.success("Payment recorded", {
            description: "MMK 450,000 against invoice INV-2048.",
          })
        }
      >
        Show toast
      </Button>
    </div>
  ),
}

export const WithAction: Story = {
  render: (args: MijnToasterProps) => (
    <div className="flex items-center gap-2">
      <Toaster {...args} />
      <Button
        variant="outlined"
        onClick={() =>
          toast("Journal entry deleted", {
            description: "Entry JE-1187 was removed.",
            action: {
              label: "Undo",
              onClick: () => toast.success("Restored JE-1187"),
            },
            cancel: { label: "Dismiss", onClick: () => undefined },
          })
        }
      >
        Show toast
      </Button>
    </div>
  ),
}

export const Promise: Story = {
  render: (args: MijnToasterProps) => (
    <div className="flex items-center gap-2">
      <Toaster {...args} />
      <Button
        variant="outlined"
        onClick={() =>
          toast.promise(
            new window.Promise((resolve) => setTimeout(resolve, 1800)),
            {
              loading: "Posting to the ledger…",
              success: "Posted",
              error: "Posting failed",
            },
          )
        }
      >
        Show toast
      </Button>
    </div>
  ),
}

export const Unstyled: Story = {
  args: {
    unstyled: true,
  },
  render: (args: MijnToasterProps) => (
    <div className="flex items-center gap-2">
      <Toaster
        {...args}
        classNames={{
          toast:
            "bg-bg-inverse text-fg-inverse flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-lg",
          title: "font-medium",
        }}
      />
      <Button variant="outlined" onClick={() => toast("Fully custom surface")}>
        Show toast
      </Button>
    </div>
  ),
}
