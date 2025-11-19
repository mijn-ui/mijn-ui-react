import { useState } from "react"
import { Button } from "@mijn-ui/react-button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@mijn-ui/react-dialog"
import { Input } from "@mijn-ui/react-input"
import { ScrollArea } from "@mijn-ui/react-scroll-area"
import { ChevronDownIcon, SearchIcon } from "@mijn-ui/shared-icons"
import { Meta, StoryObj } from "@storybook/react"
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteGroup,
  AutocompleteItem,
  AutocompleteProps,
  AutocompleteTrigger,
} from "./autocomplete"

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
    value: "Next.js",
  },
}

export default meta
type Story = StoryObj<typeof Autocomplete>

const FRAMEWORKS1 = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "WordPress",
  "Express.js",
]

const FRAMEWORKS2 = [
  ...FRAMEWORKS1,
  "Nest.js",
  "Angular",
  "Vue.js",
  "Ember.js",
  "Backbone.js",
  "Meteor.js",
  "Django",
  "Flask",
  "Laravel",
  "Spring Boot",
  "Ruby on Rails",
  "Phoenix",
  "Gatsby.js",
  "Strapi",
  "Fastify",
  "Hapi.js",
  "AdonisJS",
]

const AutocompleteTemplate = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Autocomplete
      value={value}
      onValueChange={setValue}
      unstyled={args.unstyled}
    >
      <AutocompleteTrigger asChild>
        <Input
          className="bg-bg-default"
          placeholder={"Search for a framework"}
          startIcon={<SearchIcon />}
          unstyled={args.unstyled}
        />
      </AutocompleteTrigger>
      <AutocompleteContent emptyMessage="No Frameworks Found" loading={false}>
        {FRAMEWORKS1.map((framework) => (
          <AutocompleteItem key={framework} value={framework}>
            {framework}
          </AutocompleteItem>
        ))}
      </AutocompleteContent>
    </Autocomplete>
  )
}

const AutocompleteWithScrollArea = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Autocomplete
      value={value}
      onValueChange={setValue}
      unstyled={args.unstyled}
    >
      <AutocompleteTrigger asChild>
        <Input
          unstyled={args.unstyled}
          className="bg-bg-default"
          placeholder={"Search for a framework"}
          startIcon={<SearchIcon />}
        />
      </AutocompleteTrigger>
      <AutocompleteContent emptyMessage="No Frameworks Found" loading={false}>
        <ScrollArea className="flex max-h-52 flex-col overflow-y-auto">
          <AutocompleteGroup>
            {FRAMEWORKS2.map((framework) => (
              <AutocompleteItem key={framework} value={framework}>
                {framework}
              </AutocompleteItem>
            ))}
          </AutocompleteGroup>
        </ScrollArea>
      </AutocompleteContent>
    </Autocomplete>
  )
}

const AutocompleteWithDialog = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Dialog>
      <DialogTrigger>Add User</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <DialogTitle>User Information</DialogTitle>
        </div>
        <Input placeholder="Username" className="bg-bg-default" />
        <Input placeholder="Email" className="bg-bg-default" />
        <Autocomplete
          value={value}
          onValueChange={setValue}
          unstyled={args.unstyled}
        >
          <AutocompleteTrigger asChild>
            <Input
              unstyled={args.unstyled}
              className="bg-bg-default"
              placeholder={"Search for a framework"}
              endIcon={<ChevronDownIcon />}
            />
          </AutocompleteTrigger>
          <AutocompleteContent
            emptyMessage="No Frameworks Found"
            loading={false}
          >
            <ScrollArea className="flex max-h-60 flex-col overflow-y-auto">
              <AutocompleteGroup>
                {FRAMEWORKS2.map((framework) => (
                  <AutocompleteItem key={framework} value={framework}>
                    {framework}
                  </AutocompleteItem>
                ))}
              </AutocompleteGroup>
            </ScrollArea>
          </AutocompleteContent>
        </Autocomplete>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogClose>Cancel</DialogClose>
          <DialogClose unstyled asChild>
            <Button color="primary">Add User</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const AutocompleteUnstyled = (args: AutocompleteProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Autocomplete
      value={value}
      onValueChange={setValue}
      unstyled={args.unstyled}
    >
      <AutocompleteTrigger asChild>
        <Input
          className="bg-bg-tertiary border-0 focus-visible:outline-none focus-visible:ring-0"
          classNames={{
            wrapper: "bg-bg-tertiary flex items-center gap-2 p-2",
          }}
          placeholder={"Search for a framework"}
          startIcon={<SearchIcon />}
          unstyled={args.unstyled}
        />
      </AutocompleteTrigger>
      <AutocompleteContent
        className="bg-accent mt-2 w-[--radix-popover-trigger-width] p-2"
        emptyMessage="No Frameworks Found"
        loading={false}
      >
        {FRAMEWORKS1.map((framework) => (
          <AutocompleteItem
            key={framework}
            value={framework}
            className="data-[selected=true]:bg-bg-tertiary flex items-center justify-between p-1"
          >
            {framework}
          </AutocompleteItem>
        ))}
      </AutocompleteContent>
    </Autocomplete>
  )
}

export const Default: Story = {
  render: (args: AutocompleteProps) => <AutocompleteTemplate {...args} />,
}

export const WithScrollArea: Story = {
  render: (args: AutocompleteProps) => <AutocompleteWithScrollArea {...args} />,
}

export const WithDialog: Story = {
  render: (args: AutocompleteProps) => <AutocompleteWithDialog {...args} />,
}

export const Unstyled: Story = {
  render: (args: AutocompleteProps) => <AutocompleteUnstyled {...args} />,
  args: {
    unstyled: true,
  },
}
