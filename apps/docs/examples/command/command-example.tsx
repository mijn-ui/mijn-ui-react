import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Input,
} from "@mijn-ui/react"
import {
  LuCalculator,
  LuCalendar,
  LuCreditCard,
  LuSearch,
  LuSettings,
  LuSmile,
  LuUser,
} from "react-icons/lu"

const CommandExample = () => {
  return (
    <Command className="rounded-large border-small border-border shadow-medium md:w-[450px]">
      <CommandInput asChild>
        <Input
          startIcon={<LuSearch />}
          variant="underline"
          placeholder="Type a command or search..."
          className="bg-card"
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

export default CommandExample
