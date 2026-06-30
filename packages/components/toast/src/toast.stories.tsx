import type { Meta, StoryObj } from "@storybook/react"
import { Toast, ToastProps } from "./toast"

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  args: {
    title: "Notification",
    description: "This is a toast notification.",
    unstyled: false,
    intent: "default",
  },
  argTypes: {
    intent: {
      control: "select",
      options: ["default", "brand", "success", "warning", "danger"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

const INTENTS = ["default", "brand", "success", "warning", "danger"] as const

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const Default: Story = {
  render: (args) => <Toast {...args} className="w-80" />,
}

export const WithIcon: Story = {
  render: (args) => <Toast {...args} className="w-80" icon={<CheckIcon />} />,
}

export const WithClose: Story = {
  render: (args) => (
    <Toast
      {...args}
      className="w-80"
      icon={<CheckIcon />}
      onClose={() => alert("closed")}
    />
  ),
}

export const Intents: Story = {
  render: (args: ToastProps) => (
    <div className="flex w-80 flex-col gap-3">
      {INTENTS.map((intent) => (
        <Toast
          key={intent}
          {...args}
          intent={intent}
          title={intent.charAt(0).toUpperCase() + intent.slice(1)}
          description={`This is a ${intent} toast.`}
          icon={<CheckIcon />}
          onClose={() => undefined}
        />
      ))}
    </div>
  ),
}

export const WithAction: Story = {
  render: (args) => (
    <Toast
      {...args}
      className="w-80"
      icon={<CheckIcon />}
      action={
        <button className="text-sm font-medium text-fg-brand hover:underline">
          Undo
        </button>
      }
      onClose={() => undefined}
    />
  ),
}
