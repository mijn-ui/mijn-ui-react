import { IoBagOutline } from "react-icons/io5"
import { LuArrowUpRight, LuPlus } from "react-icons/lu"

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
          variant={"text"}
          color={"accent"}
          size={"icon"}
          radius={"lg"}
          className="bg-accent text-muted-text p-0 sm:size-12"
          unstyled={args.unstyled}
          asChild
        >
          <span>
            <LuPlus className="size-5 sm:size-6" />
          </span>
        </Button>

        <div className="text-muted-text absolute right-4 top-4">
          <LuArrowUpRight className="size-5 sm:size-6" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-medium">Users</CardTitle>
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
          color="muted"
          size={"icon"}
          className="rounded-full p-0 sm:size-12"
          unstyled={args.unstyled}
        >
          <IoBagOutline className="size-4 sm:size-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 px-5 pb-5 sm:px-6 sm:pb-6">
        <CardDescription>Total Sales</CardDescription>
        <CardTitle className="text-xl font-medium sm:text-2xl">
          $75,890.75
        </CardTitle>
        <p className="text-muted-text text-tiny font-normal">
          <span className="text-success">+128%</span> from June
        </p>
      </CardContent>
    </Card>
  )
}

const CardCustom = (args: CardProps) => {
  return (
    <Card className="max-w-72 rounded-xl shadow-large" {...args}>
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
          radius="none"
          className="w-full gap-2 py-5 font-bold tracking-wider"
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
          variant={"outlined"}
          color={"muted"}
          size={"icon"}
          radius={"lg"}
          className="bg-accent text-muted-text p-0 sm:size-12"
          asChild
        >
          <span>
            <LuPlus className="size-5 sm:size-6" />
          </span>
        </Button>

        <div className="text-muted-text absolute right-4 top-4">
          <LuArrowUpRight className="size-5 sm:size-6" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-medium font-bold">Users</CardTitle>
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
