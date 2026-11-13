import { Button } from "@mijn-ui/react-button"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProps,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A short label shown on hover or keyboard focus. Mount a single `<TooltipProvider />` near the root of the app — it owns the shared hover delay, so moving between two triggers feels instant instead of re-waiting the delay.",
      },
    },
  },
  args: {
    unstyled: false,
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

const TooltipTemplate = (args: TooltipProps) => (
  <Tooltip {...args}>
    <TooltipTrigger asChild>
      <Button variant="outlined">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Add to your library</TooltipContent>
  </Tooltip>
)

export const Default: Story = {
  render: TooltipTemplate,
}

export const WithArrow: Story = {
  render: (args: TooltipProps) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outlined">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        Add to your library
        <TooltipArrow />
      </TooltipContent>
    </Tooltip>
  ),
}

export const Sides: Story = {
  render: (args: TooltipProps) => (
    <div className="flex items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} {...args}>
          <TooltipTrigger asChild>
            <Button variant="outlined" className="capitalize">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            Shown on the {side}
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}

export const LongContent: Story = {
  render: (args: TooltipProps) => (
    <Tooltip {...args}>
      <TooltipTrigger asChild>
        <Button variant="outlined">Explain this setting</Button>
      </TooltipTrigger>
      <TooltipContent>
        Rate limits are counted per API key, per minute, and reset on a rolling
        window rather than at the top of the minute.
        <TooltipArrow />
      </TooltipContent>
    </Tooltip>
  ),
}

export const Unstyled: Story = {
  args: {
    unstyled: true,
  },
  render: (args: TooltipProps) => (
    <Tooltip {...args}>
      <TooltipTrigger className="bg-bg-tertiary rounded-md px-3 py-2 text-sm">
        Hover me
      </TooltipTrigger>
      <TooltipContent className="bg-bg-brand text-on-bg-brand rounded px-2 py-1 text-xs">
        Fully custom surface
      </TooltipContent>
    </Tooltip>
  ),
}
