import { Input } from "@mijn-ui/react-input"
import type { Meta, StoryObj } from "@storybook/react"
import {
  LuCalculator,
  LuCalendar,
  LuCreditCard,
  LuSearch,
  LuSettings,
  LuSmile,
  LuUser,
} from "react-icons/lu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandProps,
  CommandSeparator,
  CommandShortcut,
} from "./command"

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Command>

const CommandTemplate = (args: CommandProps) => {
  return (
    <Command
      className="border-border rounded-large border-small shadow-medium md:w-[450px]"
      {...args}
    >
      <CommandInput asChild placeholder="Type a command or search...">
        <Input
          startIcon={<LuSearch />}
          classNames={{
            // TODO: Let the user know that they have to do this unfortunately, for now.
            input:
              "bg-card border-transparent ring-0 focus-visible:ring-0 focus-visible:order-b-ring border-b border-b-input rounded-none",
          }}
        />
      </CommandInput>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LuCalendar className="mr-2 size-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <LuSmile className="mr-2 size-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <LuCalculator className="mr-2 size-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <LuUser className="mr-2 size-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <LuCreditCard className="mr-2 size-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <LuSettings className="mr-2 size-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

const CommandUnstyled = (args: CommandProps) => {
  return (
    <Command
      className="border-border rounded-large border-small shadow-medium p-3 md:w-[300px]"
      classNames={{
        commandItem: "flex items-center pointer-events-none",
        commandShortcut: "ml-auto",
        commandSeparator: "border-b-2",
        commandGroup:
          "flex flex-col gap-1 py-2 [&_[cmdk-group-heading]]:text-small",
      }}
      {...args}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LuCalendar className="mr-2 size-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <LuSmile className="mr-2 size-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <LuCalculator className="mr-2 size-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <LuUser className="mr-2 size-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <LuCreditCard className="mr-2 size-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <LuSettings className="mr-2 size-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export const Default: Story = {
  render: CommandTemplate,
}

export const Unstyled: Story = {
  render: CommandUnstyled,
  args: {
    unstyled: true,
  },
}
