import { Button } from "@mijn-ui/react-button"
import { Input } from "@mijn-ui/react-input"
import { Label } from "@mijn-ui/react-label"
import type { Meta, StoryObj } from "@storybook/react"
import { RxCross2, RxMixerHorizontal } from "react-icons/rx"
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "./popover"

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Popover>

const DATA = [
  {
    id: "width",
    name: "width",
    label: "Width",
    defaultValue: "100%",
  },
  {
    id: "maxWidth",
    name: "maxWidth",
    label: "Max. width",
    defaultValue: "300px",
  },
  {
    id: "height",
    name: "height",
    label: "Height",
    defaultValue: "25px",
  },
  {
    id: "maxHeight",
    name: "maxHeight",
    label: "Max. height",
    defaultValue: "none",
  },
]

const PopoverTemplate = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <PopoverTrigger className="rounded-full">
        <RxMixerHorizontal size={18} />
      </PopoverTrigger>
      <PopoverContent className="relative w-72 ">
        <div className="flex flex-col justify-center gap-2.5">
          <p className="text-medium font-medium">Dimensions</p>
          {DATA.map((field) => {
            return (
              <fieldset
                key={field.id}
                className="flex items-center justify-between gap-3"
              >
                <Label
                  htmlFor={field.id}
                  className="block w-1/2"
                  unstyled={args.unstyled}
                >
                  {field.label}
                </Label>
                <Input
                  classNames={{
                    input: "bg-card",
                    label: "bg-card peer-focus:bg-card",
                  }}
                  id={field.id}
                  name={field.name}
                  defaultValue={field.defaultValue}
                  unstyled={args.unstyled}
                />
              </fieldset>
            )
          })}
        </div>
        <PopoverClose unstyled asChild>
          <Button
            variant="ghost"
            size={"icon"}
            radius={"full"}
            className="absolute right-0 top-0 hover:bg-transparent"
            unstyled={args.unstyled}
          >
            <RxCross2 />
          </Button>
        </PopoverClose>
        <PopoverArrow className="fill-muted-foreground" />
      </PopoverContent>
    </Popover>
  )
}

const PopoverUnstyled = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <PopoverTrigger className="bg-muted p-2">
        <RxMixerHorizontal size={18} />
      </PopoverTrigger>
      <PopoverContent className="bg-accent relative w-72 p-4">
        <div className="flex flex-col justify-center gap-2.5">
          <p className="text-medium font-semibold">Dimensions</p>
          {DATA.map((field) => {
            return (
              <fieldset
                key={field.id}
                className="flex items-center justify-between gap-3"
              >
                <Label
                  htmlFor={field.id}
                  className="block w-1/2"
                  unstyled={args.unstyled}
                >
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.name}
                  defaultValue={field.defaultValue}
                  unstyled={args.unstyled}
                  classNames={{ input: "w-full indent-2" }}
                />
              </fieldset>
            )
          })}
        </div>
        <PopoverClose unstyled asChild>
          <Button
            variant="ghost"
            size={"icon"}
            radius={"full"}
            className="absolute right-4 top-4 hover:bg-transparent"
            unstyled={args.unstyled}
          >
            <RxCross2 />
          </Button>
        </PopoverClose>
        <PopoverArrow className="fill-muted-foreground" />
      </PopoverContent>
    </Popover>
  )
}

export const Default: Story = {
  render: PopoverTemplate,
}

export const Unstyled: Story = {
  render: PopoverUnstyled,
  args: {
    unstyled: true,
  },
}
