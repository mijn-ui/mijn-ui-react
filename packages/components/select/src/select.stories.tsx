import type { Meta, StoryObj } from "@storybook/react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectProps,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Select>

const SelectTemplate = (args: SelectProps) => {
  return (
    <Select
      classNames={
        args.unstyled
          ? {
              trigger: "bg-accent p-2 flex items-center gap-4",
              content: "min-w-32 mt-1 bg-accent p-2 pointer-events-none",
              item: "outline-none hover:bg-muted",
              label: "text-small font-semibold",
            }
          : {}
      }
      {...args}
    >
      <SelectTrigger className="gap-4">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const SelectItemAligned = (args: SelectProps) => {
  return (
    <Select {...args}>
      <SelectTrigger className="gap-4">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent position="item-aligned">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const SelectWithSeparator = (args: SelectProps) => {
  return (
    <Select {...args}>
      <SelectTrigger className="gap-4">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectSeparator />
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const Default: Story = {
  render: SelectTemplate,
}

export const ItemAligned: Story = {
  render: SelectItemAligned,
}

export const WithSeparator: Story = {
  render: SelectWithSeparator,
}

export const WithScrollArrows: Story = {
  render: SelectTemplate,
  args: {
    classNames: {
      content: "h-32",
    },
  },
}

export const Unstyled: Story = {
  render: SelectTemplate,
  args: {
    unstyled: true,
  },
}
