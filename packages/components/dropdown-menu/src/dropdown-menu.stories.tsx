import React from "react"

import { LuFilter } from "react-icons/lu"

import type { Meta, StoryObj } from "@storybook/react"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuProps,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

const DropdownMenuTemplate = (args: DropdownMenuProps) => {
  return (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger>Edit</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Undo</DropdownMenuItem>
        <DropdownMenuItem disabled>Redo</DropdownMenuItem>
        <DropdownMenuItem>Cut</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Copy as
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Text</DropdownMenuItem>
              <DropdownMenuItem>Video</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Audio
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>png</DropdownMenuItem>
              <DropdownMenuItem>jpg</DropdownMenuItem>
              <DropdownMenuItem>svg</DropdownMenuItem>
              <DropdownMenuItem>gif</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>Audio</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Mail</DropdownMenuItem>
              <DropdownMenuItem>Instagram</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const DropdownMenuCheckBoxes = (args: DropdownMenuProps) => {
  type Permission = {
    name: string
    allowed: boolean
  }

  type Action = { type: "TOGGLE_PERMISSION"; payload: string }

  function permissionReducer(
    state: Permission[],
    action: Action,
  ): Permission[] {
    switch (action.type) {
      case "TOGGLE_PERMISSION":
        return state.map((permission) =>
          permission.name === action.payload
            ? { ...permission, allowed: !permission.allowed }
            : permission,
        )
    }
  }

  const [permissions, dispatch] = React.useReducer(
    permissionReducer,
    ["read", "write", "delete"].map((permission): Permission => {
      return { name: permission, allowed: false }
    }),
  )

  return (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger className="bg-accent text-accent-text hover:bg-accent hover:opacity-75">
        Manage Permissions
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {permissions.map((permission) => (
          <DropdownMenuCheckboxItem
            key={permission.name}
            checked={permission.allowed}
            onClick={() =>
              dispatch({ type: "TOGGLE_PERMISSION", payload: permission.name })
            }
            className="capitalize"
          >
            {permission.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const DropdownMenuRadioGroups = (args: DropdownMenuProps) => {
  const BRANDS = {
    label: "Brand",
    options: ["nike", "adidas", "new balance"],
  }
  const PRICE_RANGES = {
    label: "Price Range",
    options: ["< $99", "$100 - $249", "$250 - $499", "> $500"],
  }

  const [brand, setBrand] = React.useState<string>(BRANDS.options[0])
  const [priceRange, setPriceRange] = React.useState<string | undefined>(
    PRICE_RANGES.options[0],
  )

  return (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger className="bg-primary">
        <LuFilter />
        Filters
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel className="text-muted-text">
          {BRANDS.label}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={brand}
          onValueChange={(v) => setBrand(v)}
        >
          {BRANDS.options.map((brand) => (
            <DropdownMenuRadioItem
              key={brand}
              value={brand}
              className="capitalize"
            >
              {brand}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-muted-text">
          {PRICE_RANGES.label}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={priceRange}
          onValueChange={(v) => setPriceRange(v)}
        >
          {PRICE_RANGES.options.map((priceRange) => (
            <DropdownMenuRadioItem
              key={priceRange}
              value={priceRange}
              className="capitalize"
            >
              {priceRange}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const DropdownMenuUnstyled = (args: DropdownMenuProps) => {
  return (
    <DropdownMenu
      {...args}
      classNames={{
        trigger: "bg-accent p-2",
        content: "bg-accent p-4 shadow-medium flex flex-col gap-2",
        item: "pointer-events-none data-[disabled]:opacity-disabled",
        subTrigger: "flex items-center",
        subContent: "bg-accent px-4 py-2 flex flex-col gap-2 shadow-medium",
      }}
    >
      <DropdownMenuTrigger>Edit</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Undo</DropdownMenuItem>
        <DropdownMenuItem disabled>Redo</DropdownMenuItem>
        <DropdownMenuItem>Cut</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Copy as
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Text</DropdownMenuItem>
              <DropdownMenuItem>Video</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Audio
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>png</DropdownMenuItem>
              <DropdownMenuItem>jpg</DropdownMenuItem>
              <DropdownMenuItem>svg</DropdownMenuItem>
              <DropdownMenuItem>gif</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>Audio</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="justify-between gap-4">
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Mail</DropdownMenuItem>
              <DropdownMenuItem>Instagram</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Default: Story = {
  render: DropdownMenuTemplate,
}

export const WithCheckboxes: Story = {
  render: (args: DropdownMenuProps) => <DropdownMenuCheckBoxes {...args} />,
}

export const WithRadioGroups: Story = {
  render: (args: DropdownMenuProps) => <DropdownMenuRadioGroups {...args} />,
}

export const Unstyled: Story = {
  render: DropdownMenuUnstyled,
  args: {
    unstyled: true,
  },
}
