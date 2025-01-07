"use client"

import * as React from "react"

import {
  LuCalculator,
  LuCalendar,
  LuCreditCard,
  LuSettings,
  LuSmile,
  LuUser,
} from "react-icons/lu"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@mijn-ui/react-command"

const CommandDialogExample = () => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-small text-muted-foreground">
        Press{" "}
        <kbd className="border-small bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-tiny">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
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
            <CommandItem>
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
      </CommandDialog>
    </>
  )
}

export default CommandDialogExample
