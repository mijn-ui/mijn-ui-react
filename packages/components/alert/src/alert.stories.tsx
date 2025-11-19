import { IconSvgProps } from "@mijn-ui/shared-icons"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
} from "./alert"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "danger"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

const AlertTemplate = (args: AlertProps) => {
  return (
    <Alert className="md:w-xl w-60" {...args}>
      <AlertIcon>
        <RocketIcon />
      </AlertIcon>
      <AlertTitle>New Feature Added</AlertTitle>
      <AlertDescription>
        A new feature has been added to the project.
      </AlertDescription>
    </Alert>
  )
}

const AlertUnstyled = (args: AlertProps) => {
  return (
    <Alert
      className="md:w-xl bg-accent relative w-60 px-3 py-4 [&>span~*]:pl-8"
      {...args}
    >
      <AlertIcon className="translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg]:text-current">
        <RocketIcon />
      </AlertIcon>
      <AlertTitle className="font-bold">New Feature Added</AlertTitle>
      <AlertDescription className="col-start-2">
        A new feature has been added to the project.
      </AlertDescription>
    </Alert>
  )
}

export const Default: Story = {
  render: AlertTemplate,
}

export const Variants: Story = {
  render: (args: AlertProps) => (
    <div className="flex flex-col items-center gap-8">
      <div className="space-y-2">
        <h3 className="text-fg-tertiary w-full text-start font-semibold">
          Filled
        </h3>
        <AlertTemplate {...args} />
      </div>

      <div className="space-y-2">
        <h3 className="text-fg-tertiary w-full text-start font-semibold">
          Danger
        </h3>
        <AlertTemplate {...args} variant="danger" />
      </div>
    </div>
  ),
  args: {
    variant: "default",
  },
}

export const Unstyled: Story = {
  render: AlertUnstyled,
  args: {
    unstyled: true,
  },
}

function RocketIcon(props: IconSvgProps) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M461.81 53.81a4.4 4.4 0 00-3.3-3.39c-54.38-13.3-180 34.09-248.13 102.17a294.9 294.9 0 00-33.09 39.08c-21-1.9-42-.3-59.88 7.5-50.49 22.2-65.18 80.18-69.28 105.07a9 9 0 009.8 10.4l81.07-8.9a180.29 180.29 0 001.1 18.3 18.15 18.15 0 005.3 11.09l31.39 31.39a18.15 18.15 0 0011.1 5.3 179.91 179.91 0 0018.19 1.1l-8.89 81a9 9 0 0010.39 9.79c24.9-4 83-18.69 105.07-69.17 7.8-17.9 9.4-38.79 7.6-59.69a293.91 293.91 0 0039.19-33.09c68.38-68 115.47-190.86 102.37-247.95zM298.66 213.67a42.7 42.7 0 1160.38 0 42.65 42.65 0 01-60.38 0z"
      />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M109.64 352a45.06 45.06 0 00-26.35 12.84C65.67 382.52 64 448 64 448s65.52-1.67 83.15-19.31A44.73 44.73 0 00160 402.32"
      />
    </svg>
  )
}
