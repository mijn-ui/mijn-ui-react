import { Button } from "@mijn-ui/react-button"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardProps,
  CardTitle,
} from "./card"

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Card>

const CardTemplate = (args: CardProps) => {
  return (
    <Card className="relative max-w-60" {...args}>
      <CardHeader>
        <Button
          variant="ghost"
          iconOnly
          className="bg-secondary text-muted-foreground rounded-full p-0 sm:size-12"
          unstyled={args.unstyled}
          asChild
        >
          <span>
            <Icons.plus className="size-5 sm:size-6" />
          </span>
        </Button>

        <div className="text-muted-foreground absolute right-4 top-4">
          <Icons.arrowUpRight className="size-5 sm:size-6" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-base">Users</CardTitle>
        <CardDescription>Manage user accounts and permissions.</CardDescription>
      </CardContent>
    </Card>
  )
}

const CardStats = (args: CardProps) => {
  return (
    <Card className="max-w-44" {...args}>
      <CardHeader className="px-5 pb-5 sm:px-6 sm:pb-4">
        <Button
          iconOnly
          className="bg-accent rounded-full p-0 sm:size-12"
          unstyled={args.unstyled}
        >
          <Icons.bagOutline className="size-4 sm:size-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 px-5 pb-5 sm:px-6 sm:pb-6">
        <CardDescription>Total Sales</CardDescription>
        <CardTitle className="text-xl font-medium sm:text-2xl">
          $75,890.75
        </CardTitle>
        <p className="text-muted-foreground text-xs font-normal">
          <span className="text-success">+128%</span> from June
        </p>
      </CardContent>
    </Card>
  )
}

const CardCustom = (args: CardProps) => {
  return (
    <Card className="max-w-72 rounded-xl shadow-lg" {...args}>
      <CardHeader className="relative py-12">
        <div className="absolute -top-32 left-0 w-full">
          <img
            src="https://pluspng.com/img-png/download-running-shoes-png-images-transparent-gallery-advertisement-340.png"
            alt="shoes-image"
            className="mx-auto w-3/4"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-7 pb-6 text-center">
        <CardTitle className="text-3xl font-light">Running Shoes</CardTitle>
        <CardDescription className="font-light">
          Lightweight and durable, designed for comfort, and performance on any
          terrain.
        </CardDescription>
      </CardContent>
      <CardFooter className="overflow-hidden rounded-b-xl p-0">
        <Button
          variant="primary"
          className="w-full gap-2 rounded-none py-5 font-semibold tracking-wider"
          unstyled={args.unstyled}
        >
          ADD TO BAG
        </Button>
      </CardFooter>
    </Card>
  )
}

const CardUnstyled = (args: CardProps) => {
  return (
    <Card className="bg-accent relative max-w-60 p-4" {...args}>
      <CardHeader>
        <Button
          variant={"ghost"}
          iconOnly
          className="text-muted-foreground bg-secondary rounded-lg p-0 sm:size-12"
          asChild
        >
          <span>
            <Icons.plus className="size-5 sm:size-6" />
          </span>
        </Button>

        <div className="text-muted-foreground absolute right-4 top-4">
          <Icons.arrowUpRight className="size-5 sm:size-6" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-base font-bold">Users</CardTitle>
        <CardDescription>Manage user accounts and permissions.</CardDescription>
      </CardContent>
    </Card>
  )
}

export const Default: Story = {
  render: CardTemplate,
}

export const StatsCard: Story = {
  render: CardStats,
}

export const CustomStyles: Story = {
  render: CardCustom,
}

export const Unstyled: Story = {
  render: CardUnstyled,
  args: {
    unstyled: true,
  },
}

const Icons = {
  arrowUpRight: (props: React.HTMLAttributes<SVGElement>) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  ),
  plus: (props: React.HTMLAttributes<SVGElement>) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  ),
  bagOutline: (props: React.HTMLAttributes<SVGElement>) => (
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
        d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"
      />
    </svg>
  ),
}
